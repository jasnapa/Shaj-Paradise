
import jwt from 'jsonwebtoken'
import adminModel from '../models/adminModel.js'



export async function verifyAdmin(req, res, next) {

    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            console.log(process.env.ADMIN_SECRET_KEY)
            jwt.verify(token, process.env.ADMIN_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const admin = await adminModel.findById({ _id: decoded.id })
                    if (admin) {

                        req.adminId = decoded.id
                        next()

                    } else {
                        res.json({ status: false, message: "admin not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "admin not exists" })
        }
    } catch (error) {

        console.log(error);
    }

}