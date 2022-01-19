import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {showToast} from "../../App";
import {logout} from "../../action/auth"
import {checkAuth} from "../../action/auth"

const Messages=props=>{

   const dispatch=useDispatch();

const dispatcher=useDispatch();

    useEffect(()=>{
       checkAuth(dispatcher);
    },[])
 const signoutClick=()=>{

logout(dispatcher);


}

    return(
        <div>
           <button onClick={signoutClick}>Sign Out</button>
        </div>
    )
}

export default Messages;