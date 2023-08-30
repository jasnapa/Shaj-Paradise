import express from "express";
import { createChat } from "../controller/chatController.js";
import { chats } from "../controller/chatController.js";
import { findChats } from "../controller/chatController.js";





const router = express.Router()

router.post('/createChat',createChat)

router.get('/:Id', chats)

router.get('/find/:firstId/:secondId', findChats);





export default router