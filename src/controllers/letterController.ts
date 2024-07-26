import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Letter } from '../entities/Letter';
import { generateLetterService, reviseLetterService, listReceivedLettersService } from '../services/letterService';

export const generateLetter = async (req: Request, res: Response) => {
    const { recipient, purpose, tone, keywords, isDraft = false } = req.body;
    try {
        const letterContent = await generateLetterService(recipient, purpose, tone, keywords);
        const letterRepo = getRepository(Letter);
        const letter = new Letter();
        letter.recipient = recipient;
        letter.purpose = purpose;
        letter.tone = tone;
        letter.keywords = keywords;
        letter.isDraft = isDraft;
        await letterRepo.save(letter);
        res.json({ letter: letterContent });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error generating letter');
    }
};

export const reviseLetter = async (req: Request, res: Response) => {
    const { letter, feedback } = req.body;
    try {
        const revisedLetter = await reviseLetterService(letter, feedback);
        res.json({ revisedLetter });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error revising letter');
    }
};

export const listReceivedLetters = async (req: Request, res: Response) => {
    const { userId } = req.params;
    try {
        const letters = await listReceivedLettersService(userId);
        res.json({ letters });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error fetching received letters');
    }
};