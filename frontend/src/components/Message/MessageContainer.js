import { useEffect, useState } from "react";
import Message from "./Message.js"
import "./message.css";

const  MessageContainer= (props)=>{

  // useEffect(() => {
  //
  //       console.log('data',props.data)
  //   }, [props.data])

  return (
    <div >
                                    <Message own={false}/>
                                    <Message own={true}/>
                                    <Message own={true}/>
                                    <Message own={false}/>
                                    <Message own={false}/>
                                    <Message own={true}/>
                                    <Message own={true}/>
                                    <Message own={false}/>
     </div>     
)
}
export default  MessageContainer;
