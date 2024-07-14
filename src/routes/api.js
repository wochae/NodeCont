const express = require('express');
const axios = require('axios');
const router = express.Router();

const CHATGPT_API_KEY = 'your_openai_api_key';

router.post('/generate-letter', async (req, res) => {
    const { recipient, purpose, tone, keywords } = req.body;
    const prompt = `Write a letter to ${recipient}. The purpose of this letter is ${purpose}. The tone of the letter should be ${tone}. Include the following points: ${keywords}.`;

    try {
        const response = await axios.post('https://api.openai.com/v1/completions', {
            model: 'text-davinci-003',
            prompt: prompt,
            max_tokens: 500,
            temperature: 0.7
        }, {
            headers: {
                'Authorization': `Bearer ${CHATGPT_API_KEY}`
            }
        });

        const letter = response.data.choices[0].text;
        res.json({ letter });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating letter');
    }
});

module.exports = router;