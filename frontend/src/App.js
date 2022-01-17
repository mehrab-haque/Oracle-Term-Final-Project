import React, {useState} from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from "react-loader-spinner";
import Auth from "./components/Auth";
import Register from "./components/Register/register";
import Login from "./components/Login/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
} from "react-router-dom";

import {Dialog, DialogContent} from "@mui/material";


var showToast
var setLoading

function App() {

    const [loading,setL]=useState(false)
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
                    <Loader
                        type="Oval"
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
       
         </Routes>
       </Router>
          
        </div>
    );
}

export default App;
export {showToast,setLoading}