import express from 'express'
import { generateOTP, login, signUp, userAuth } from '../controller/userAuthController.js'


const router = express.Router()


router.post('/verify',generateOTP)
router.post('/signup',signUp)
router.post('/login',login)
router.get('/auth',userAuth)


export default router