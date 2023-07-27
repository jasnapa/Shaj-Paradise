import express from 'express'
import { viewResort } from '../controller/userController.js'

const router = express.Router()

router.get('/resorts',viewResort)


export default router