import mongoose from "mongoose"

const adminSchema = new mongoose.Schema({


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
 
const adminModel=mongoose.model('adminDB',adminSchema)

export default adminModel