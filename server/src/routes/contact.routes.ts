import { Router } from 'express';
import { sendContactMessage, getContactMessages } from '../controllers/contact.controller';

const router = Router();

router.post('/', sendContactMessage);
router.get('/', getContactMessages);

export default router;
