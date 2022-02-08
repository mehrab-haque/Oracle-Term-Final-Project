import { useEffect, useState } from "react";
import "./inboxes.css";

export default function Inboxes(props) {



  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={props.data.image}
        
        alt=""
      />
<div>     
<span className="conversationName">{props.data.name}</span>
    {
        props.data.message.seen?(
            <p className="latestMessage">{props.data.message.text} <span className="time">{new Date(props.data.message.timestamp).toLocaleString()}</span> </p>
        ):(
            <p className="latestMessage"><b>{props.data.message.text}</b> <span className="time">{new Date(props.data.message.timestamp).toLocaleString()}</span> </p>
        )
    }
</div>
    </div>
  );
}
