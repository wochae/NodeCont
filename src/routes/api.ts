import { Router } from 'express';
import { generateLetter, reviseLetter } from '../controller/LetterController';

const router = Router();

router.post('/generate-letter', generateLetter);
router.post('/revise-letter', reviseLetter);

export default router;