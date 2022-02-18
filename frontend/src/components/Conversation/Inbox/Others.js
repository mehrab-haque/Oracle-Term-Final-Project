import { useEffect, useState } from "react";
import "./inboxes.css";
import Button from '@mui/material/Button';
import axios from "axios";
import {setLoading, showToast} from "../../../App";
import Cookies from 'universal-cookie';


const cookies = new Cookies();
export default function Others(props) {

const addClick=(id)=>{
setLoading(true)
                var newData={
                                groupId: props.groupData.id,
                                userId:id
                            }
axios.post('http://localhost:8080/api/v1.0.0/group/add', newData,{headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res =>{
setLoading(false)
   showToast("User successfully added");

                
            })

            .catch(e => {console.log(e)
setLoading(false)
   showToast("Error occured");
})

}


  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={props.data.image}
        
        alt=""
      />
<div>     
<span className="conversationName">{props.data.name}</span>
 <Button variant="contained" style={{marginLeft:"20px"}} onClick={()=>addClick(props.data.id)}>Add</Button>
</div>
    </div>
  );
}
