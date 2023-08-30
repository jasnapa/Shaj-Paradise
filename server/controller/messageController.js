import MessageModel from "../models/messageModel";



export async function addMessage(req,res) {
    try {
        const {chatId,senderId,text} = req.body
        const message = await MessageModel.create({
            chatId,
            senderId,
            text
        })
        res.json({status:true,message})
    } catch (error) {
        res.json({status:false})
        console.log(error);
   }
    
}
   


export async function getMessages(req,res) {
    try {
      const { chatId } = req.params;
      const messages = await MessageModel.find({ chatId });
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json(error);
      console.log(error);
    }
  };