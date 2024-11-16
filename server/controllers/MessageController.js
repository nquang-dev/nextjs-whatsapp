import getPrismaInstance from "../utils/PrismaClient.js";


export const addMessage = async (req, res, next) => {
    try{
        const prisma = getPrismaInstance();
        const {message, from, to} = req.body;
        console.log("Payload nhận được:", req.body);
        const getUser = onlineUsers.get(to);
        if (message && from && to) {
            const newMessage = await prisma.message.create({
                data: {
                  message,
                  sender: { connect: { id: parseInt(from) } },
                  receiver: { connect: { id: parseInt(to) } },
                  messageStatus: getUser ? "delivered" : "sent",
                },
                include: { sender: true, receiver: true },
              });
            return res.status(201).send({message: newMessage});
        }
        return res.status(400).send({message: "From, to and Message is required"});
    
    } catch (err){
        console.error("Lỗi khi thêm tin nhắn:", err);
        next(err);
    }
};