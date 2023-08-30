import express from 'express';
import { addMessage, getMessages } from '../controller/messageController';

const router = express.Router();

router.post('/', addMessage);

router.get('/:chatId', getMessages);

export default router