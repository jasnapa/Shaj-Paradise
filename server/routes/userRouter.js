import express from 'express'
import { search, viewResort } from '../controller/userController.js'

const router = express.Router()

router.get('/resorts',viewResort)
router.get('/search',search)
// router.get('/packages/:id',)



export default router