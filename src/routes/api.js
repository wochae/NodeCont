const express = require('express');
const axios = require('axios');
const router = express.Router();

require('dotenv').config();
const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

router.post('/generate-letter', async (req, res) => {
    const { recipient, purpose, tone, keywords } = req.body;
    const prompt = `Write a letter to ${recipient}. The purpose of this letter is ${purpose}. The tone of the letter should be ${tone}. Include the following points: ${keywords}.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo', // 모델 이름을 정확히 명시하세요.
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

        const letter = response.data.choices[0].message.content;
        res.json({ letter });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating letter');
    }
});

module.exports = router;