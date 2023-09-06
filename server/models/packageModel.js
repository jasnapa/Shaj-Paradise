import mongoose from "mongoose"

const PackageSchema = new mongoose.Schema({
   amount: {
        type: Number,
        required: true
    },
    daysInfo: {
        type: String,
        required: true
    },
    amenities:{
        type:Array,
        required:true
    },
    resort:{
      type : mongoose.Schema.Types.ObjectId ,
      ref : 'vendorDB' ,
      required : true
    },
    
 
   
})

const packageModel = mongoose.model("package", PackageSchema)

export default packageModel