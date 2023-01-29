import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { firebaseContext } from "../../Contexts/Contexts";
function Login() {
  const { firebase } = useContext(firebaseContext);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    event.preventDefault();
    const email = event.target[0].value;
    const password = event.target[1].value;
    firebase.auth().signInWithEmailAndPassword(email, password);
  
    navigate("/");
  };

  return (
    <div className="signupContainer">
      <div className="signupWrapper">
        <span className="logo">Chat</span>
        <span className="title">Signup</span>
        <form onSubmit={handleSubmit} action="">
          <input type="email" placeholder="email" />
          <input type="password" placeholder="password" />

          <button className="signupBtn">Log in</button>
        </form>
        <p style={{ whiteSpace: "nowrap" }}>
          You don't have an account? <Link to="/signup"> Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
