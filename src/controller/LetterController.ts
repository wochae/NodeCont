import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Letter } from '../entity/Letter';
import axios from 'axios';
import 'dotenv/config';

const CHATGPT_API_KEY = process.env.CHATGPT_API_KEY;

async function makeApiRequest(prompt: string): Promise<string> {
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

export const generateLetter = async (req: Request, res: Response) => {
    const { recipient, purpose, tone, keywords } = req.body;
    const prompt = `Write a letter to ${recipient}. The purpose of this letter is ${purpose}. The tone of the letter should be ${tone}. Include the following points: ${keywords}.`;

    try {
        const letterContent = await makeApiRequest(prompt);
        const letterRepo = getRepository(Letter);
        const letter = new Letter();
        letter.recipient = recipient;
        letter.purpose = purpose;
        letter.tone = tone;
        letter.keywords = keywords;
        await letterRepo.save(letter);
        res.json({ letter: letterContent });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating letter');
    }
};

export const reviseLetter = async (req: Request, res: Response) => {
    const { letter, feedback } = req.body;
    const prompt = `Here is a letter: ${letter}. Please revise it according to the following feedback: ${feedback}.`;

    try {
        const revisedLetter = await makeApiRequest(prompt);
        res.json({ revisedLetter });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error revising letter');
    }
};