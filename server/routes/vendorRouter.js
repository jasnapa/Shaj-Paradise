import express from "express";
import { vendorHome, vendorLogin } from "../controller/vendorController.js";




const router = express.Router()

router.post('/login',vendorLogin)
router.get('/home',vendorHome)


export default router