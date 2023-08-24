import mongoose from "mongoose"

const BookingSchema = new mongoose.Schema({
    
    resort:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'resort' ,
        required : true
      },
    user:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'users' ,
        required : true
      }, 
    orderId: {
        type: String,
    },
    vendor:{
        type : mongoose.Schema.Types.ObjectId ,
        ref : 'vendorDB' ,
        required : true
      }, 

    date: {
        type: Date,
        default: Date.now()
    },
    person: {
        type: Number,
        required: true
    },
    checkin: {
        type: Date,
        required: true
    },
   checkout: {
        type: Date,
        required: true
    },
    paymentMethod:{
        type:String,
    },
   
})

const bookingModel = mongoose.model("booking", BookingSchema)

export default bookingModel