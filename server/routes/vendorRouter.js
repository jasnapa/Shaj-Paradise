import express from "express";
import { addResort, addVendor, editProfile, editResort, getVendor, uploadImage, vendorAuth, vendorBooking, vendorHome, vendorLogin, vendorResorts,} from "../controller/vendorController.js";
import { verifyVendor } from "../middleware/verifyVendor.js";




const router = express.Router()

router.post('/login',vendorLogin)
router.post('/add',addVendor)
router.post('/uploadImage',verifyVendor,uploadImage)
router.post('/auth',vendorAuth)
router.post('/addResort',verifyVendor,addResort)
router.get('/resorts',verifyVendor,vendorResorts)
router.get('/getVendor',verifyVendor,getVendor)
router.get('/home',verifyVendor,vendorHome)
router.patch('/editProfile',verifyVendor,editProfile)
router.get('/vendorBooking',verifyVendor,vendorBooking)
router.patch('/editResort',verifyVendor,editResort)


export default router