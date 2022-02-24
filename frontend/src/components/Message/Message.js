import "./message.css";
import {useEffect, useState} from "react";
import axios from "axios";
import {api_base_url} from "../../index";
import Cookies from "universal-cookie";
import {socket} from "../Conversation/MessagesNew";
//import { format } from "timeago.js";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import {makeStyles} from "@mui/styles"
import DialogContent from "@mui/material/DialogContent";
import ReplyIcon from '@mui/icons-material/Reply';
import Button from '@mui/material/Button';
import Chip from "@mui/material/Chip";
import {MessageBox} from "react-chat-elements";
import {
    Avatar,
    DialogActions,
    Divider,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    Paper
} from "@mui/material";
import List from "@mui/material/List";

const cookies = new Cookies();

const useStyles = makeStyles({


    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    }


})

export default function Message(props) {

    const classes = useStyles()

    const [reactsContainer, setReactsContainer] = useState(false)

    const [reactionList, setReactionList] = useState([])
    const [open, setOpen] = useState(false);


    const [isReply,setReply]=useState(false)

    const handleClose = () => {
        setOpen(false)

    }
    const isReact = id => {
        var result = false
        reactionList.map(r => {
            if (r.own && r.reaction_id === id)
                result = true
        })

        return result
    }
    const reactionClick = () => {

        setOpen(true)
    }

    const [reactsDialog,setReactsDialog]=useState(false)
    const [repliesDialog,setRepliesDialog]=useState(false)

    const addReact = async reactId => {
        var reactResult = await axios.post(`${api_base_url}react/create`, {
                msgId: props.data.id,
                reactionId: reactId,
                already: isReact(reactId)
            }
            , {headers: {authorization: 'Bearer ' + cookies.get('token')}})
    }

    const replyClick=()=>{
        if(!isReply){
            props.modifyReplies(props.data,true)
        }else{
            props.modifyReplies(props.data,false)
        }
        setReply(!isReply)
    }

    useEffect(()=>{
        var isIn=false
        props.replies.map(r=>{
            if(r.id===props.data.id)
                isIn=true
        })
        setReply(isIn)
    },[props.replies])

    const [replies,setReplies]=useState([])

    const getIcon=id=>{
        var icon=null
        props.reacts.map(r=>{
            if(r.ID===id) {
                icon = r.IMAGE
            }
        })
        return icon
    }

    useEffect(async () => {
        var reactsResult = await axios.post(`${api_base_url}react/list_msg`, {msgId: props.data.id}, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
        var arr=[]
        reactsResult.data.map((r,i)=>{
            arr.push({...r,icon:getIcon(r.reaction_id)})
        })
        setReactionList(arr)

        socket.on('update_reacts', data => {
            if (data.msgId === props.data.id) {
                var arr=[]
                data.data.data.map((r,i)=>{
                    arr.push({...r,icon:getIcon(r.reaction_id)})
                })
                setReactionList(arr)
            }
        })

        //console.log('hi')
        var repliesResult=await axios.get(`${api_base_url}message/replies/get/${props.data.id}`,{headers: {authorization: 'Bearer ' + cookies.get('token')}})

        setReplies(props.getRepliesDetails(repliesResult.data))
        console.log(props.getRepliesDetails(repliesResult.data))

    }, [])

    const removeClick=async ()=>{
        var reactsResult = await axios.post(`${api_base_url}message/delete`,{
            id:props.data.id,
            place:props.data2.id,
            type:props.data2.type
        },  {headers: {authorization: 'Bearer ' + cookies.get('token')}})
    }



    if(replies.length===0){
        return(
            <div style={props.data.own?{paddingLeft:'100px',marginBottom:'55px'}:{paddingRight:'100px',marginBottom:'55px'}}>
                <Dialog open={reactsDialog} onClose={()=>{setReactsDialog(false)}}>
                    <DialogTitle>
                        {reactionList.length>0?reactionList.length:'No'} Reaction{reactionList.length>1?'s':''}
                    </DialogTitle>
                    <DialogContent>
                        <List>
                            {
                                reactionList.map(r=>{

                                    return(
                                        <div>
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar src={r.image}>
                                                        {r.name.substr(0,1)}
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText>
                                                    {r.name}
                                                </ListItemText>
                                                <ListItemIcon>
                                                    <Avatar style={{marginLeft:'auto',height:'26px',width:'26px'}} src={r.icon}/>
                                                </ListItemIcon>
                                            </ListItem>
                                        </div>
                                    )
                                })
                            }
                        </List>
                    </DialogContent>
                    <DialogActions>
                        <Button
                            onClick={()=>{setReactsDialog(false)}}
                            color={'secondary'}
                            >
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
                {
                    props.data.own?(
                        <MessageBox
                            removeButton={props.data.own}
                            onRemoveMessageClick={removeClick}
                            position={props.data.own?'right':'left'}
                            type={'text'}
                            date={new Date(props.data.timestamp*1000)}
                            replyButton={!isReply}
                            notch={true}
                            title={props.data.own?'You':props.data2.name}
                            onReplyClick={replyClick}
                            text={props.data.msg}
                        />
                    ):(
                        <MessageBox
                            removeButton={props.data.own}
                            onRemoveMessageClick={removeClick}
                            position={props.data.own?'right':'left'}
                            type={'text'}
                            avatar={props.data.image}
                            date={new Date(props.data.timestamp*1000)}
                            replyButton={!isReply}
                            notch={true}
                            title={props.data.own?'You':props.data.name}
                            onReplyClick={replyClick}
                            text={props.data.msg}
                        />
                    )
                }

                {
                    props.data.own?(
                        <div>
                            <div>


                                <Paper style={{float:'right',marginLeft:'5px',padding:'5px',display:'flex'}}>
                                    <div  onClick={()=>{setReactsDialog(true)}} style={{cursor:'pointer',color:'#0090ff',fontWeight:'bold'}}>
                                        {reactionList.length}
                                    </div>
                                </Paper>
                                <Paper onClick={()=>{
                                    setReactsContainer(!reactsContainer)
                                }} style={{cursor:'pointer',float:'right',padding:'5px',display:'flex'}}>


                                    <div style={{color:'#0090ff',fontWeight:'bold'}}>
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
                                </Paper>
                            </div>
                            <div className={reactsContainer ? 'reacts-container' : 'hidden'}>
                                {
                                    props.reacts.map(r => {
                                        return (
                                            <div className={'single-react-container'}>
                                                <center>
                                                    <img src={r.IMAGE} onClick={() => {
                                                        addReact(r.ID)
                                                    }}/>
                                                    {
                                                        isReact(r.ID) ? (
                                                            <div className={'react-label'}>
                                                                .
                                                            </div>
                                                        ) : (
                                                            <div/>
                                                        )
                                                    }
                                                </center>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    ):(
                        <div>
                            <div>


                                <Paper style={{float:'left',marginRight:'5px',padding:'5px',display:'flex'}}>
                                    <div onClick={()=>{setReactsDialog(true)}} style={{cursor:'pointer',color:'#0090ff',fontWeight:'bold'}}>
                                        {reactionList.length}
                                    </div>
                                </Paper>
                                <Paper onClick={()=>{
                                    setReactsContainer(!reactsContainer)
                                }} style={{cursor:'pointer',float:'left',padding:'5px',display:'flex'}}>


                                    <div style={{color:'#0090ff',fontWeight:'bold'}}>
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
                                </Paper>
                            </div>
                            <div className={reactsContainer ? 'reacts-container-left' : 'hidden'}>
                                {
                                    props.reacts.map(r => {
                                        return (
                                            <div className={'single-react-container'}>
                                                <center>
                                                    <img src={r.IMAGE} onClick={() => {
                                                        addReact(r.ID)
                                                    }}/>
                                                    {
                                                        isReact(r.ID) ? (
                                                            <div className={'react-label'}>
                                                                .
                                                            </div>
                                                        ) : (
                                                            <div/>
                                                        )
                                                    }
                                                </center>
                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                    )
                }
            </div>

        )
    }
else
    return(
        <div style={props.data.own?{paddingLeft:'100px',marginBottom:'55px'}:{paddingRight:'100px',marginBottom:'55px'}}>
            <Dialog open={reactsDialog} onClose={()=>{setReactsDialog(false)}}>
                <DialogTitle>
                    {reactionList.length>0?reactionList.length:'No'} Reaction{reactionList.length>1?'s':''}
                </DialogTitle>
                <DialogContent>
                    <List>
                        {
                            reactionList.map(r=>{

                                return(
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={r.image}>
                                                {r.name.substr(0,1)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText>
                                            {r.name}
                                        </ListItemText>
                                        <ListItemIcon>
                                            <Avatar style={{marginLeft:'auto',height:'26px',width:'26px'}} src={r.icon}/>
                                        </ListItemIcon>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={()=>{setReactsDialog(false)}}
                        color={'secondary'}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={repliesDialog} onClose={()=>{setReplies(false)}}>
                <DialogTitle>
                    Replied to below message{replies.length>1?'s':''}
                </DialogTitle>
                <DialogContent>
                    <List>
                        {
                            replies && replies.map(r=>{

                                return(
                                    <ListItem>
                                        <ListItemAvatar>
                                            <Avatar src={r.image}>
                                                {r.name?.substr(0,1)}
                                            </Avatar>
                                        </ListItemAvatar>
                                        <ListItemText primary={r.name} secondary={r.MSG+' - at '+new Date(r.timestamp*1000).toLocaleString()}>

                                        </ListItemText>
                                    </ListItem>
                                )
                            })
                        }
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button
                        onClick={()=>{setRepliesDialog(false)}}
                        color={'secondary'}
                    >
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {
                props.data.own?(
                    <MessageBox
                        removeButton={props.data.own}
                        onRemoveMessageClick={removeClick}
                        reply={{
                            photoURL: 'https://facebook.github.io/react/img/logo.svg',
                            title: `${props.data.own?'You':props.data2.name} replied to ${replies.length} message${replies.length>1?'s':''}`,
                            titleColor: '#8717ae',
                            message: 'Click to view',
                        }}
                        onReplyMessageClick={()=>{
                            setRepliesDialog(true)
                        }}
                        position={props.data.own?'right':'left'}
                        type={'text'}
                        date={new Date(props.data.timestamp*1000)}
                        replyButton={!isReply}
                        notch={true}
                        title={props.data.own?'You':props.data2.name}
                        onReplyClick={replyClick}
                        text={props.data.msg}
                    />
                ):(
                    <MessageBox
                        removeButton={props.data.own}
                        onRemoveMessageClick={removeClick}
                        reply={{
                            photoURL: 'https://facebook.github.io/react/img/logo.svg',
                            title: `${props.data.own?'You':props.data2.name} replied to ${replies.length} message${replies.length>1?'s':''}`,
                            titleColor: '#8717ae',
                            message: 'Click to view',
                        }}
                        onReplyMessageClick={()=>{
                            setRepliesDialog(true)
                        }}
                        position={props.data.own?'right':'left'}
                        type={'text'}
                        avatar={props.data.image}
                        date={new Date(props.data.timestamp*1000)}
                        replyButton={!isReply}
                        notch={true}
                        title={props.data.own?'You':props.data.name}
                        onReplyClick={replyClick}
                        text={props.data.msg}
                    />
                )
            }

            {
                props.data.own?(
                    <div>
                        <div>


                            <Paper style={{float:'right',marginLeft:'5px',padding:'5px',display:'flex'}}>
                                <div onClick={()=>{setReactsDialog(true)}} style={{cursor:'pointer',color:'#0090ff',fontWeight:'bold'}}>
                                    {reactionList.length}
                                </div>
                            </Paper>
                            <Paper onClick={()=>{
                                setReactsContainer(!reactsContainer)
                            }} style={{cursor:'pointer',float:'right',padding:'5px',display:'flex'}}>


                                <div style={{color:'#0090ff',fontWeight:'bold'}}>
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
                            </Paper>
                        </div>
                        <div className={reactsContainer ? 'reacts-container' : 'hidden'}>
                            {
                                props.reacts.map(r => {
                                    return (
                                        <div className={'single-react-container'}>
                                            <center>
                                                <img src={r.IMAGE} onClick={() => {
                                                    addReact(r.ID)
                                                }}/>
                                                {
                                                    isReact(r.ID) ? (
                                                        <div className={'react-label'}>
                                                            .
                                                        </div>
                                                    ) : (
                                                        <div/>
                                                    )
                                                }
                                            </center>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                ):(
                    <div>
                        <div>


                            <Paper style={{float:'left',marginRight:'5px',padding:'5px',display:'flex'}}>
                                <div onClick={()=>{setReactsDialog(true)}} style={{cursor:'pointer',color:'#0090ff',fontWeight:'bold'}}>
                                    {reactionList.length}
                                </div>
                            </Paper>
                            <Paper onClick={()=>{
                                setReactsContainer(!reactsContainer)
                            }} style={{cursor:'pointer',float:'left',padding:'5px',display:'flex'}}>


                                <div style={{color:'#0090ff',fontWeight:'bold'}}>
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
                            </Paper>
                        </div>
                        <div className={reactsContainer ? 'reacts-container-left' : 'hidden'}>
                            {
                                props.reacts.map(r => {
                                    return (
                                        <div className={'single-react-container'}>
                                            <center>
                                                <img src={r.IMAGE} onClick={() => {
                                                    addReact(r.ID)
                                                }}/>
                                                {
                                                    isReact(r.ID) ? (
                                                        <div className={'react-label'}>
                                                            .
                                                        </div>
                                                    ) : (
                                                        <div/>
                                                    )
                                                }
                                            </center>
                                        </div>
                                    )
                                })
                            }

                        </div>
                    </div>
                )
            }
        </div>
    )

    return (
        <div className={props.data.own ? "message own" : "message"}>
            <div>
                {
                    replies.map(r=>{
                        return(
                            <div className={props.data.own?'reply-own':'reply'}>
                                {r.MSG}
                            </div>
                        )
                    })
                }

            </div>
            <div className={reactsContainer ? 'reacts-container' : 'hidden'}>
                {
                    props.reacts.map(r => {
                        return (
                            <div className={'single-react-container'}>
                                <center>
                                    <img src={r.IMAGE} onClick={() => {
                                        addReact(r.ID)
                                    }}/>
                                    {
                                        isReact(r.ID) ? (
                                            <div className={'react-label'}>
                                                .
                                            </div>
                                        ) : (
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
                        <div onClick={reactionClick}>
                            {
                                reactionList.length
                            }
                        </div>
                    </center>
                </div>

                <p className="messageText">{props.data.msg}</p>
                <div onClick={() => {
                    setReactsContainer(!reactsContainer)
                }} className={'reactButton'}>
                    {
                        reactsContainer ? (
                            <div>
                                x
                            </div>
                        ) : (
                            <div>
                                +
                            </div>
                        )
                    }
                </div>
                <div>
                </div>
                {
                    isReply?(
                        <div>
                        </div>
                    ):(
                        <ReplyIcon onClick={replyClick} className={'reply-btn'} color={'primary'}/>
                    )
                }

            </div>


            <p className={props.data.own ? "seen own" : "seen"}> Seen </p>
            <div className="messageBottom">{props.data.timestamp}</div>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>People who reacted</DialogTitle>

                <DialogContent className={classes.root}>
                    {reactionList.map((r, i) => {
                        return (
                            <div className={"conversation"} key={i}>
                                <img className="conversationImg" src={r.image}/>
                                <span className="conversationName">{r.name}</span>

                            </div>

                        )

                    })}


                </DialogContent>
            </Dialog>
        </div>
    );
}
