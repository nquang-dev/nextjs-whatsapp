import { useStateProvider } from "@/context/StateContext";
import { ADD_MESSAGE_ROUTE } from "@/utils/ApiRoutes";
import React, { useState } from "react"; 
import { BsEmojiSmile } from "react-icons/bs";
import { FaMicrophone } from "react-icons/fa";
import { ImAttachment } from "react-icons/im";
import { MdSend } from "react-icons/md";
import axios from "axios";

function MessageBar() {
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [message, setMessage] = useState("");

  const sendMessage = async () => {
     try {
      const { data } = await axios.post(ADD_MESSAGE_ROUTE, {
        to: currentChatUser?.id,
        from: userInfo?.id,
        message,
      });
       setMessage("");
     } catch (error) {
      console.log(error);
      
      
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