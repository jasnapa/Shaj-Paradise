import express from "express";
import { vendorLogin } from "../controller/vendorController.js";



const router = express.Router()

router.post('/login',vendorLogin)


export default router