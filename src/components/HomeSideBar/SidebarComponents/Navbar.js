import React, { useContext } from 'react'
import './sidebarcomponents.css'
import {authContext, firebaseContext} from '../../../Contexts/Contexts'

function Navbar() {
  const {currentUser} = useContext(authContext)
  const {firebase} = useContext(firebaseContext)

  return ( currentUser.displayName &&
    <div className='navbar' >
      <span className='logo'>Chat</span>
      <div className='user'>
        <img src={currentUser?.photoURL} alt="" />
        <span>{currentUser?.displayName}</span>
        <button onClick={()=>{
          firebase.auth().signOut();
        }}>log out</button>
      </div>

    </div>
  )
}

export default Navbar
