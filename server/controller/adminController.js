import adminModel from "../models/adminModel.js";
import jwt from 'jsonwebtoken'
import UserModel from "../models/userModel.js";
import vendorModel from "../models/vendorModel.js";
import bcrypt from 'bcrypt'
import { sendVerificationCode } from "../helper/sendOtp.js";




let salt = bcrypt.genSaltSync(10); 

export async function adminLogin(req,res){
    try {

        const {name,email,password} = req.body
        console.log(req.body);
        const admin = await adminModel.findOne({email})
        console.log(admin);
        if(!admin){
           return res.json({error:true,message:"You have no Admin Access"})

        } 
        if(admin.password!==password){
               return res.json({error:true,message:"wrong password"})
        }
        else {

            const token = jwt.sign(
                {
                    id: admin._id
                },
                'myjwtkey'
            )

            return res.cookie("token", token, {
                httpOnly: true,
                secure: true,
                maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
                sameSite: "none",
            }).json({ err: false, admin: admin._id, token })
        }
           
    } catch (error) {

        console.log(error);
    }
}


export async function viewUsers(req,res){
    try {
        const users=await UserModel.find({})
        res.json({success:true,users})

    } catch (error) {
        console.log(error);
    }
}


export async function blockUser(req,res){
try {
    await UserModel.findByIdAndUpdate(req.body._id,{$set:{blocked:true}})

} catch (error) {
    console.log(error);
}
}


export async function unblockUser(req,res){
    try {
        await UserModel.findByIdAndUpdate(req.body._id,{$set:{blocked:false}})
    
    } catch (error) {
        console.log(error);
    }
    }




    export async function viewVendors(req,res){
        try {
            const vendors=await vendorModel.find({})
            res.json({success:true,vendors})
    
        } catch (error) {
            console.log(error);
        }
    }

    

    export async function addVendor(req, res) {
        try {
    
            const { resortName, email, mobile, description, password} = req.body
            const vendor = await vendorModel.findOne({ email })
            console.log(req.body);
            if (vendor) {
    
                return res.json({
                    error: true,
                    message: " vendor already registered "
                })
            } else {

            let hashedPassword = bcrypt.hashSync(password, salt)
            const role='vendor'


            const vendor = await vendorModel.create({
                resortName,
                email,
                mobile,
                description,
                password :hashedPassword
            }).then(() => {
                return res.json({ status: true, message: "vendor added successfully" });
            }).catch((error) => {
                console.log(error);
                return res.json({ status: false, message: "vendor adding failed" });
            }) 
        }
        } catch (error) {
            console.log(error);
        }
    }


    export async function blockVendor(req,res){
        try {
            await vendorModel.findByIdAndUpdate(req.body._id,{$set:{blocked:true}})
        
        } catch (error) {
            console.log(error);
        }
        }



        export async function unblockVendor(req,res){
            try {
                await vendorModel.findByIdAndUpdate(req.body._id,{$set:{blocked:false}})
            
            } catch (error) {
                console.log(error);
            }
            }


    