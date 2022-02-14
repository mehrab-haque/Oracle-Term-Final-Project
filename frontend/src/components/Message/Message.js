import "./message.css";
import {useState} from "react";
//import { format } from "timeago.js";

export default function Message(props) {



  return (
    <div className={props.data.own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"
          alt=""
        />
        <p className="messageText">{props.data.msg}</p>


      </div>
<p className={props.data.own?"seen own":"seen"}> Seen </p>
      <div className="messageBottom">{props.data.timestamp}</div>
    </div>
  );
}
