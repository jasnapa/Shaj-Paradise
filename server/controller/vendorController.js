import vendorModel from "../models/vendorModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cloudinary from "../config/cloudinary.js";
import resortModel from "../models/resortModel.js";


const createToken = (id) => {
    // console.log("drfdg" ,key);
    return jwt.sign({ id }, "VendorJwtKey");
  };


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
        console.log(req.body);
        const vendor = await vendorModel.findOne({email})
        console.log(vendor);
        if(!vendor){
            res.json({error:true,message:"You have no vendor Access"})
        }
        else if(!vendor.approve){
             res.json({error:true,message:"you are not approved"})
        }
        else if(vendor.blocked){
             res.json({error:true,message:"you are blocked"})
        }
        const vendorValid = bcrypt.compareSync(password, vendor.password);

        if(vendorValid){

            const token = createToken(vendor._id);

            res.json({login:true,token})
        }

    
    } catch (error) {
        console.log(error);
    }
}

export async function addVendor(req, res) {
    try {
        console.log(req.body , "sdhjghsdg");
        const { vendorName, email, mobile, password} = req.body
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
            vendorName,
            email,
            mobile,
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
        console.log(error);
    }

  }


  export async function addResort(req, res) {
    try {



        let files = req.body.images;
        let images = []

        for (let item of files) {
        const result = await cloudinary.uploader.upload(item, {
            folder: "Shaj Paradise",
          });
          images.push(result.secure_url)
        } 
        
        const {resortName,description,amount,amenities,locations,place} = req.body
    

        const vendor = await resortModel.create({
            resortName,
            description,
            amount,
            amenities: amenities.split(','),
            vendor: req.vendorId,
            images,
            locations,
            place
        }).then(()=>{
             console.log('success');
            res.json({ status: true, message: "package added successfully" });

        })
        
       
        
    } catch (error) {
        console.log(error);
    }
  }
  
  

  export async function vendorResorts(req,res){
    try {

   const id = req.vendorId
   const resorts = await resortModel.find({vendor:id})
   if(resorts){
    res.json({success:true,resorts})
    console.log(resorts); 
   }else{
     res.json({error:true})
   }
    } catch (error) {
     console.log(error)
    }
 
 }



 