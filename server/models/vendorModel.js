import mongoose from "mongoose"

const vendorSchema = new mongoose.Schema({
    
    vendorName:{
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
    },
    mobile: {
        type: Number,
        required: true
    },
    blocked:{
        type:Boolean,
        default:false
    },
    approve:{
        type:Boolean,
        default:false
    }


}) 
 
const vendorModel=mongoose.model('vendorDB',vendorSchema)

export default vendorModel