import express from "express";
import { adminAuth, adminHistory, adminLogin, approveVendor, blockUser, blockVendor, unblockUser, unblockVendor, verifyResort, viewResort, viewUsers, viewVendorDetails, viewVendors } from "../controller/adminController.js";
import { verifyUser } from "../middleware/verifyUser.js";






const router = express.Router()

router.post('/login',adminLogin)

router.get('/auth',adminAuth)
router.get('/users',viewUsers)
router.get('/vendors',viewVendors)
router.get('/resort',viewResort)
router.post('/viewVendors',viewVendorDetails)
router.get('/adminHistory',adminHistory)

router.patch('/blockUser',blockUser)
router.patch('/unblockUser',unblockUser)
router.patch('/blockVendor',blockVendor)
router.patch('/unblockVendor',unblockVendor)
router.patch('/approveVendor',approveVendor)
router.patch('/verifyResort',verifyResort)



export default router
