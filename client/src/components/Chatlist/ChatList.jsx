import React, { useEffect } from "react";
import Chat from "../Chat/Chat";
import ChatListHeader from "./ChatListHeader";
import SearchBar from "./SearchBar";
import List from "./List"; 
import { useStateProvider } from "@/context/StateContext";
import { useState } from "react";
import ContactsList from "./ContactsList";

function ChatList() {

  const [{contactsPage}] = useStateProvider();
  const [pageType, setPageType] = useState("default");

  useEffect(() => {
    if (contactsPage) {
      setPageType("all-contacts");
    } else {
      setPageType("default");
    }
  }, [contactsPage]);

  return (
    <div className="bg-panel-header-background flex flex-col max-h-screen z-20">
      {pageType === "default" && (
        <>
      <ChatListHeader />
      <SearchBar />
      <List />
      </>
    )}
    {
      pageType === "all-contacts" && <ContactsList />
    }
    </div>
  );
}

export default ChatList;
