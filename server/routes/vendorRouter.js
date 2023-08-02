import express from "express";
import { addPackage, getVendor, uploadImage, vendorAuth, vendorHome, vendorLogin} from "../controller/vendorController.js";
import { verifyVendor } from "../middleware/verifyVendor.js";




const router = express.Router()

router.post('/login',vendorLogin)
router.post('/uploadImage',verifyVendor,uploadImage)
router.post('/auth',vendorAuth)
router.post('/addPackage',verifyVendor,addPackage)


 

router.get('/getVendor',verifyVendor,getVendor)
router.get('/home',vendorHome)


export default router