import {useEffect, createContext,useState } from 'react'
import firebase from '../Config/Firebase';
export const firebaseContext = createContext(null);
export const authContext = createContext()

export const AuthContextProvider =   ({children})=>{
    const [currentUser, setCurrentUser] = useState()
    useEffect(()=>{
      const unSub =  firebase.auth().onAuthStateChanged((user) => {
            setCurrentUser(user);
           
        })
        return()=>{
            unSub();
        }
    },[])
    return(
        <authContext.Provider value={{currentUser,setCurrentUser}}>
            {children}
        </authContext.Provider>
    )
}