
import { Router } from 'express';
import authRouter from './authRouter.js';
import usersRouter from './usersRouter.js';
import postsRouter from "./postsRouter.js";
import likeRouter from "./likeRouter.js";
import { validateToken } from '../middleware/validateToken.js';

const router = Router();
router.use(usersRouter);
router.use(authRouter);
router.use(postsRouter);
router.use("/likes", validateToken , likeRouter);

export default router;
