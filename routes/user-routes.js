import { Router } from 'express';
import {
  createUserController,
  getUserController,
  toggleModeratedController,
} from '../controllers/user-controllers.js';

const router = Router();

router.post('/', createUserController);

router.get('/:id', getUserController);

router.put('/', toggleModeratedController);

export default router;
