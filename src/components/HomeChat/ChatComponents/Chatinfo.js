import React from 'react'
import cam from '../../../image/cam.png'
import add from '../../../image/add.png'
import more from '../../../image/more.png'
import "./ChatComponents.css"
import { chatContext } from '../../../Contexts/ChatContext'
import { useContext } from 'react'
function Chatinfo() {
  const {data} = useContext(chatContext)
  return (
    <div className='chatInfo'>
      <span className='userName'>{data.user?.displayName || data.user?.userName}</span>
      <div className="chatIcons">
        <img src={cam} alt="" />
        <img src={add} alt="" />
        <img src={more} alt="" />
      </div>
    </div>
  )
}

export default Chatinfo
