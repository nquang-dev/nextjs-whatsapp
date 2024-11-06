import React, { useEffect } from "react";
import axios from "axios";
import { GET_ALL_CONTACTS } from "@/utils/ApiRoutes";
import { useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { useStateProvider } from "@/context/StateContext";
import { reducerCases } from "@/context/constants";
import { BiSearchAlt2 } from "react-icons/bi";
import ChatLIstItem from "./ChatLIstItem";

function ContactsList() {
  const [allContacts, setAllContacts] = useState([]);
  const [{}, dispatch] = useStateProvider();
  useEffect(() => {
    const getCOntacts = async () => {
      try {
        const {
          data: { users },
        } = await axios.get(GET_ALL_CONTACTS);
        setAllContacts(users);
      } catch (err) {
        console.log(err);
      }
    };
    getCOntacts();
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="h-24 flex items-end px-3 py-4">
        <div className="flex items-center gap-12 text-white">
          <BiArrowBack
            className="text-xl cursor-pointer text-panel-header-icon"
            onClick={() =>
              dispatch({ type: reducerCases.SET_ALL_CONTACTS_PAGE })
            }
          />
          <span>New Chat</span>
        </div>
      </div>
      <div className="bg-search-input-container-background h-full flex-auto overflow-auto custom-scroll-bar">
        <div className="flex py-3 items-center gap-3 h-14">
          <div className="bg-panel-header-background flex items-center gap-5 px-3 py-1 rounded-lg flex-grow mx-4">
            <div>
              <BiSearchAlt2 className="text-panel-header-icon cursor-pointer text-l" />
            </div>
            <div>
              <input
                type="text"
                placeholder="Search Contacts"
                className="bg-transparent text-sm focus:outline-none text-white w-full"
              />
            </div>
          </div>
        </div>

        {Object.entries(allContacts).map(([initialLetter, userList]) => {
          return (
            <div key={Date.now() + initialLetter}>
              <div className="text-teal-light pl-10 py-5 ">
                {initialLetter}{" "}
              </div>
              {
                // userList.map((user) => {
                //   return (
                //     <div key={user.id} className="flex items-center gap-6 px-4 py-3 hover:bg-panel-header-background cursor-pointer">
                //       <div>
                //         <img
                //           src={user.profilePicture}
                //           alt="profile"
                //           className="w-10 h-10 rounded-full"
                //         />
                //       </div>
                //       <div>
                //         <span className="text-white">{user.name}</span>
                //       </div>
                //     </div>
                //   );
                // })
                userList.map( contact => {
                  return (
                    <ChatLIstItem
                      data={contact}
                      isContactPage={true}
                      key={contact.id}
                    />
                  );
                })
              }
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ContactsList;
