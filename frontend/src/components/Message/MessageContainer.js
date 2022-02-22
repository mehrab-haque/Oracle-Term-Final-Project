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
    <div className={'messages-container'} >

{

messages && messages.map(d=>{

return (

  <Message replies={props.replies} data2={props.data2} modifyReplies={props.modifyReplies} key={d.id} reacts={props.reacts}  data={d} />
)


})
}

<AlwaysScrollToBottom/>


                                  
     </div>     
)
}
export default  MessageContainer;
