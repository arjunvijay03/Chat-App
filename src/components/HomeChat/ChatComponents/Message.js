import React, { useContext, useEffect, useRef } from 'react'
import { chatContext } from '../../../Contexts/ChatContext';
import { authContext } from '../../../Contexts/Contexts';

function Message({message}) {
  const {currentUser} = useContext(authContext)
  const {data} = useContext(chatContext)
  const ref = useRef()

  useEffect(() =>{
    
    ref.current?.scrollIntoView({behavior:'smooth'})
  }, [message])
  return (
    <div ref={ref} className={`message ${message.senderId === currentUser.uid && 'sender'}`} >
        <div className="messageInfo">
            <img src={message.senderId === currentUser.uid ? currentUser.photoURL:data.user.photoURL} alt="" />
            <span>just now</span>  
        </div>
        <div className="messageContent">
            <p>{message.text}</p>
         { message.image &&  <img src={message.image} alt="" />}
        </div>

    </div>
  )
}

export default Message
