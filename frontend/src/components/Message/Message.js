import "./message.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_base_url} from "../../index";
import Cookies from "universal-cookie";
import {socket} from "../Conversation/Messages";
//import { format } from "timeago.js";
const cookies = new Cookies();

export default function Message(props) {

    const [reactsContainer,setReactsContainer]=useState(false)

    const [reactionList,setReactionList]=useState([])

    const isReact=id=>{
        var result=false
        reactionList.map(r=>{
            if(r.own && r.reaction_id===id)
                result=true
        })
        return result
    }

    const addReact=async reactId=>{
        var reactResult=await axios.post(`${api_base_url}react/create`,{
            msgId:props.data.id,
            reactionId:reactId,
            already: isReact(reactId)
        }
        , {headers: {authorization: 'Bearer ' + cookies.get('token')}})
        console.log(reactResult)
    }

    useEffect(async()=>{
        var reactsResult=await axios.post(`${api_base_url}react/list_msg`,{msgId:props.data.id},{headers: {authorization: 'Bearer ' + cookies.get('token')}})
        console.log(reactsResult.data)
        setReactionList(reactsResult.data)

        socket.on('update_reacts', data => {
            console.log('henlooooo')
            if(data.msgId===props.data.id){
                setReactionList(data.data.data)
            }
        })

    },[])

  return (
    <div className={props.data.own ? "message own" : "message"}>
      <div className={reactsContainer ? 'reacts-container':'hidden'}>
          {
              props.reacts.map(r=>{
                  return(
                      <div className={'single-react-container'}>
                          <center>
                              <img src={r.IMAGE} onClick={()=>{addReact(r.ID)}}/>
                              {
                                isReact(r.ID)?(
                                    <div className={'react-label'}>
                                        .
                                    </div>
                                ):(
                                    <div/>
                                )
                              }
                          </center>
                      </div>
                  )
              })
          }

      </div>
        <div className="messageTop">
            <div>
                <center>
                    <img
                        className="messageImg"
                        src="https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"
                        alt=""
                    />
                    <div>
                        {
                            reactionList.length
                        }
                    </div>
                </center>
            </div>

        <p className="messageText">{props.data.msg}</p>
          <div onClick={()=>{setReactsContainer(!reactsContainer)}} className={'reactButton'}>
              {
                  reactsContainer?(
                      <div>
                          x
                      </div>
                  ):(
                      <div>
                          +
                      </div>
                  )
              }
          </div>


      </div>
<p className={props.data.own?"seen own":"seen"}> Seen </p>
      <div className="messageBottom">{props.data.timestamp}</div>
    </div>
  );
}
