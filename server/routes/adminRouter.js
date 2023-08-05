import express from "express";
import { adminLogin, approveVendor, blockUser, blockVendor, unblockUser, unblockVendor, viewUsers, viewVendors } from "../controller/adminController.js";






const router = express.Router()

router.post('/login',adminLogin)
router.get('/users',viewUsers)
router.patch('/blockUser',blockUser)
router.patch('/unblockUser',unblockUser)
router.get('/vendors',viewVendors)
router.patch('/blockVendor',blockVendor)
router.patch('/unblockVendor',unblockVendor)
router.patch('/approveVendor',approveVendor)



export default router
