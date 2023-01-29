import React from "react";

import Chatinfo from "./ChatComponents/Chatinfo";
import ChatInput from "./ChatComponents/ChatInput";
import Messages from "./ChatComponents/Messages";
import "./HomeChat.css";
function HomeChat() {
  
  return (
    <div className="chatContainer">
      <Chatinfo></Chatinfo>
      <Messages></Messages>
      <ChatInput></ChatInput>
    </div>
  );
}

export default HomeChat;
