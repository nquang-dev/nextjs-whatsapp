import React, { useEffect } from "react";
import ChatList from "./Chatlist/ChatList";
import Empty from "./Empty";
import { onAuthStateChanged } from "firebase/auth";
import { firebaseAuth } from "@/utils/FirebaseConfig";
import axios from "axios";
import { CHECK_USER_ROUTE } from "@/utils/ApiRoutes";
import { useState } from "react";
import { useRouter } from "next/router";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import Chat from "./Chat/Chat";

function Main() {

  const router = useRouter();
  const [{ userInfo, currentChatUser }, dispatch] = useStateProvider();
  const [redirectLogin, setRedirectLogin] = useState(false);
  
  useEffect(() => {
    if (redirectLogin) router.push("/login");
  }, [redirectLogin]);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, async (currentUser) => {
      if (!currentUser) {
        setRedirectLogin(true);
        return;
      }

      if (!userInfo && currentUser?.email) {
        const { data } = await axios.post(CHECK_USER_ROUTE, { email: currentUser.email });
        if (!data.status) {
          router.push("/login");
        }
        console.log({ data });

        if (data?.data) {
          const { id, name, email, profilePicture: profileImage } = data.data;
          dispatch({
            type: reducerCases.SET_USER_INFO,
            userInfo: {
              id,
              name,
              email,
              profileImage,
              status: "",
            },
          });
          console.log("User ID from userInfo:", id); // Log để kiểm tra id
        }
      }
    });
  }, [userInfo]);
  return (
    <>
      <div className="grid grid-cols-main h-screen max-h-screen max-w-full over">
        <ChatList />
          {
            currentChatUser ? <Chat /> : <Empty />
          }
      </div>
    </>
  );
}

export default Main;
