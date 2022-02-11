import React, {useState,useEffect} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Audio} from "react-loader-spinner";
import Auth from "./components/Auth";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";
import Message from "./components/Conversation/Messages";
import {useNavigate} from "react-router-dom"
import {useSelector,useDispatch} from "react-redux"
import {checkAuth} from "./action/auth"
import Cookies from 'universal-cookie';
import './config/firebase_config'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,

} from "react-router-dom";

import {Dialog, DialogContent} from "@mui/material";


var showToast
var setLoading

function App() {

    const [loading,setL]=useState(false)
    const state=useSelector(state=>state.auth);
    const dispatcher=useDispatch();
const cookies=new Cookies();
  useEffect(()=>{
       checkAuth(dispatcher);
    },[state])
  
    setLoading=setL
    showToast=message=>{
        toast.dark(message, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    }

    return (
        <div>
            <Dialog open={loading}>
                <DialogContent>
                    <Audio
                        color="#00BFFF"
                        height={100}
                        width={100}
                    />
                </DialogContent>
            </Dialog>
            <ToastContainer
                position="bottom-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
      <Router>

       <Routes>
        <Route exact path="/" element={ <Auth/> } />
          
        
         <Route path="/register" element={<Register/>} />
     
        <Route path="/login" element={<Login/>} />
 
<Route path="/messages" element={cookies.get('token')!==undefined && cookies.get('token')!==null? <Message />:<Navigate to="/register" />  }>
    
        </Route>
         

       
         </Routes>
       </Router>
          
        </div>
    );
}

export default App;
export {showToast,setLoading}
