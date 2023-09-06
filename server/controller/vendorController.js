import vendorModel from "../models/vendorModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cloudinary from "../config/cloudinary.js";
import resortModel from "../models/resortModel.js";
import bookingModel from "../models/bookingModel.js";

const createToken = (id) => {
  // console.log("drfdg" ,key);
  return jwt.sign({ id }, "VendorJwtKey");
};

let salt = bcrypt.genSaltSync(10);

export async function vendorAuth(req, res) {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const token = authHeader.split(" ")[1];
      jwt.verify(token, process.env.VENDOR_SECRET_KEY, async (err, decoded) => {
        if (err) {
          res.json({ status: false, message: "Unauthorized" });
        } else {
          const vendor = await vendorModel.findById({ _id: decoded.id });
          console.log(vendor);
          if (vendor) {
            res.json({ status: true, vendor, message: "Authorised" });
          } else {
            res.json({ status: false, message: "Vendor not found" });
          }
        }
      });
    } else {
      res.json({ status: false, message: "User not exists" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function vendorLogin(req, res) {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const vendor = await vendorModel.findOne({ email });
    console.log(vendor);
    if (!vendor) {
      res.json({ error: true, message: "You have no vendor Access" });
    } else if (!vendor.approve) {
      res.json({ error: true, message: "you are not approved" });
    } else if (vendor.blocked) {
      res.json({ error: true, message: "you are blocked" });
    }
    const vendorValid = bcrypt.compareSync(password, vendor.password);

    if (!vendorValid) {
      res.json({ error: true, message: "wrong password" });
    } else {
      const token = createToken(vendor._id);

      res.json({ login: true, token, vendor });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addVendor(req, res) {
  try {
    console.log(req.body, "sdhjghsdg");
    const { vendorName, email, mobile, password } = req.body;
    const vendor = await vendorModel.findOne({ email });
    console.log(req.body);
    if (vendor) {
      return res.json({
        error: true,
        message: " vendor already registered ",
      });
    } else {
      let hashedPassword = bcrypt.hashSync(password, salt);

      const vendor = await vendorModel
        .create({
          vendorName,
          email,
          mobile,
          password: hashedPassword,
        })
        .then(() => {
          return res.json({
            status: true,
            message: "vendor added successfully",
          });
        })
        .catch((error) => {
          console.log(error);
          return res.json({ status: false, message: "vendor adding failed" });
        });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function vendorHome(req, res) {
  try {
    const id = req.vendorId;
    const resorts = await resortModel.find({ vendor: id });
    if (resorts) {
      res.json({ success: true, resorts });
      console.log(resorts);
    } else {
      res.json({ error: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function uploadImage(req, res) {
  try {
    let files = req.body.images;
    let uploadedImages = [];
    for (let item of files) {
      const result = await cloudinary.uploader.upload(item, {
        folder: "Shaj Paradise",
      });
      // const imageObject = { url: result.secure_url };

      uploadedImages.push(result.secure_url);
    }

    let id = req.vendorId;
    const vendor = await vendorModel.findByIdAndUpdate(id, {
      $push: { images: { $each: uploadedImages } },
    });
    console.log(vendor, "jshfjdf");

    if (vendor) {
      return res.json({ success: true, message: "Welcome to Shaj Paradise" });
    } else {
      return res.json({ error: true, message: "Failed to upload images" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: true, message: "Failed to upload images." });
  }
}

export async function getVendor(req, res) {
  try {
    let id = req.vendorId;
    const vendor = await vendorModel.findById(id);
    res.json({ success: true, vendor });
  } catch (error) {
    console.log(error);
  }
}

export async function addResort(req, res) {
  try {
    let files = req.body.images;
    let images = [];
    for (let item of files) {
      const result = await cloudinary.uploader.upload(item, {
        folder: "Shaj Paradise",
      });
      images.push(result.secure_url);
    }

    const {
      resortName,
      description,
      capacity,
      amount,
      amenities,
      locations,
      place,
    } = req.body;

    const vendor = await resortModel.create({
      resortName,
      description,
      capacity,
      amount,
      amenities: amenities.split(","),
      vendor: req.vendorId,
      images,
      locations,
      place,
    });
    console.log(vendor);
    res.json({ status: true, message: "Resort added successfully" });
  } catch (error) {
    console.log(error);
    res.json({ status: false, message: "server error" });
  }
}

export async function vendorResorts(req, res) {
  try {
    const id = req.vendorId;
    const resorts = await resortModel.find({ vendor: id });
    if (resorts) {
      res.json({ success: true, resorts });
      console.log(resorts);
    } else {
      res.json({ error: true });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function editProfile(req, res) {
  try {
    const { name, mobile } = req.body;
    let _id = req.vendorId;
    const edit = await vendorModel.findByIdAndUpdate(_id, {
      $set: { vendorName: name, mobile },
    });
    if (edit) {
      res.json({ success: true, message: "update successfully" });
    } else {
      res, json({ success: false, message: "failed" });
    }
  } catch (error) {
    console.log(error);
  }
}

export async function vendorBooking(req, res) {
  try {
    const page = parseInt(req.query.page) - 1 || 0
    const limit = parseInt(req.query.limit) || 5
    let sort = req.query.sort 
    let id = req.vendorId;
    const booking = await bookingModel
      .find({ vendor: id }).skip(page * limit).limit(limit)
      .populate("resort")
      .populate("user");
    console.log(booking, "hsfdfdhhh");
    const total = await bookingModel.countDocuments({vendor: id});
    const response = {
      success: true,
      total,
      page: page + 1,
      limit,
      booking ,
  };
    if (booking) {
      res.status(200).json(response)
    } else {
      res.json({ error: true });
    }
  } catch (error) {}
}

export async function editResort(req, res) {
  try {

      let images = []
      console.log(req.body)
      if (req.body.images.length > 0) {
        let files = req.body.images;
        for (let item of files) {
          const result = await cloudinary.uploader.upload(item, {
            folder: "Shaj Paradise",
          });
          images.push(result.secure_url);
        }
      }
    
    const {
      resortName,
      description,
      capacity,
      amount,
      amenities,
      locations,
      place,
      _id,
    } = req.body;

    await resortModel.findByIdAndUpdate(_id, {
      $set: {
        resortName,
        description,
        capacity,
        amount,
        amenities,
        locations,
        place,
      },
    });
    if (images.length > 0) {
      await resortModel.findByIdAndUpdate(_id, {
        $set: {
          images},
      });
    }
      res.json({ success: true, message: "update successfully" });
    
  } catch (error) {
    res.json({ success: false, message: "failed" });
    console.log(error);
  }
}
