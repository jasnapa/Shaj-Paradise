import express from "express";
import { createChat, getUser, getVendor } from "../controller/chatController.js";
import { chats } from "../controller/chatController.js";
import { findChats } from "../controller/chatController.js";





const router = express.Router()

router.post('/createChat',createChat)

router.get('/:Id', chats)
router.get('/vendor/:Id', getVendor)
router.get('/user/:Id', getUser)

router.get('/find/:firstId/:secondId', findChats);





export default router