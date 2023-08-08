
import jwt from 'jsonwebtoken'
import UserModel from '../models/userModel.js';


export async function verifyUser(req, res, next) {

    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            console.log(process.env.USER_SECRET_KEY)
            jwt.verify(token, process.env.USER_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const user = await UserModel.findById({ _id: decoded.id })
                    if (user) {

                        req.userId = decoded.id
                        next()

                    } else {
                        res.json({ status: false, message: "user not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "user not exists" })
        }
    } catch (error) {

        console.log(error);
    }

}