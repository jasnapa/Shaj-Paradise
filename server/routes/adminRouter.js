import express from "express";
import { addVendor, adminLogin, blockUser, blockVendor, unblockUser, unblockVendor, viewUsers, viewVendors } from "../controller/adminController.js";






const router = express.Router()

router.post('/login',adminLogin)
router.get('/users',viewUsers)
router.patch('/blockUser',blockUser)
router.patch('/unblockUser',unblockUser)
router.get('/vendors',viewVendors)
router.post('/vendors/add',addVendor)
router.patch('/blockVendor',blockVendor)
router.patch('/unblockVendor',unblockVendor)



export default router
