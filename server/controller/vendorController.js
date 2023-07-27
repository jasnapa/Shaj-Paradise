import vendorModel from "../models/vendorModel.js";
import bcrypt from 'bcrypt'



let salt = bcrypt.genSaltSync(10);

export async function vendorLogin(req,res){
    try {

        const {email,password} = req.body
        console.log(req.body);
        const vendor = await vendorModel.findOne({email})
        console.log(vendor);
        if(!vendor){
           return res.json({error:true,message:"You have no vendor Access"})
        }
        const vendorValid = bcrypt.compareSync(password, vendor.password);
    
        if (!vendorValid) {
            return res.json({ error: true, message: "wrong Password" })
        } 
        else {

            // const token = jwt.sign(
            //     {
            //         id: vendor._id
            //     },
            //     'myjwtkey'
            // )

            // return res.cookie("token", token, {
            //     httpOnly: true,
            //     secure: true,
            //     maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
            //     sameSite: "none",
            // }).json({ err: false, vendor: vendor._id, token })
            res.json({login:true , message: 'login success'})
        }
           
    } catch (error) {

        console.log(error);
    }
}

export async function vendorHome(req,res){
    try {
        const vendors=await vendorModel.find({})
        res.json({success:true,vendors})

    } catch (error) {
        console.log(error);
    }

}
