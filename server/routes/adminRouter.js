import express from "express";
import { adminLogin, blockUser, unblockUser, viewUsers, viewVendors } from "../controller/adminController.js";






const router = express.Router()

router.post('/login',adminLogin)
router.get('/users',viewUsers)
router.patch('/blockUser',blockUser)
router.patch('/unblockUser',unblockUser)
router.get('/vendors',viewVendors)


export default router
