import React, { useContext, useEffect, useState } from "react";
import { chatContext } from "../../../Contexts/ChatContext";
import { firebaseContext, authContext } from "../../../Contexts/Contexts";

function Chats() {
  const { firebase } = useContext(firebaseContext);
  const { currentUser } = useContext(authContext);
  const [chats, setChats] = useState([]);

  const { dispatch } = useContext(chatContext);
  useEffect(() => {
    const getChats = () => {
      const unSub = firebase
        .firestore()
        .collection("userChat")
        .doc(currentUser.uid)
        .onSnapshot((doc) => {
          setChats(doc.data());
        });

      return () => {
        unSub();
      };
    };

    currentUser.uid && getChats();
  }, [currentUser.uid]);

  const handleSelect = (user) => {
    dispatch({ type: "CHANGE_USER", payload: user });
  };
  return (
    <div className="chats">
      {chats && Object.entries(chats)
        ?.sort((a, b) => b[1].date - a[1].date)
        .map((chat) => {
          return (
            <div
              className="userChat"
              key={chat[0]}
              onClick={() => handleSelect(chat[1].userInfo)}
            >
              <img src={chat[1].userInfo?.photoURL} alt="" />
              <div className="userChatInfo">
                <span>{chat[1].userInfo?.displayName}</span>
                <p>
                  {chat[1].lastMessage?.text.substring(0, 10) +
                    `${chat[1].lastMessage?.text.length > 10 ? "....." : ""}`}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Chats;
