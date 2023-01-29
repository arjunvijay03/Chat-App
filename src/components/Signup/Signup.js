import React, { useContext, useState } from "react";
import "./Signup.css";
import Add from "../../image/addAvatar.png";
import { firebaseContext } from "../../Contexts/Contexts";
import { Link, useNavigate } from "react-router-dom";
function Signup() {
  const [image, setImage] = useState(null);
  const { firebase } = useContext(firebaseContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const displayName = event.target[0].value;
    const email = event.target[1].value;
    const password = event.target[2].value;
    const file = event.target[3].files[0];
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((result) => {
        firebase
          .storage()
          .ref(`/image/${email}`)
          .put(file)
          .then((res) => {
            res.ref.getDownloadURL().then((url) => {
              result.user.updateProfile({
                displayName: displayName,
                photoURL: url,
              });
              firebase
                .firestore()
                .collection("users")
                .doc(result.user.uid)
                .set({
                  uid: result.user.uid,
                  userName: displayName,
                  profilePic: url,
                  email,
                })
                .then(() => {
                  firebase
                    .firestore()
                    .collection("userChat")
                    .doc(result.user.uid)
                    .set({
                      //chat here.............
                    });
                });
            });
          });
        navigate("/");
       
      })
      .catch((error) => {
        alert(error);
      });
  };

  return (
    <div className="signupContainer">
      <div className="signupWrapper">
        <span className="logo">Chat</span>
        <span className="title">Signup</span>
        <form onSubmit={handleSubmit} action="">
          <input type="text" placeholder="display name" />
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />
          <input
            onChange={(event) => {
              let file = event.target.files[0];
              let reader = new FileReader();
              reader.onload = function () {
                setImage(reader.result);
              };
              reader.readAsDataURL(file);
            }}
            style={{ display: "none" }}
            type="file"
            id="profilePic"
          />
          <label htmlFor="profilePic">
            <img src={image ? image : Add} alt="" />
            <span>Add Avatar</span>
          </label>
          <button className="signupBtn">Sign up</button>
        </form>
        <p>
          already have an account? <Link to="/login"> Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
