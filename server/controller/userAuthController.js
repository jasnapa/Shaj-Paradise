import UserModel from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { sendVerificationCode, verifyOtp } from "../helper/sendOtp.js";




let userDetails
let salt = bcrypt.genSaltSync(10); 
const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
    return jwt.sign({ id }, "UserJwtKey", { expiresIn: maxAge });
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
               return res.json({ error: true, message: 'User not registered' })
            }
             if(user.blocked){
               return res.json({error:true,message:"you are blocked"})
           }
            const userValid = bcrypt.compareSync(password, user.password);
    
            if (!userValid) {
                return res.json({ error: true, message: "wrong Password" })
            } else {
    
                const token = createToken(user._id);
            
            res.json({ login: true, user, token })
            }
    
        } catch (error) {
            console.log(error);
        }

    
}



export async function userAuth(req,res){
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.USER_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const user = await UserModel.findById({_id:decoded.id})
                    console.log(user)
                    if(user){
                        res.json({status:true ,user,  message:"Authorised"})
                    }else{
                        res.json({status:false, message:"user not found"})
                    }
                }
            })
        }else{
            res.json({status:false , message:"User not exists"})
        }
    } catch (error) {
        console.log(error);
    }
}




