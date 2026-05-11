import { Router } from 'express';
import { getNews, getNewsById, createNews, updateNews, deleteNews } from '../controllers/news.controller';
import { upload } from '../middleware/upload.middleware';

const router = Router();

router.get('/', getNews);
router.get('/:id', getNewsById);
router.post('/', upload.single('image'), createNews);
router.put('/:id', upload.single('image'), updateNews);
router.delete('/:id', deleteNews);

export default router;
