import{ createContext, useContext, useReducer } from 'react'

import { authContext } from './Contexts';

export const chatContext = createContext(null)


export const ChatContextProvider =   ({children})=>{
    const {currentUser} = useContext(authContext)


    const INITIAL_VALUE = {
    chatId:'null',
    user:{}
   }
   const chatReducer = (state, action) =>{
    switch (action.type) {
        case 'CHANGE_USER':
            return{
                user:action.payload,
                chatId:
                currentUser.uid > action.payload.uid 
                ? currentUser.uid + action.payload.uid
                : action.payload.uid + currentUser.uid
            }

            default:
                return state
    }
   }
   const [state, dispatch] = useReducer(chatReducer, INITIAL_VALUE)
    return(
        <chatContext.Provider value={{data: state, dispatch}}>
            {children}
        </chatContext.Provider>
    )
}