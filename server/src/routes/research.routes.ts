import { Router } from 'express';
import { getResearch, createResearch, updateResearch, deleteResearch } from '../controllers/research.controller';

const router = Router();

router.get('/', getResearch);
router.post('/', createResearch);
router.put('/:id', updateResearch);
router.delete('/:id', deleteResearch);

export default router;
