import vendorModel from "../models/vendorModel.js";






export async function viewResort(req,res){
    try {
        const vendors=await vendorModel.find({})
        res.json({success:true,vendors})

    } catch (error) {
        console.log(error);
    }

}