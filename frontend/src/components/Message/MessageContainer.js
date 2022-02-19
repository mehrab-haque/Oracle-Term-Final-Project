import {useEffect, useRef, useState} from "react";
import Message from "./Message.js"
import "./message.css";

const AlwaysScrollToBottom = () => {
    const elementRef = useRef();
    useEffect(() => elementRef.current.scrollIntoView());
    return <div ref={elementRef} />;
}

const  MessageContainer= (props)=>{



    var [messages,setMessage]=useState(props.data)

  useEffect(() => {
  
        setMessage(props.data)
     }, [props.data])

  return (
    <div  >

{

messages && messages.map(d=>{

return (

  <Message  data={d} />
)


})
}

<AlwaysScrollToBottom/>


                                  
     </div>     
)
}
export default  MessageContainer;
