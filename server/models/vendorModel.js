import mongoose from "mongoose"

// const imageSchema = new mongoose.Schema({
//     url: {
//       type: String,
//       required: true,
//     },
//   });

const vendorSchema = new mongoose.Schema({
    
    resortName:{
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
    description:{
    type:String,
    required:true
   },
   
   images:{
    type:Array
   }


}) 
 
const vendorModel=mongoose.model('vendorDB',vendorSchema)

export default vendorModel