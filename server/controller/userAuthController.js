import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationCode, verifyOtp } from "../helper/sendOtp.js";



let userDetails
let salt = bcrypt.genSaltSync(10); 
const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    // console.log("drfdg" ,key);
    return jwt.sign({ id }, "mysecretKey", { expiresIn: maxAge });
  };




  export async function generateOTP(req, res) {
    try {
        console.log("verifdsijfdiohf");
        console.log(req.body, 'body');
        const { email } = req.body
        const user = await UserModel.findOne({ email })

        if (user) {

            return res.json({
                error: true,
                message: " User already registered here"
            })
        } else {
            sendVerificationCode(email, req)
                .then((response) => {
                    res.json({ status: true, message: "Email sent successfully" })
                    userDetails = req.body
                    console.log(userDetails);
                })
                .catch((response) => {
                    res.json({ status: false, message: "OTP not send" });
                });
        }

    } catch (error) {

        console.log(error);
    }
}


  
export async function signUp(req, res) {
    console.log("signup");
    try {
        let verified = verifyOtp(req.body.otp)
        console.log(req.body.otp, 'otpppp');
        if (verified) {
            console.log(userDetails);
            const { name, email, mobile, password} = userDetails

            let hashedPassword = bcrypt.hashSync(password, salt)

            const user = await UserModel.create({
                name,
                email,
                mobile,
                password: hashedPassword,
              
            });
            res.status(201)
                .json({ status: true, message: "Otp verified successfully" });
        } else {
            res.json({ status: false, message: "Otp does not match " });
        }
    } catch (error) {

        console.log(error);

    }

}


    export async function login(req, res) {
        try {
            console.log("grtlogin");
            const { email, password } = req.body
            const user = await UserModel.findOne({ email })
            console.log(user);
            if (!user) {
                res.json({ error: true, message: 'User not registered' })
            }
            const userValid = bcrypt.compareSync(password, user.password);
    
            if (!userValid) {
                return res.json({ err: true, message: "wrong Password" })
            } else {
    
                const token = createToken(user._id);
                return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                sameSite: "none",
                }
            ).json({ login: true, user: user._id, token })
            }
    
        } catch (error) {
            console.log(error);
        }

    
}

