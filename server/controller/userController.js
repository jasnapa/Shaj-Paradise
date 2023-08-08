import bookingModel from "../models/bookingModel.js";
import resortModel from "../models/resortModel.js";
import vendorModel from "../models/vendorModel.js";






export async function viewResort(req,res){
    try {
        const resorts=await resortModel.find({})
        console.log( resorts);
        res.json({success:true,resorts})

    } catch (error) {
        console.log(error);
    }

}


export async function booking(req, res) {

try {
    const{resort,person,checkin,checkout,}=req.body
console.log(req.body);
    const booking = await bookingModel.create({
        resort,
        user: req.userId,
        person,
        checkin,
        checkout
    }).then(()=>{
         console.log('success');
        res.json({ status: true, message: "Booking successfull" });

    }).catch((error)=>{
        console.log(error);
        res.json({ status: false, message: "booking failed" });

    })
    
} catch (error) {
    console.log(error);
}
}







// export async function viewPackage(req,res){
//    try {
//   const id= req.params.id
//   const packages = await packageModel.find({resort:id}).populate('resort')
//   if(packages){
//    res.json({success:true,packages}) 
//   }else{
//     res.json({error:true})
//   }
//    } catch (error) {
//     console.log(error)
//    }

// }
