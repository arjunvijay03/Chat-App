import React from 'react'
import Navbar from './SidebarComponents/Navbar'
import Search from './SidebarComponents/Search'
import Chats from './SidebarComponents/Chats'
import './Sidebar.css'
function sidebar() {
  return (
    <div className='sidebar'>
      <Navbar></Navbar>
      <Search></Search>
      <Chats></Chats>
    </div>
  )
}

export default sidebar
