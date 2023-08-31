import ChatModel from "../models/chatModel.js";




export async function createChat(req,res) {
    try {
        const newChat = new ChatModel({
            members: [req.body.senderId, req.body.receiverId],
          });
            const result = await newChat.save();
            res.status(200).json(result);          
        } catch (error) {
        res.status(500).json(error);
        console.log(error);
    }   
};


export async function chats(req,res) {
    try {
      console.log('dsfsdfd')
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