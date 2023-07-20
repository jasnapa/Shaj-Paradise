import mongoose from "mongoose"

const vendorSchema = new mongoose.Schema({


    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }


}) 
 
const vendorModel=mongoose.model('vendorDB',vendorSchema)

export default vendorModel