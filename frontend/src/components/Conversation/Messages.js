import React, {useEffect, useState} from 'react'
import {useDispatch} from "react-redux"
import {showToast} from "../../App";
import {logout} from "../../action/auth"
import {checkAuth} from "../../action/auth"
import Inboxes from "./Inbox/Inboxes.js"
import "./messages.css"
import Message from "../Message/Message"
import Navbar from "../Navbar"
import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const Messages=props=>{

   const dispatch=useDispatch();

    const dispatcher=useDispatch();
    const data=[

    {
    name:"John Doe",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Hello.How are you?",
    time:"15:55",


    },

    {
    name:"Mehrab",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Demo message",
    time:"12:55",
    },
    {
    name:"Mehrab",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Demo message",
    time:"12:55",
    },
    {
    name:"Mehrab",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Demo message",
    time:"12:55",
    },
    {
    name:"Mehrab",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Demo message",
    time:"12:55",
    },
    {
    name:"Mehrab",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Demo message",
    time:"12:55",
    },
    {

    name:"Tamim",
    img:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png",
    latest_message:"Demo2.aeffsfndfnaedfk",
    time:"14:55",
    }

    ]

    const [chatHeads,setChatHeads]=useState([])

    useEffect(async()=>{
        var res=await axios.get('http://localhost:8080/api/v1.0.0/users/list',{headers:{authorization:'Bearer '+cookies.get('token')}})
        setChatHeads(res.data)
    },[])

    useEffect(()=>{
       checkAuth(dispatcher);
    },[])
 const signoutClick=()=>{

logout(dispatcher);


}

    return(
<>
<Navbar/>
        <div className="messenger">
      <div className="chatMenu">
<div className="self">
    <img
   className="conversationImg"
    src="https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"S
        
        alt=""
      />
<b style={{marginTop:"5px",fontSize:"23px"}}>Rabib Jahin</b>
</div>
 <div className="chatMenuWrapper">

<input placeholder="Search for friends" className="chatMenuInput"/>
<div style={{marginTop:"20px"}}>
<b style={{fontSize:"20px"}}>Chats</b>
</div>

     {
         chatHeads.map(c=>{
             return(
                 <Inboxes data={c}/>
             )
         })
     }

</div>
	</div>
        <div className="chatBox">
        <div className="chatBoxWrapper">
   <div className="chatBoxTop">
<Message own={false}/>
<Message own={true}/>
<Message own={true}/>
<Message own={false}/>
<Message own={false}/>
<Message own={true}/>
<Message own={true}/>
<Message own={false}/>
</div>
<div className="chatBoxBottom">
 <textarea
                    className="chatMessageInput"
                    placeholder="write something..."
                 
                 
                  ></textarea>
                  <button className="chatSubmitButton">
                    Send
                  </button>
</div>

     </div>

     </div>
      <div className="chatOnline">


     <div className="chatOnlineWrapper">
     Online
    </div>
    </div>
       
        </div>

</>
    )
}

export default Messages;