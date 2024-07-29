import { Router } from 'express';
import { generateLetter, listReceivedLetters, reviseLetter } from '../controllers/letterController';

/**
 * @swagger
 * tags:
 *   name: Letters
 *   description: API for letters
 */

const router = Router();

/**
 * @swagger
 * /generate-letter:
 *   post:
 *     summary: Generate a new letter
 *     tags: [Letters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               recipient:
 *                 type: string
 *               purpose:
 *                 type: string
 *               tone:
 *                 type: string
 *               keywords:
 *                 type: string
 *               isDraft:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: The generated letter
 */
router.post('/generate-letter', generateLetter);

/**
 * @swagger
 * /revise-letter:
 *   post:
 *     summary: Revise an existing letter
 *     tags: [Letters]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               letter:
 *                 type: string
 *               feedback:
 *                 type: string
 *     responses:
 *       200:
 *         description: The revised letter
 */
router.post('/revise-letter', reviseLetter);

/**
 * @swagger
 * /received-letters/{userId}:
 *   get:
 *     summary: Get all received letters for a user
 *     tags: [Letters]
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: User ID
 *     responses:
 *       200:
 *         description: List of received letters
 */
router.get('/received-letters/:userId', listReceivedLetters);

export default router;