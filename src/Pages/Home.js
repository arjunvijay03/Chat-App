import React from 'react'
import './Page.css'
import Sidebar from '../components/HomeSideBar/sidebar'
import Chat from '../components/HomeChat/HomeChat'
function Home() {
  return (
    <div className='home'>
      <div className="homecontainer">
        <Sidebar></Sidebar>
        <Chat></Chat>
      </div>
    </div>
  )
}

export default Home
