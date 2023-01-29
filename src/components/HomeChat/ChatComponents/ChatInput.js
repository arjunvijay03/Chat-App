import React, { useContext, useState } from "react";
import Img from "../../../image/img.png";
import Attach from "../../../image/attach.png";
import { chatContext } from "../../../Contexts/ChatContext";
import { authContext } from "../../../Contexts/Contexts";

import {serverTimestamp } from 'firebase/firestore'
import firebase from 'firebase/compat/app';
import { v4 as uuid } from "uuid";
function ChatInput() {
  const [text, setText] = useState("");
  const [image, setImage] = useState(null);
  const { currentUser } = useContext(authContext);
  const { data } = useContext(chatContext);
  
  const handleSend = () => {
    
    if (image) {
      firebase
        .storage()
        .ref(`/image/${uuid()}`)
        .put(image)
        .then((res) => {
          res.ref.getDownloadURL().then((url) => {
           

            firebase
              .firestore()
              .collection("chats")
              .doc(data.chatId)
              .update({
                messages: firebase.firestore.FieldValue.arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Date(),
                  image: url,
                }),
              });
          });
        });
    } else if(text) {
      firebase
        .firestore()
        .collection("chats")
        .doc(data.chatId)
        .update({
          messages: firebase.firestore.FieldValue.arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Date(),
          })
        });
    }
   if (text){
    firebase.firestore().collection('userChat').doc(currentUser.uid).update({
      [data.chatId+".lastMessage"] :{
        text
      },
      [data.chatId+'.date'] : serverTimestamp()
    })
    firebase.firestore().collection('userChat').doc(data.user.uid).update({
      [data.chatId+".lastMessage"] :{
        text
      },
      [data.chatId+'.date'] : serverTimestamp()
    })}
    setText("");
    setImage(null)
  };
  return (
    <div className="chatInput">
      <input
        type="text"
        value={text}
        placeholder="Type Something..."
        onChange={(event) => setText(event.target.value)}
      />
      <div className="send">
        <img src={Attach} alt="" />
        <input
          type="file"
          style={{ display: "none" }}
          id="imgFile"
          onChange={(event) => setImage(event.target.files[0])}
        />
        <label htmlFor="imgFile">
          <img className="imageInput" src={Img} alt="" />
        </label>
        <button onClick={()=>data.chatId=='null'? null: handleSend()}>Send</button>
      </div>
    </div>
  );
}

export default ChatInput;
