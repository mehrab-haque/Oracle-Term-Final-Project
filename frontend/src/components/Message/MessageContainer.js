import { useEffect, useState } from "react";
import Message from "./Message.js"
import "./message.css";

const  MessageContainer= (props)=>{

  useEffect(() => {
  
        console.log('data',props.data)
     }, [props.data])

  return (
    <div >

{

props.data && props.data.map(d=>{

return (

  <Message data={d} />
)


})
}

                                  
                                  
     </div>     
)
}
export default  MessageContainer;
