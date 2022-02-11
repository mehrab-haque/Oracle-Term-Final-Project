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
import LinearProgress from '@mui/material/LinearProgress';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import { makeStyles } from "@mui/styles"
import DialogContent from "@mui/material/DialogContent";
import Button from '@mui/material/Button';


const cookies = new Cookies();


const useStyles = makeStyles({


    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    }
   
   

})


const Messages=props=>{

   const dispatch=useDispatch();

    const dispatcher=useDispatch();
    const classes = useStyles()
    const [chatHeads,setChatHeads]=useState([])
    const [open, setOpen] = useState(false);
    
    const [profileData,setProfileData]=useState({})

    useEffect(async()=>{
    axios.get('http://localhost:8080/api/v1.0.0/users/list',{headers:{authorization:'Bearer '+cookies.get('token')}})
   .then(res=>{

setChatHeads(res.data)
axios.get('http://localhost:8080/api/v1.0.0/user/profile',{headers:{authorization:'Bearer '+cookies.get('token')}})
.then(res=>{console.log(res.data);setProfileData(res.data)})
 .catch(e=>console.log(e))
})

.catch(e=>console.log(e))
   
    },[])



    useEffect(()=>{
       checkAuth(dispatcher);
console.log(profileData)
    },[])
const handleClick=()=>{
  setOpen(true);
}

  const handleClose = () => {
  setOpen(false);
  };

    return(
<>
<Navbar/>

 <Dialog onClose={handleClose} open={open}>
 <DialogTitle>Edit Profile</DialogTitle>

   <DialogContent className={classes.root}>
  <TextField
          id="outlined-name-input"
          label="Name"
	  defaultValue={profileData.name?profileData.name:''}
          type="text"
          
          style={{marginTop:'20px'}}
            autoFocus
            margin="dense"
          
        />

 <TextField
          id="outlined-password-input"
          label="Status"
	  defaultValue={profileData.status?profileData.status:''}
          type="text"
     
          style={{marginTop:'20px'}}
            autoFocus
            margin="dense"
          
        
        />
  <input
    style={{ display: "none" }}
    id="contained-button-file"
    type="file"
  />
  <label htmlFor="contained-button-file">
    <Button variant="contained" color="primary" component="span" style={{marginTop:"20px"}}>
      Upload Image
    </Button>
  </label>
   <Button variant="contained" color="primary" component="span" style={{marginTop:"20px"}}>
      Update
    </Button>    

</DialogContent>
</Dialog>


{profileData.name===undefined?<LinearProgress/>

:(
        <div className="messenger">
      <div className="chatMenu">
<div className="self">
    <img
   className="conversationImg"
    src="https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"S
        
        alt=""
      />
<b style={{marginTop:"5px",fontSize:"23px"}} onClick={handleClick}>{profileData.name}</b>
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
       
        </div>)

}

</>
    )
}

export default Messages;