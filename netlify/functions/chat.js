const https = require('https');

exports.handler = async (event, context) => {
  // Handle preflight requests
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { message, mode = 'concept' } = JSON.parse(event.body);

    if (!message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Message is required' }),
      };
    }

    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'API key not configured' }),
      };
    }

    // System prompts based on mode
    const systemPrompts = {
      exam: "You are a BCA assistant for LND College. Answer only syllabus-related queries. Provide SHORT, CONCISE answers suitable for exam preparation. Keep answers to 2-3 sentences maximum.",
      practice: "You are a BCA assistant for LND College. Create practice questions or solve problems related to the BCA curriculum. Make it engaging and educational.",
      assignment: "You are a BCA assistant for LND College. Help with assignments by providing structured, step-by-step solutions with explanations.",
      concept: "You are a BCA assistant for LND College. Explain concepts in SIMPLE, BEGINNER-FRIENDLY language. Use examples when possible. Keep it short but meaningful.",
    };

    const systemPrompt = systemPrompts[mode] || systemPrompts.concept;

    const requestData = JSON.stringify({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: systemPrompt,
        },
        {
          role: 'user',
          content: message,
        },
      ],
      temperature: 0.5,
      max_tokens: 800,
    });

    return new Promise((resolve) => {
      const options = {
        hostname: 'api.openai.com',
        port: 443,
        path: '/v1/chat/completions',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(requestData),
          Authorization: `Bearer ${apiKey}`,
        },
      };

      const req = https.request(options, (res) => {
        let responseData = '';

        res.on('data', (chunk) => {
          responseData += chunk;
        });

        res.on('end', () => {
          try {
            const parsed = JSON.parse(responseData);
            if (parsed.choices && parsed.choices[0]) {
              const botMessage = parsed.choices[0].message.content;
              resolve({
                statusCode: 200,
                headers: {
                  'Access-Control-Allow-Origin': '*',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  success: true,
                  message: botMessage,
                }),
              });
            } else {
              resolve({
                statusCode: 500,
                body: JSON.stringify({ error: 'Invalid response from OpenAI' }),
              });
            }
          } catch (error) {
            resolve({
              statusCode: 500,
              body: JSON.stringify({ error: 'Failed to parse response' }),
            });
          }
        });
      });

      req.on('error', (error) => {
        resolve({
          statusCode: 500,
          body: JSON.stringify({ error: 'API request failed', details: error.message }),
        });
      });

      req.write(requestData);
      req.end();
    });
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Invalid request', details: error.message }),
    };
  }
};
