import axios from 'axios';
import { getRepository } from 'typeorm';
import { Letter } from '../entities/Letter';
import 'dotenv/config';
import {User} from "../entities/User";

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

export const generateLetterService = async (recipient: string, purpose: string, tone: string, keywords: string): Promise<string> => {
    const prompt = `Write a letter to ${recipient}. The purpose of this letter is ${purpose}. The tone of the letter should be ${tone}. Include the following points: ${keywords}.`;
    return await makeApiRequest(prompt);
};

export const reviseLetterService = async (letter: string, feedback: string): Promise<string> => {
    const prompt = `Here is a letter: ${letter}. Please revise it according to the following feedback: ${feedback}.`;
    return await makeApiRequest(prompt);
};

export const listReceivedLettersService = async (userId: string): Promise<Letter[]> => {
    const letterRepo = getRepository(Letter);
    const userRepo = getRepository(User);
    const recipient = await userRepo.findOne({ where: { id: parseInt(userId, 10) } });
    if (!recipient) {
        throw new Error('User not found');
    }
    return await letterRepo.find({ where: { recipient: recipient, isDraft: false } });
};