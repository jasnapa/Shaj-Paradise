import adminModel from "../models/adminModel.js";
import jwt from "jsonwebtoken";
import UserModel from "../models/userModel.js";
import vendorModel from "../models/vendorModel.js";
import bcrypt from "bcrypt";
import resortModel from "../models/resortModel.js";
import bookingModel from "../models/bookingModel.js";

let salt = bcrypt.genSaltSync(10);

const maxAge = 3 * 24 * 60 * 60;

const createToken = (id) => {
  return jwt.sign({ id }, "AdminJwtKey", { expiresIn: maxAge });
};

export async function adminLogin(req, res) {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);
    const admin = await adminModel.findOne({ email });
    console.log(admin);
    if (!admin) {
      return res.json({ error: true, message: "You have no Admin Access" });
    }
    if (admin.password !== password) {
      return res.json({ error: true, message: "wrong password" });
    } else {
      const token = createToken(admin._id);

      res.json({ login: true, token });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function adminAuth(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.ADMIN_SECRET_KEY, async (err, decoded) => {
        if (err) {
          res.json({ status: false, message: "Unauthorized" });
        } else {
          const admin = await adminModel.findById({ _id: decoded.id });
          console.log(admin);
          if (admin) {
            res.json({ status: true, message: "Authorised" });
          } else {
            res.json({ status: false, message: "admin not found" });
          }
        }
      });
    } else {
      res.json({ status: false, message: "admin not exists" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function viewUsers(req, res) {
  try {
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    let sort = req.query.sort 
    const users = await UserModel.find({}).sort(sort).skip(page * limit).limit(limit);
    const total = await UserModel.countDocuments({});
    const response = {
      success: true,
      total,
      page: page + 1,
      limit,
      users ,
  };
  res.status(200).json(response)
  } catch (error) {
    console.log(error);
  }
}

export async function blockUser(req, res) {
  try {
    await UserModel.findByIdAndUpdate(req.body._id, {
      $set: { blocked: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function unblockUser(req, res) {
  try {
    await UserModel.findByIdAndUpdate(req.body._id, {
      $set: { blocked: false },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function viewVendors(req, res) {
  try {
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    let sort = req.query.sort 
    const vendors = await vendorModel.find({}).sort(sort).skip(page * limit).limit(limit);
    const total = await vendorModel.countDocuments({});
    const response = {
      success: true,
      total,
      page: page + 1,
      limit,
      vendors ,
  };
  res.status(200).json(response)
  } catch (error) {
    console.log(error);
  }
}

export async function viewResort(req, res) {
  try {
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    let sort = req.query.sort 

    const resort = await resortModel.find({}).sort(sort).skip(page * limit).limit(limit);
    const total = await resortModel.countDocuments({});
    const response = {
      success: true,
      total,
      page: page + 1,
      limit,
      resort ,
  };
    
  res.status(200).json(response)
  } catch (error) {
    console.log(error);
  }
}

export async function blockVendor(req, res) {
  try {
    await vendorModel.findByIdAndUpdate(req.body._id, {
      $set: { blocked: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function unblockVendor(req, res) {
  try {
    await vendorModel.findByIdAndUpdate(req.body._id, {
      $set: { blocked: false },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function approveVendor(req, res) {
  try {
    await vendorModel.findByIdAndUpdate(req.body._id, {
      $set: { approve: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function verifyResort(req, res) {
  try {
    await resortModel.findByIdAndUpdate(req.body._id, {
      $set: { verify: true },
    });
    res.json({ success: true });
  } catch (error) {
    console.log(error);
  }
}

export async function viewVendorDetails(req, res) {
  try { 
    const {vendor}=req.body 
    const resort = await resortModel.find({vendor:vendor});
    res.json({ success: true, resort });
  } catch (error) {
    console.log(error);
  }
}


export async function adminHistory(req, res) {
  try {
     const {fromDate , toDate} = req.query
        if (fromDate && toDate) { 
            let query = bookingModel.find({});
            query = query.where('date').gte(new Date(fromDate)).lte(new Date(toDate));
            const history = await query.populate('user').populate('resort').populate('vendor')
            return res.json({ success: true, history });
        }
       
              const page = parseInt(req.query.page) - 1 || 0
              const limit = parseInt(req.query.limit) || 5
              const search = req.query.search || ""
              let sort = req.query.sort 
      
      
      
            
      
              const history  = await bookingModel.find({}).sort(sort).skip(page * limit).limit(limit).populate("resort").populate("user").populate("vendor")
              const total = await bookingModel.countDocuments({});
      
              const response = {
                  success: true,
                  total,
                  page: page + 1,
                  limit,
                  history ,
              };
      
              res.status(200).json(response)
          
      
   
  } catch (error) {
    console.log(error);
  }
}


export async function getStats(req, res) {
  try {
    const count = await Promise.all([
      UserModel.countDocuments({}).exec(),
      vendorModel.countDocuments({}).exec(),
      bookingModel.countDocuments({}).exec(),
      resortModel.countDocuments({}).exec(),
    ]);

    const monthlyRevenuePipeline = [
      {
        $group: {
          _id: { $month: "$date" }, // Group by month
          totalRevenue: { $sum: "$totalAmount" }, // Sum the resort's amount
        },
      },
    ];

    const monthlyRevenueResult = await bookingModel.aggregate(monthlyRevenuePipeline);

    const monthlyRevenue = Array(12).fill(0); // Initialize an array for 12 months
    monthlyRevenueResult.forEach((item) => {
      monthlyRevenue[item._id - 1] = item.totalRevenue; // Populate the monthly revenue array
    });
console.log(monthlyRevenue);
    res.json({ success: true, count, monthlyRevenue });
  } catch (error) {
    console.log(error);
  }
}


