import React, { useState, useContext } from "react";
import { firebaseContext } from "../../../Contexts/Contexts";
import { authContext } from "../../../Contexts/Contexts";

import { serverTimestamp } from "firebase/firestore";
import { chatContext } from "../../../Contexts/ChatContext";
function Search() {
  const { firebase } = useContext(firebaseContext);
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState();
  const [error, setError] = useState(false);
  const { currentUser } = useContext(authContext);
  const { dispatch } = useContext(chatContext);
  const handleSearch = (event) => {
    event.preventDefault();
    setError(false);
   
    firebase
      .firestore()
      .collection("users")
      .where("userName", "==", userName)
      .get()
      .then((res) => {
        let documents = res.docs.map(doc => doc.data());
       
        setUser(documents)
      
      })
      .catch((err) => {
        
        setError(true);
      });
  };


  const handleSelection = (data) => {
  
    const combainedId =
      currentUser.uid > data.uid
        ? currentUser.uid + data.uid
        : data.uid + currentUser.uid;

    firebase
      .firestore()
      .collection("chats")
      .doc(combainedId)
      .get()
      .then((res) => {
        if (!res.exists);
        {
          firebase.firestore().collection("chats").doc(combainedId).set({
            messages: [],
          });

          firebase
            .firestore()
            .collection("userChat")
            .doc(currentUser.uid)
            .update({
              [combainedId + ".userInfo"]: {
                uid: data.uid,
                displayName: data.userName,
                photoURL: data.profilePic,
              },
              [combainedId + ".date"]: serverTimestamp(),
            });

          firebase
            .firestore()
            .collection("userChat")
            .doc(data.uid)
            .update({
              [combainedId + ".userInfo"]: {
                uid: currentUser.uid,
                displayName: currentUser.displayName,
                photoURL: currentUser.photoURL,
              },
              [combainedId + ".date"]: serverTimestamp(),
            });
        }
      });

    dispatch({ type: "CHANGE_USER", payload: data });
    setUser([]);
    setUserName("");
  };
  return (
    <div className="search">
      <form className="searchForm" onSubmit={handleSearch}>
        <input
          type="text"
          id="searchName"
          name="searchName"
          onChange={(event) => {
            setUser([]);
            setUserName(event.target.value);
          }}
          value={userName}
          placeholder="Find a user"
        />
      </form>
      {error && (
        <span style={{ color: "white", fontWeight: "600" }}>
          User Not Found😢
        </span>
      )}
      { 
        user?.map((data, index) =>{
          
      return ( <div className="userChat" key={index} onClick={()=>{
       
        handleSelection(data)}}>
          <img src={data.profilePic} alt="" />
          <div className="userChatInfo">
            <span>{data.userName}</span>
          </div>
        </div>)
        })
      }
    </div>
  );
}

export default Search;
