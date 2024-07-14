const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

const MAX_RETRIES = 5;
const RETRY_DELAY = 3000; // 3 seconds

async function makeApiRequest(prompt, retries = 0) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt }
            ],
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${CHATGPT_API_KEY}`,
                'Content-Type': 'application/json'
            }
        });

        return response.data.choices[0].message.content;
    } catch (error) {
        if (error.response && error.response.status === 429 && retries < MAX_RETRIES) {
            console.warn(`429 Too Many Requests - Retrying in ${RETRY_DELAY / 1000} seconds...`);
            await new Promise(res => setTimeout(res, RETRY_DELAY));
            return makeApiRequest(prompt, retries + 1);
        } else if (error.response && error.response.status === 401) {
            console.error('401 Unauthorized - Check your API key');
            throw new Error('Unauthorized');
        } else {
            throw error;
        }
    }
}

router.post('/generate-letter', async (req, res) => {
    const { recipient, purpose, tone, keywords } = req.body;
    const prompt = `Write a letter to ${recipient}. The purpose of this letter is ${purpose}. The tone of the letter should be ${tone}. Include the following points: ${keywords}.`;

    try {
        const letter = await makeApiRequest(prompt);
        res.json({ letter });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating letter');
    }
});

module.exports = router;