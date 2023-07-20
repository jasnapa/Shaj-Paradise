import express from 'express'
import { generateOTP, login, signUp } from '../controller/userAuthController.js'


const router = express.Router()


router.post('/verify',generateOTP)
router.post('/signup',signUp)
router.post('/login',login)


export default router