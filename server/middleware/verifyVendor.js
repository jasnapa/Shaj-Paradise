
import jwt from 'jsonwebtoken'
import vendorModel from '../models/vendorModel.js';


export async function verifyVendor(req, res, next) {

    try {
        const authHeader = req.headers.authorization

        if (authHeader) {
            const token = authHeader.split(' ')[1]
            console.log(process.env.VENDOR_SECRET_KEY)
            jwt.verify(token, process.env.VENDOR_SECRET_KEY, async (err, decoded) => {

                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const vendor = await vendorModel.findById({ _id: decoded.id })
                    if (vendor) {

                        req.vendorId = decoded.id
                        next()

                    } else {
                        res.json({ status: false, message: "vendor not found" })
                    }
                }
            })
        } else {
            res.json({ status: false, message: "vendor not exists" })
        }
    } catch (error) {

        console.log(error);
    }

}