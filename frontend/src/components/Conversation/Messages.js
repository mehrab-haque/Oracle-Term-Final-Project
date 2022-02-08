import React, {useEffect} from 'react'
import {useDispatch} from "react-redux"
import {showToast} from "../../App";
import {logout} from "../../action/auth"
import {checkAuth} from "../../action/auth"
import Inboxes from "./Inbox/Inboxes.js"
import "./messages.css"
import Message from "../Message/Message"
import Navbar from "../Navbar"
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
data.map(d=>{
return (

<Inboxes data={d}/>
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