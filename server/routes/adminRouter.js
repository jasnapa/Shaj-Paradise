import express from "express";
import { adminAuth, adminHistory, adminLogin, approveVendor, blockUser, blockVendor, getStats, unblockUser, unblockVendor, verifyResort, viewResort, viewUsers, viewVendorDetails, viewVendors } from "../controller/adminController.js";
import { verifyUser } from "../middleware/verifyUser.js";
import { verifyAdmin } from "../middleware/verifyAdmin.js";






const router = express.Router()

router.post('/login',adminLogin)
router.get('/auth',adminAuth)

router.get('/users',verifyAdmin,viewUsers)
router.get('/vendors',verifyAdmin,viewVendors)
router.get('/resort',verifyAdmin,viewResort)
router.post('/viewVendors',verifyAdmin,viewVendorDetails)
router.get('/adminHistory',verifyAdmin,adminHistory)
router.get('/getStats',verifyAdmin,getStats)


router.patch('/blockUser',blockUser)
router.patch('/unblockUser',unblockUser)
router.patch('/blockVendor',blockVendor)
router.patch('/unblockVendor',unblockVendor)
router.patch('/approveVendor',approveVendor)
router.patch('/verifyResort',verifyResort)



export default router
