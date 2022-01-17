import axios from "axios";
import { useRef } from "react";
import "./register.css";
import LoadingButton from '@mui/lab/LoadingButton';
import {Link} from "react-router-dom"
import {useNavigate} from "react-router-dom"
import {register} from "../../action/auth"
import {useSelector,useDispatch} from 'react-redux'
import { CircularProgress } from '@mui/material';
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
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      const user = {
        name: username.current.value,
        login: login.current.value,
        pass: password.current.value,
      };
      try {
      //  await axios.post("http://localhost:8800/api/auth/register", user);
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
          <form className="loginBox" onSubmit={handleClick}>
            <input
              placeholder="Username"
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
</LoadingButton>: <button className="loginButton" type="submit">
             Sign Up
            </button>}
            <button className="loginRegisterButton">  <Link to="/login" style={{textDecoration:"none",color:"white"}}> Log into Account </Link></button>
          </form>
        </div>
      </div>
    </div>
  );
}
