import React, { useContext } from 'react'
import './App.css';
import SignupPage from './Pages/SignupPage'
import LoginPage from './Pages/LoginPage';
import Home from './Pages/Home';
import {authContext} from './Contexts/Contexts'
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom'
function App() {

  
const {currentUser} = useContext(authContext)
  // console.log(currentUser);
  // if(currentUser){

  //   const ProtectedRoute = ({children})=>{
  //     console.log(currentUser);
  //     if(!currentUser){
  //       return <Navigate to='/login' />
  //     }
  //     return children
  //   }
  // }
  


  return (
    <div className="App">

      <Router>
        <Routes>
          <Route exact path='/' element={
            currentUser ? <Home /> : <LoginPage />
          // <ProtectedRoute>
          //   <Home />
          // </ProtectedRoute>
        }/>
          <Route  path='/login' element={<LoginPage />}/>
          <Route  path='/signup' element={<SignupPage />}/>
         
        </Routes>

      </Router>
    </div>
  );
}

export default App;
