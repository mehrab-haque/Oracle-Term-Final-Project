import "./message.css";
import {useState} from "react";
//import { format } from "timeago.js";

export default function Message({own}) {

  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          className="messageImg"
          src="https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"
          alt=""
        />
        <p className="messageText">Hi, this is a message.</p>


      </div>
<p className={own?"seen own":"seen"}> Seen </p>
      <div className="messageBottom">1 hour ago</div>
    </div>
  );
}
