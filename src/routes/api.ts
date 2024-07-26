import { Router } from 'express';
import { generateLetter, reviseLetter } from '../controllers/letterController';

const router = Router();

router.post('/generate-letter', generateLetter);
router.post('/revise-letter', reviseLetter);

export default router;