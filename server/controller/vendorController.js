// import vendorModel from "../models/vendorModel";



// let salt = bcrypt.genSaltSync(10);

// export async function vendorLogin(req,res){
//     try {

//         const {name,email,password} = req.body
//         console.log(req.body);
//         const vendor = await vendorModel.findOne({email})
//         console.log(vendor);
//         if(!vendor){
//            return res.json({error:true,message:"You have no vendor Access"})

//         } else {

//             const token = jwt.sign(
//                 {
//                     id: vendor._id
//                 },
//                 'myjwtkey'
//             )

//             return res.cookie("token", token, {
//                 httpOnly: true,
//                 secure: true,
//                 maxAge: 1000 * 60 * 60 * 24 * 7 * 30,
//                 sameSite: "none",
//             }).json({ err: false, vendor: vendor._id, token })
//         }
           
//     } catch (error) {

//         console.log(error);
//     }
// }