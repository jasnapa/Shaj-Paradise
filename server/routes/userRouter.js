import express from 'express'
import { booking, viewResort } from '../controller/userController.js'
import { verifyUser } from '../middleware/verifyUser.js'

const router = express.Router()

router.get('/resorts',viewResort)

router.post('/booking',verifyUser,booking)
// router.get('/packages/:id',)



export default router