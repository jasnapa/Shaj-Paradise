import express from 'express'
import { booking, bookingHistory, checkResortAvailability, payment, saveProfile, verifyPayment, viewResort } from '../controller/userController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.get('/resorts',viewResort)

router.post('/booking',verifyUser,booking)
router.get('/bookingHistory',verifyUser,bookingHistory)
router.post('/payment',payment)
router.post('/verifypayment',verifyPayment)
router.post('/resortAvailability',verifyUser,checkResortAvailability)
router.patch('/saveProfile',verifyUser,saveProfile)





export default router