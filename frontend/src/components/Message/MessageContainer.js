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



    var getRepliesData=array=>{
        var arr=[...array]
        arr.map((a,i)=>{
            props.data.map(d=>{
                if(d.id===a.ID){
                    arr[i]={...arr[i],
                        name:d.name,
                        image:d.image,
                        timestamp:d.timestamp,
                        own:d.own
                    }
                }
            })
        })
        return arr


    }



  useEffect(() => {
  
        setMessage(props.data)
     }, [props.data])

  return (
    <div className={'messages-container'} >

{

messages && messages.map(d=>{

return (

  <Message getRepliesDetails={getRepliesData} replies={props.replies} data2={props.data2} modifyReplies={props.modifyReplies} key={d.id} reacts={props.reacts}  data={d} />
)


})
}

<AlwaysScrollToBottom/>


                                  
     </div>     
)
}
export default  MessageContainer;
