import axios from "axios";
import { useRef } from "react";
import "./register.css";
import LoadingButton from '@mui/lab/LoadingButton';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {register} from "../../action/auth"
import {useSelector,useDispatch} from 'react-redux'
import { CircularProgress } from '@mui/material';
import {showToast} from "../../App"
export default function Register() {
  const username = useRef();
  const login = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const dispatcher=useDispatch();
const navigate=useNavigate();
const loadingState=useSelector(state=>state.auth)
  const handleClick = async (e) => {
    e.preventDefault();
  console.log(passwordAgain.current.value);
 console.log(password.current.value)
if(username.current.value==='' || login.current.value===''|| password.current.value===''){
      showToast("Can't keep any field empty");
}
   else if (passwordAgain.current.value !== password.current.value) {
      showToast("Passwords don't match!");
    } 
else if(passwordAgain.current.value.length <6){
showToast("Passwords should be of at least  characters!");
}
else {
         passwordAgain.current.setCustomValidity("");
      const user = {
        name: username.current.value,
        login: login.current.value,
        pass: password.current.value,
      };
      try {
      
      register(user,dispatcher);

      
      } catch (err) {
        console.log(err);
      }
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
          <form className="loginBox" onSubmit={handleClick} >
            <input
              placeholder="Name"
              required
              ref={username}
              className="loginInput"
            />
            <input
              placeholder="Login"
              required
              ref={login}
              className="loginInput"
              type="text"
            />
            <input
              placeholder="Password"
              required
              ref={password}
              className="loginInput"
              type="password"
              minLength="6"
            />
            <input
              placeholder="Password Again"
              required
              ref={passwordAgain}
              className="loginInput"
              type="password"
            />
           {loadingState===0?<LoadingButton loading variant="outlined">
  Submit
</LoadingButton>: <button className="loginButton" onClick={handleClick} >
             Sign Up
            </button>}
            <button className="loginRegisterButton">  <Link to="/login" style={{textDecoration:"none",color:"white"}}> Log into Account </Link></button>
          </form>
        </div>
      </div>
    </div>
  );
}
