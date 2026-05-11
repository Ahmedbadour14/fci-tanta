import { Router } from 'express';
import { getStaff, getStaffById } from '../controllers/staff.controller';

const router = Router();

router.get('/', getStaff);
router.get('/:id', getStaffById);

export default router;
