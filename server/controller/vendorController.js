import vendorModel from "../models/vendorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from "../config/cloudinary.js";
import packageModel from "../models/packageModel.js";



let salt = bcrypt.genSaltSync(10);

export async function vendorAuth(req,res){
    try {
        const authHeader = req.headers.authorization
        if (authHeader) {
            const token = authHeader.split(' ')[1]
            jwt.verify(token, process.env.VENDOR_SECRET_KEY, async (err, decoded) => {
                if (err) {
                    res.json({ status: false, message: "Unauthorized" })
                } else {
                    const vendor = await vendorModel.findById({_id:decoded.id})
                    console.log(vendor)
                    if(vendor){
                        res.json({status:true ,vendor,  message:"Authorised"})
                    }else{
                        res.json({status:false, message:"Vendor not found"})
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




export async function vendorLogin(req,res){
    try {

        const {email,password} = req.body
        const vendor = await vendorModel.findOne({email})
        if(!vendor){
           return res.json({error:true,message:"You have no vendor Access"})
        }
        const vendorValid = bcrypt.compareSync(password, vendor.password);
    
        if (!vendorValid) {
            return res.json({ error: true, message: "wrong Password" })
        } 
        else {

            const token = jwt.sign(
                {
                    id: vendor._id
                },
                'VendorJwtKey'
            )

            res.json({login:true , message: 'login success',token})
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


export async function uploadImage(req, res) {
    try {
      let files = req.body.images;
      let uploadedImages = [];
      for (let item of files) {
        const result = await cloudinary.uploader.upload(item, {
          folder: "Shaj Paradise",
        });
        // const imageObject = { url: result.secure_url };

        uploadedImages.push(result.secure_url);
      }
  
      let id = req.vendorId;
      const vendor = await vendorModel.findByIdAndUpdate(id, { $push: { images: {$each:uploadedImages} } })
      console.log(vendor,'jshfjdf')
      
      if(vendor){
        return res.json({ success: true, message: "Welcome to Shaj Paradise" })
      }else{
        return res.json({ error: true, message: "Failed to upload images" })
      }
    }catch (error) {
      console.log(error);
      res.status(500).json({ error: true, message: "Failed to upload images." });
    }
}
  


  export async function getVendor(req, res) {

    try {
        let id = req.vendorId
        const vendor = await vendorModel.findById(id)
        res.json({success:true,vendor})
        
    } catch (error) {
        
    }

  }


  export async function addPackage(req, res) {
    try {

        const {amount,daysInfo,amenities} = req.body
    

        const vendor = await packageModel.create({
            amount,
            daysInfo,
            amenities: amenities.split(','),
            resort: req.vendorId
        }).then(() => {
            return res.json({ status: true, message: "package added successfully" });
        }).catch(() => {
            return res.json({ status: false, message: "package adding failed" });
        }) 
        
    } catch (error) {
        
    }
  }
  
  

  
