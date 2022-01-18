import { useRef } from "react";
import "./login.css";
import {Link} from "react-router-dom"
import {showToast} from "../../App"

export default function Login() {
  const login = useRef();
  const password = useRef();
  

  const handleClick = (e) => {
   const loginVal=login.current.value;
  const passVal=password.current.value;
 if(loginVal===''||passVal===''){
 showToast("Can't keep any field empty");

}
    
   
  };

  return (
    <div className="login">
      <div className="loginWrapper">
        <div className="loginLeft">
          <h3 className="loginLogo">MessengOr</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on MessengOr.
          </span>
        </div>
        <div className="loginRight">
          <form className="loginBox">
            <input
              placeholder="Login"
              type="text"
              required
              className="loginInput"
              ref={login}
            />
            <input
              placeholder="Password"
              type="password"
              required
              minLength="6"
              className="loginInput"
              ref={password}
            />
            <button className="loginButton" type="button" onClick={handleClick} >
              
                Log In
              
            </button>
            <span className="loginForgot">Forgot Password?</span>
            <button className="loginRegisterButton">
             <Link to="/register" style={{textDecoration:"none",color:"white"}}> Create a New Account </Link>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
