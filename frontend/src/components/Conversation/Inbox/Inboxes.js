import { useEffect, useState } from "react";
import "./inboxes.css";

export default function Inboxes(props) {



  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={props.data.img}
        
        alt=""
      />
<div>     
<span className="conversationName">{props.data.name}</span>
        <p className="latestMessage">{props.data.latest_message} <span className="time">{props.data.time}</span> </p>
</div>
    </div>
  );
}
