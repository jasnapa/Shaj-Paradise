import ChatModel from "../models/chatModel.js";
import UserModel from "../models/userModel.js";
import vendorModel from "../models/vendorModel.js";




export async function createChat(req, res) {
  try {
    const existingChat = await ChatModel.findOne({
      members: {
        $all: [req.body.vendorId, req.body.userId],
      },
    });

    if (existingChat) {
      res.status(200).json({ status: true, result: existingChat });
    } else {
      const newChat = new ChatModel({
        members: [req.body.vendorId, req.body.userId],
      });
      const savedChat = await newChat.save();
      res.status(200).json({ status: true, result: savedChat });
    }
  } catch (error) {
    res.status(500).json(error);
    console.log(error);
  }
}


export async function getVendor(req, res) {
  try {
    let {Id} = req.params
    const vendor = await vendorModel.findById(Id);
    res.json({ success: true, vendor });
  } catch (error) {
    console.log(error);
  }
}

export async function getUser(req, res) {
  try {
    let {Id} = req.params
    const user = await UserModel.findById(Id);
    res.json({ success: true, user });
  } catch (error) {
    console.log(error);
  }
}


export async function chats(req,res) {
    try {
      
      const chat = await ChatModel.find({
        members: { $in: [req.params.Id] },
      });
      res.status(200).json(chat);
    } catch (error) {
      res.status(500).json(error);
    }
  };
  
export async function findChats(req,res) {
    try {
      const chat = await ChatModel.findOne({
        members: { $all: [req.params.firstId, req.params.secondId] },
      });
      res.status(200).json(chat)
    } catch (error) {
      res.status(500).json(error)
    }
  };