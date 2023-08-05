import mongoose from "mongoose"

const ResortSchema = new mongoose.Schema({
    
    vendor:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'vendorDB' ,
        required : true
      }, 
    resortName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: {
        type: Array,
    },
   amount: {
        type: Number,
        required: true
    },
    amenities:{
        type:Array,
        required:true
    },
    locations:{
        type:Object,
        required:true
    },
    place:{
        type:String,
        required:true
    },
    
 
   
})

const resortModel = mongoose.model("resort", ResortSchema)

export default resortModel