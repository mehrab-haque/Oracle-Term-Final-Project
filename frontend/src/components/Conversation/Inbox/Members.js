import { useEffect, useState } from "react";
import "./inboxes.css";
import Button from '@mui/material/Button';
import axios from "axios";
import {setLoading, showToast} from "../../../App";
import Cookies from 'universal-cookie';

const cookies=new Cookies();

export default function Inboxes(props) {


const removeClick=(id)=>{
	setLoading(true);
            var newData={
                                groupId: props.groupData.id,
                                userId:id
                            }
axios.post('http://localhost:8080/api/v1.0.0/group/remove', newData,{headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res =>{
console.log(res.data)
setLoading(false)
   showToast("User successfully removed");

                
            })

          .catch(e => {console.log(e)
setLoading(false)
   showToast("You cannot remove members");
})

}
  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={props.data.IMAGE}
        
        alt=""
      />
<div>     
<span className="conversationName">{props.data.NAME}</span>
   <Button variant="outlined" style={{marginLeft:"10px"}} onClick={()=>removeClick(props.data.ID)}>Remove</Button>
</div>
    </div>
  );
}
