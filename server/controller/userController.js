import bookingModel from "../models/bookingModel.js";
import resortModel from "../models/resortModel.js";
import Razorpay from "razorpay";
import crypto from "crypto";
import { log } from "console";
import UserModel from "../models/userModel.js";

const instance = new Razorpay({
  key_id: "rzp_test_X2EWEu9JQG1E2R",
  key_secret: "KALo71knuY2gnsnEv6aBNjEM",
});

export async function viewResort(req, res) {
  try {
    const search = req.query.search || "";
    let sort = req.query.sort;
    let filter = req.query.filter || "All"

    let priceFilter = {}

    // console.log(filter)
    

    if (filter === "LessThan5000") {
      priceFilter = { amount: { $lt: 5000 } };
    }else if(filter === 'GreaterThan5000'){
      priceFilter = { amount: { $gt: 5000 } };
    }

    const resorts = await resortModel
      .find({ verify: true, resortName: { $regex: search, $options: "i" }, ...priceFilter })
      .sort(sort)
    const total = await resortModel.countDocuments({ verify: true });

    const response = {
      success: true,
      resorts,
    };

    res.status(200).json(response);

    // const resorts=await resortModel.find({verify:true})
    // console.log( resorts);
    // res.json({success:true,resorts})
  } catch (error) {
    console.log(error);
  }
}

export async function booking(req, res) {
  try {
    const { resort,totalAmount,vendor, person, checkin, checkout, orderId, paymentMethod } =
      req.body;
    const booking = await bookingModel
      .create({
        resort,
        totalAmount,
        vendor,
        user: req.userId,
        person,
        checkin,
        checkout,
        orderId,
        paymentMethod,
      })
      .then(() => {
        console.log("success");
        res.json({ status: true, message: "Booking successfull" });
      })
      .catch((error) => {
        console.log(error);
        res.json({ status: false, message: "booking failed" });
      });
  } catch (error) {
    console.log(error);
  }
}

export async function bookingHistory(req, res) {
  try {
    let id = req.userId;
    const booking = await bookingModel.find({ user: id }).populate("resort").populate('vendor')
    if (booking) {
      res.json({ success: true, booking });
    } else {
      res.json({ error: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function payment(req, res) {
  try {
    const { amount } = req.body;
    const options = {
      amount: amount * 100,
      currency: "INR",
    };

    const order = await instance.orders.create(options);
    res.status(200).json({ success: true, order });
  } catch (error) {
    console.log(error);
  }
}

export async function verifyPayment(req, res) {
  try {
    const { response } = req.body;
    const order_id = response.razorpay_order_id;
    const razorpay_payment_id = response.razorpay_payment_id;
    const razorpay_signature = response.razorpay_signature;
    const secret = "KALo71knuY2gnsnEv6aBNjEM"; // Replace this with your actual secret key

    const generated_signature = generateHmacSHA256(
      order_id + "|" + razorpay_payment_id,
      secret
    );

    if (generated_signature === razorpay_signature) {
      res.json({ success: true, message: "payment successful", order_id });
    }
  } catch (error) {
    console.log(error);
  }
}

function generateHmacSHA256(data, secret) {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(data);
  return hmac.digest("hex");
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
export async function checkResortAvailability(req,res){

  try{

    const {fromDate, toDate,resort} = req.body
   

    const booking = await bookingModel.findOne({
    //   $and: [
    //     { resort: resort },
    //     {
    //         $or: [
    //             {
    //                 $and: [
    //                     { checkin: { $gte: new Date(fromDate) } },
    //                     { checkin: { $lt: new Date(toDate) } }
    //                 ]
    //             },
    //             {
    //                 $and: [
    //                     { checkout: { $gt: new Date(fromDate) } },
    //                     { checkout: { $lte: new Date(toDate) } }
    //                 ]
    //             },
    //             {
    //                 $and: [
    //                     { checkin: { $lt: new Date(fromDate) } },
    //                     { checkout: { $gt: new Date(toDate) } }
    //                 ]
    //             }
    //         ]
    //     }
    // ]
    resort: resort,
    $or: [
        { checkin: { $lt: new Date(toDate) }, checkout: { $gt: new Date(fromDate) } },
        { checkin: { $gte: new Date(fromDate), $lte: new Date(toDate) } },
        { checkout: { $gt: new Date(fromDate), $lte: new Date(toDate) } },
    ],
  })


  if (booking) {
    res.json({ success: false, message: 'Oops ! Resort is already booked for the date' });
  } else {
    res.json({ success: true, message: 'Resort is available for booking' });
  }  
}catch(err){
    res.json({ success: false, message: "something went wrong", err });
  }
}



export async function saveProfile(req,res){
  try {
    const { name,mobile } =req.body
    let _id=req.userId
     const edit = await UserModel.findByIdAndUpdate(_id,{$set:{name,mobile}})
     if(edit){
      res.json({success:true,message:"update successfully"})
     }else{
      res,json({success:false,message:"failed"})
     }

   
  } catch (error) {
    console.log(error);
  }
}



export async function getBookedDates(req,res){
  try {
    // console.log("lkjhgfds",req.body);
    
    const {resort}=req.body
    const bookedDates = await bookingModel.find({
      resort: resort
    },{checkin:1,checkout:1})
    const formattedBookedDates = bookedDates.map((booking) => {
      return {
        from: new Date(booking.checkin).toISOString().split("T")[0],
        to: new Date(booking.checkout).toISOString().split("T")[0],
      };
    });

    res.json({success:true, bookedDates: formattedBookedDates})
  } catch (error) {
    console.log(error);
  }
}