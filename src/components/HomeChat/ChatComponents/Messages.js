import React, { useContext, useEffect, useState } from "react";
import { chatContext } from "../../../Contexts/ChatContext";
import Message from "./Message";
import { firebaseContext } from "../../../Contexts/Contexts";
function Messages() {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(chatContext);
  const { firebase } = useContext(firebaseContext);

  useEffect(() => {

    const unSub = () => {
      firebase.firestore().collection('chats').doc(data.chatId).onSnapshot((doc) =>{

        doc.exists && 

        setMessages(doc.data().messages)
       
    
      })
     
    };
    unSub()
      return () =>{
        unSub()
      }
  },[data.chatId]);



  return (
    <div className="messages">
      {
        messages.map(mes => <Message message={mes} key={mes.id}></Message>
        )
      }
     
    </div>
  );
}

export default Messages;
