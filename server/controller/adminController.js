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
    const users = await UserModel.find({});
    res.json({ success: true, users });
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
    const vendors = await vendorModel.find({});
    res.json({ success: true, vendors });
  } catch (error) {
    console.log(error);
  }
}

export async function viewResort(req, res) {
  try {
    const resort = await resortModel.find({});
    res.json({ success: true, resort });
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
    console.log(req.body,'kjkj');
    const {vendor}=req.body
    const resort = await resortModel.find({vendor:vendor});
    res.json({ success: true, resort });
  } catch (error) {
    console.log(error);
  }
}


export async function adminHistory(req, res) {
  console.log("dfghjkl");
  try {
    const history = await bookingModel.find({}).populate("resort").populate("user")
    console.log(history);
      res.json({ success: true, history });
  } catch (error) {
    console.log(error);
  }
}
