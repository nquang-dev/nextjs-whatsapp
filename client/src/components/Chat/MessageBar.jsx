import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import React, { useState } from "react";
import axios from "axios"; 
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";

function MessageBar() {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
    try {
      // Kiểm tra dữ liệu trước khi gửi
      if (!message.trim()) {
        console.log("Tin nhắn không được để trống");
        return;
      }

      if (!userInfo?.id || !currentChatUser?.id) {
        console.log("Thông tin người dùng không đầy đủ");
        console.log("userInfo:", userInfo);
        console.log("currentChatUser:", currentChatUser);
        return;
      }

      const messageData = {
        receiver: currentChatUser?.id, // Thay 'to' bằng 'receiver' nếu backend yêu cầu
        sender: userInfo?.id,          // Sử dụng 'sender' thay vì 'from' để khớp với backend
        message: message.trim(),
      };

      console.log("Đang gửi dữ liệu:", messageData);

      const { data, status } = await axios.post(ADD_MESSAGE_ROUTE, messageData);

      if (status === 201) {
        setMessage("");
        console.log("Tin nhắn đã được gửi thành công:", data);
        // Cập nhật trạng thái nếu cần thiết
        dispatch({ 
          type: "ADD_MESSAGE", 
          payload: data 
        });
      }
    } catch (err) {
      console.log("Lỗi khi gửi tin nhắn:", err);
    }
  };

  return (
    <div className="bg-panel-header-background h-20 px-4 flex items-center gap-6 relative">
      <>
        <div className="flex gap-6">
          <BsEmojiSmile
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Emoji"
          />
          <ImAttachment
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Attach"
          />
        </div>
        <div className="flex-grow">
          <input
            type="text"
            className="bg-input-background text-white w-full h-10 rounded-lg px-4"
            placeholder="Type a message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>
        <div className="flex gap-6">
          <FaMicrophone
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Microphone"
          />
          <MdSend
            className="text-panel-header-icon cursor-pointer text-xl"
            title="Send"
            onClick={sendMessage}
          />
        </div>
      </>
    </div>
  );
}

export default MessageBar;