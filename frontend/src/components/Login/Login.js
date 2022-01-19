import { useRef,useEffect } from "react";
import "./login.css";
import {Link} from "react-router-dom"
import {showToast} from "../../App"
import {login} from "../../action/auth"
import {useDispatch,useSelector} from "react-redux"
import {useNavigate} from "react-router-dom"
export default function Login() {
const loginVal = useRef();
const password = useRef();
const navigate=useNavigate()
const dispatcher=useDispatch();
const authState=useSelector(state=>state.auth)
useEffect(()=>{

if(authState===1){

navigate('/messages');
}

},[authState])

  

  const handleClick = (e) => {
   const loginValue=loginVal.current.value;
  const passVal=password.current.value;
const data={
login:loginValue,
pass:passVal
};
 if(loginValue===''||passVal===''){
 showToast("Can't keep any field empty");

}
else{

login(data,dispatcher);

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
              ref={loginVal}
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
