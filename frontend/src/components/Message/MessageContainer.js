import { useEffect, useState } from "react";
import Message from "./Message.js"
import "./message.css";

const  MessageContainer= (props)=>{

    var [messages,setMessage]=useState(props.data)

  useEffect(() => {
  
        setMessage(props.data)
     }, [props.data])

  return (
    <div >

{

messages && messages.map(d=>{

return (

  <Message data={d} />
)


})
}

                                  
                                  
     </div>     
)
}
export default  MessageContainer;
