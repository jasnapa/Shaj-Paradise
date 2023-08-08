import express from "express";
import { adminAuth, adminLogin, approveVendor, blockUser, blockVendor, unblockUser, unblockVendor, viewResort, viewUsers, viewVendors } from "../controller/adminController.js";






const router = express.Router()

router.post('/login',adminLogin)

router.get('/auth',adminAuth)
router.get('/users',viewUsers)
router.get('/vendors',viewVendors)
router.get('/resort',viewResort)

router.patch('/blockUser',blockUser)
router.patch('/unblockUser',unblockUser)
router.patch('/blockVendor',blockVendor)
router.patch('/unblockVendor',unblockVendor)
router.patch('/approveVendor',approveVendor)



export default router
