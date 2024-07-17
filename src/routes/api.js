const express = require('express');
const axios = require('axios');
const router = express.Router();
require('dotenv').config();

const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

async function makeApiRequest(prompt) {
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-4o',
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
        throw error;
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

router.post('/revise-letter', async (req, res) => {
    const { letter, feedback } = req.body;
    const prompt = `Here is a letter: ${letter}. Please revise it according to the following feedback: ${feedback}.`;

    try {
        const revisedLetter = await makeApiRequest(prompt);
        res.json({ revisedLetter });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error revising letter');
    }
});

module.exports = router;

module.exports = router;