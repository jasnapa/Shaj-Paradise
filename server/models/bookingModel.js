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

    date: {
        type: Date,
        default: Date.now()
    },
    person: {
        type: Number,
        required: true
    },
    checkin: {
        type: String,
        required: true
    },
   checkout: {
        type: String,
        required: true
    },
    paymentMethod:{
        type:String,
    },
   
})

const bookingModel = mongoose.model("booking", BookingSchema)

export default bookingModel