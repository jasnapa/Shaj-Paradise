import express from 'express'
import { search, viewPackage, viewResort } from '../controller/userController.js'

const router = express.Router()

router.get('/resorts',viewResort)
router.get('/search',search)
router.get('/packages/:id',viewPackage)


export default router