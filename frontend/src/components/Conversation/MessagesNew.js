import PropTypes from 'prop-types';
import Select from 'react-select';
import AutoDeleteIcon from '@mui/icons-material/AutoDelete';
import InfoIcon from '@mui/icons-material/Info';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import EditIcon from '@mui/icons-material/Edit';
import LogoutIcon from '@mui/icons-material/Logout';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ReactTimeAgo from 'react-time-ago'
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import IconButton from '@mui/material/IconButton';
import SendIcon from '@mui/icons-material/Send';
import * as React from 'react';
import 'react-chat-elements/dist/main.css';
import { ChatList,Input } from 'react-chat-elements'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import io from 'socket.io-client'
import {api_base_url, socket_endpoint} from "../../index";
import {app} from '../../config/firebase_config'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import Cookies from "universal-cookie";
import {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";
import axios from "axios";
import {checkAuth, logout} from "../../action/auth";
import {setLoading, showToast} from "../../App";
import {sendMessage} from "../../action/messages";
import LinearProgress from "@mui/material/LinearProgress";
import MessageContainer from "../Message/MessageContainer";
import TextField from "@mui/material/TextField";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import {Avatar, FormControlLabel, FormGroup, ListItemAvatar, Switch} from "@mui/material";
import Members from "./Inbox/Members";
import {Add} from "@mui/icons-material";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

let socket;


const cookies = new Cookies();

const drawerWidth = 320;

function MessagesNew(props) {
    const msgRef = useRef(null)
    const data2Ref=useRef(null)
    const membersRef=useRef(null)
    const othersRef=useRef(null)

    const storage = getStorage(app);

    const [selectedSenders,setSelectedSenders]=useState(null)
    const [selectedReceivers,setSelectedReceivers]=useState(null)

    const handleSendersChange = (selectedOptions) => {
        setSelectedSenders(selectedOptions)
    };

    const handleReceiversChange = (selectedOptions) => {
        setSelectedReceivers(selectedOptions)
    };


    const [imagePreview, setImagePreview] = useState(null)
    const [imagePreview2, setImagePreview2] = useState(null)
    const nameRef = useRef()
    const statusRef = useRef()
    const groupNameRef = useRef()
    const [user, setUser] = useState(null);

    const dispatch = useDispatch();

    const dispatcher = useDispatch();

    const [chatHeads, setChatHeads] = useState([])
    const [open, setOpen] = useState(false);
    const [open2, setOpen2] = useState(false);

    const [profileData, setProfileData] = useState({})
    const [image, setImage] = useState(null)
    const [image2, setImage2] = useState(null)
    const [data, setData] = useState(null)
    const [members, setMembers] = useState(null)
    const [others, setOthers] = useState(null)
    const [data2, setData2] = useState(null)
    const [state, setState] = useState(0)

    const [replies,setReplies]=useState([])

    const { window } = props;
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const [mobileOpen2, setMobileOpen2] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleDrawerToggle2 = () => {
        setMobileOpen2(!mobileOpen2);
    };

    useEffect(()=>{
        console.log(replies)
    },[replies])

    const modifyReply=(message,insert)=>{
        if(insert)
            setReplies([...replies,message])
        else{
            var arr=[]
            replies.map(a=>{
                if(a.id!==message.id)
                    arr.push(a)
            })
            setReplies([...arr])
        }
    }

    var messagesRef = useRef()

    const handleType = () => {

        socket.emit('typing', data2)

    }
    
    
    useEffect(()=>{
        if(members!==null)
            setSelectedReceivers(members.map(m=>{return {value:m.ID,label:m.NAME,name:m.NAME,image:m.IMAGE}}))
    },[members])


    useEffect(async () => {

        console.log(app)
        axios.get('http://localhost:8080/api/v1.0.0/users/list', {headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res => {
                console.log(res.data)

                setChatHeads(res.data)
                axios.get('http://localhost:8080/api/v1.0.0/user/profile', {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                    .then(res => {
                        console.log(res.data);
                        setProfileData(res.data)
                        setImagePreview(res.data.image)
                    })
                    .catch(e => console.log(e))
            })

            .catch(e => console.log(e))

    }, [])

    const [reactList,setReactList]=useState([])


    useEffect(async () => {
        checkAuth(dispatcher);
        console.log(profileData)

        var reactsResult=await axios.get(`${api_base_url}react/list`,{headers: {authorization: 'Bearer ' + cookies.get('token')}})
        setReactList(reactsResult.data)

    }, [])


    const handleClick = () => {
        setOpen(true);
    }
    const handleClick2 = () => {
        setOpen2(true);
    }
    const handleClose2 = () => {
        setOpen2(false);
    }
    const handleClose = () => {
        setOpen(false);
    };

    const inboxClick = (data) => {

        setReplies([])
        setSelectedSenders(null)
        setData2(data);
        setData([])
        data2Ref.current=data
        if (data.type === 1) {
            setState(1);
            axios.get('http://localhost:8080/api/v1.0.0/message/get/' + data.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                .then(res => {
                    setData(res.data);
                    messagesRef.current = res.data

                })
                .catch(e => console.log(e))
        } else {
            setState(2);
            axios.get('http://localhost:8080/api/v1.0.0/group/getMembers/' + data.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                .then(res => {
                    setSelectedSenders(null) ;
                    setMembers(res.data);
                    membersRef.current=res.data
                    let v = chatHeads.map(c => {
                        let flag = 0;
                        res.data.forEach(r => {
                            if (c.type == 2 || c.type === 1 && c.id === r.ID) {
                                flag = 1;

                            }

                        })
                        if (flag === 0) {
                            return c;
                        } else return null;

                    })
                    setSelectedSenders(null) ; setOthers(v);
                    othersRef.current=v

                })
                .catch(e => console.log(e))

            axios.get('http://localhost:8080/api/v1.0.0/message/group/get/' + data.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                .then(res => {
                    setData(res.data);
                    messagesRef.current = res.data

                })
                .catch(e => console.log(e))


        }


    };

    const onImageChange = event => {
        setImage(event.target.files[0])
        var url = URL.createObjectURL(event.target.files[0])
        setImagePreview(url)
    };
    const onImageChange2 = event => {
        setImage2(event.target.files[0])
        var url = URL.createObjectURL(event.target.files[0])
        setImagePreview2(url)
    };

    const upload = async () => {
        if (nameRef.current.value.trim().length === 0)
            showToast('Name cannot be empty')
        else {
            setLoading(true)

            if (image !== null) {
                const profileImagesRef = ref(storage, `images/${profileData.id}.${image.name.split('.')[image.name.split('.').length - 1]}`);
                const uploadTask = uploadBytesResumable(profileImagesRef, image);
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (error) => {
                        setLoading(false)
                        showToast('Error occurred')
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            var newData = {
                                name: nameRef.current.value,
                                status: statusRef.current.value,
                                image: downloadURL
                            }
                            axios.put('http://localhost:8080/api/v1.0.0/user/profile', newData, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                                .then(res => {
                                    setProfileData({
                                        id: profileData.id,
                                        ...newData
                                    })
                                    setLoading(false)
                                    showToast('Profile Updated Successfully...')
                                })
                                .catch(e => {
                                    setLoading(false)
                                    showToast('Error occurred')
                                    console.log(e)
                                })
                        });
                    })
            } else {

                var newData = {
                    name: nameRef.current.value,
                    status: statusRef.current.value,
                    image: profileData.image
                }
                axios.put('http://localhost:8080/api/v1.0.0/user/profile', newData, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                    .then(res => {
                        setProfileData({
                            id: profileData.id,
                            ...newData
                        })
                        setLoading(false)
                        showToast('Profile Updated Successfully...')
                    })
                    .catch(e => {
                        setLoading(false)
                        showToast('Error occurred')
                        console.log(e)
                    })
            }
        }

    }

    const upload2 = async () => {
        if (groupNameRef.current.value.trim().length === 0)
            showToast('Name cannot be empty')
        else {
            setLoading(true)

            if (image2 !== null) {
                const groupImagesRef = ref(storage, `images/${image2.name.split('.')[image2.name.split('.').length - 1]}`);
                const uploadTask = uploadBytesResumable(groupImagesRef, image2);
                uploadTask.on('state_changed',
                    (snapshot) => {
                    },
                    (error) => {
                        setLoading(false)
                        showToast('Error occurred')
                    },
                    () => {
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                            console.log(downloadURL);
                            var newData = {
                                name: groupNameRef.current.value,

                                image: downloadURL
                            }

                            axios.post('http://localhost:8080/api/v1.0.0/group/create', newData, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                                .then(res => {

                                    setLoading(false)
                                    showToast('Group Created Successfully...')
                                })
                                .catch(e => {

                                    setLoading(false)
                                    showToast('Error occurred')
                                    console.log(e)
                                })
                        });
                    })
            } else {

                var newData = {
                    name: groupNameRef.current.value,

                    image: 'https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png'
                }
                axios.post('http://localhost:8080/api/v1.0.0/group/create', newData, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                    .then(res => {

                        setLoading(false)
                        showToast('Group created Successfully...')
                    })
                    .catch(e => {
                        setLoading(false)
                        showToast('Error occurred')
                        console.log(e)
                    })
            }
        }

    }
    const container = window !== undefined ? () => window().document.body : undefined;



    const sendMessageClick = async () => {

        setUser(null);
        socket.emit('typing_ended', data2)
        const msgText = msgRef.current.value
        if (msgText.trim().length === 0)
            showToast(`Message can't be empty`)
        else {
            await sendMessage(data2.id, data2.type, msgText,replies,selectedSenders,selectedReceivers)
            msgRef.current.value=''
            setReplies([])
        }
    }

    const chatHeadsRef = useRef()

    useEffect(() => {
        chatHeadsRef.current = chatHeads
    }, [chatHeads])

    useEffect(async () => {
        socket = await io(socket_endpoint);

        socket.on('message_typing', name => {
            setUser(name)
        })

        socket.on('end_typing', name => {
            setUser(null)
        })

        socket.emit('token', cookies.get('token'));
        socket.on('message', d => {
            var fromInbox
            var prevList = []
            chatHeadsRef.current.map((a, i) => {
                if (a.type === 2 || (a.type === 1 && a.id !== d.from)) {
                    prevList.push(a)
                } else {
                    fromInbox = a
                }
            })
            fromInbox['isConnected'] = true
            fromInbox['message'] = {
                own: false,
                seen: false,
                text: d.body,
                timestamp: parseInt(d.timestamp / 1000)
            }
            setChatHeads([fromInbox, ...prevList])
            if(data2Ref.current.id===d.from){
                messagesRef.current = [...messagesRef.current, {
                    id:d.id,
                    msg: d.body,
                    isConnected: true,
                    own: false,
                    timestamp: parseInt(d.timestamp / 1000)
                }]
                setData(messagesRef.current)
            }

        })

        socket.on('group_add', d => {
            console.log(d)
            chatHeadsRef.current=[d,...chatHeadsRef.current]
            setChatHeads(chatHeadsRef.current)
        })

        socket.on('group_remove', d => {

        })

        socket.on('group_add_member', d => {
            if(data2Ref.current && data2Ref.current.id===d.groupId) {
                membersRef.current = [d, ...membersRef.current]
                setSelectedSenders(null) ; setMembers(membersRef.current)
                var newOthers = []
                othersRef.current.map(o => {
                    if (o && o.id !== d.ID)
                        newOthers.push(o)
                })
                othersRef.current = [...newOthers]
                setSelectedSenders(null) ; setOthers(othersRef.current)
            }

        })

        socket.on('group_remove_member', d => {
            if(data2Ref.current && data2Ref.current.id===d.groupId) {
                othersRef.current = [{
                    id:d.ID,
                    name:d.NAME,
                    image:d.IMAGE
                }, ...othersRef.current]
                setSelectedSenders(null) ; setOthers(othersRef.current)
                var newMembers = []
                membersRef.current.map(o => {
                    if (o && o.ID !== d.ID)
                        newMembers.push(o)
                })
                membersRef.current = [...newMembers]
                setSelectedSenders(null) ; setMembers(membersRef.current)
            }

        })

        socket.on('group_remove_member_single', d => {
            var newChatHeads=[]
            chatHeadsRef.current.map(c=>{
                if(c.type===1 || (c.type===2 && c.id!==d.groupId))
                    newChatHeads.push(c)
            })
            chatHeadsRef.current=newChatHeads
            setChatHeads(chatHeadsRef.current)

            if(data2Ref.current.id===d.groupId){
                messagesRef.current=null
                setData(messagesRef.current)
                data2Ref.current=null
                setSelectedSenders(null)
                setData2(data2Ref.current)
                membersRef.current=null
                othersRef.current=null
                setSelectedSenders(null) ; setMembers(membersRef.current)
                setSelectedSenders(null) ; setOthers(othersRef.current)
            }


            if(data2Ref.current && data2Ref.current.id===d.groupId) {
                othersRef.current = [{
                    id:d.ID,
                    name:d.NAME,
                    image:d.IMAGE
                }, ...othersRef.current]
                setSelectedSenders(null) ; setOthers(othersRef.current)
                var newMembers = []
                membersRef.current.map(o => {
                    if (o && o.ID !== d.ID)
                        newMembers.push(o)
                })
                membersRef.current = [...newMembers]
                setSelectedSenders(null) ; setMembers(membersRef.current)
            }

        })

        socket.on('message_group', d => {
            console.log('message group received')

            var fromInbox
            var prevList = []
            console.log(chatHeadsRef.current)
            console.log(d)
            chatHeadsRef.current.map((a, i) => {
                if (a.type === 1 || (a.type === 2 && a.id !== d.groupId)) {
                    prevList.push(a)
                } else {
                    fromInbox = a
                }
            })
            fromInbox['message'] = {
                own: false,
                seen: false,
                text: d.body,
                timestamp: parseInt(d.timestamp / 1000)
            }



            setChatHeads([fromInbox, ...prevList])


            if(data2Ref.current.id===d.groupId){
                messagesRef.current = [...messagesRef.current, {
                    senders:d.senders,
                    id:d.id,
                    msg: d.body,
                    isConnected: true,
                    own: false, timestamp: parseInt(d.timestamp / 1000)
                }]
                setData(messagesRef.current)
            }

        })

        socket.on('message_own', d => {

            var fromInbox
            var prevList = []
            chatHeadsRef.current.map((a, i) => {
                if (a.type === 2 || (a.type === 1 && a.id !== d.to)) {
                    prevList.push(a)
                } else {
                    fromInbox = a
                }
            })
            fromInbox['isConnected'] = true
            fromInbox['message'] = {
                own: true,
                seen: false,
                text: d.body,
                timestamp: parseInt(d.timestamp / 1000)
            }
            setChatHeads([fromInbox, ...prevList])
            messagesRef.current = [...messagesRef.current, {
                id:d.id,
                msg: d.body,
                isConnected: true,
                own: true, timestamp: parseInt(d.timestamp / 1000)
            }]
            setData(messagesRef.current)
        })



        socket.on('message_own_group', d => {
            console.log(d)
            var fromInbox
            var prevList = []
            chatHeadsRef.current.map((a, i) => {
                if (a.type === 1 || (a.type === 2 && a.id !== d.to)) {
                    prevList.push(a)
                } else {
                    fromInbox = a
                }
            })
            fromInbox['message'] = {
                own: true,
                seen: false,
                text: d.body,
                timestamp: parseInt(d.timestamp / 1000)
            }
            setChatHeads([fromInbox, ...prevList])
            messagesRef.current = [...messagesRef.current, {
                id:d.id,
                senders:d.senders,
                msg: d.body,
                isConnected: true,
                own: true, timestamp: parseInt(d.timestamp / 1000)
            }]
            setData(messagesRef.current)
        })

        socket.on('message_delete', d => {
            if(d.type===data2Ref.current.type && d.place===data2Ref.current.id){
                const array=[]
                messagesRef.current.map(m=>{
                    if(m.id!==d.id)
                        array.push(m)
                })
                messagesRef.current=[...array]
                setData(messagesRef.current)
            }
        })
    }, [])

    function truncate(str, n){
        return (str.length > n) ? str.substr(0, n-1) + '...' : str;
    };

    const chatHeadClick=event=>{
        inboxClick(event.data)
    }

    const signoutClick=()=>{
        socket.disconnect()
        logout(dispatch);
    }



    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar
                sx={{
                    backgroundColor:'#ffffff',color:'#0090ff',
                    width: { sm: `calc(100% - ${drawerWidth}px)` },
                    ml: { sm: `${drawerWidth}px` },
                }}
                position="fixed"
            >
                <Toolbar>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={handleDrawerToggle}
                        sx={{ mr: 2, display: { sm: 'none' } }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <div>
                        <div style={{color:'#000000',fontSize:'1.3em',display:'flex',alignItems:'center'}}>
                            {
                                data2!==null?(
                                    <Avatar style={{marginRight:'10px'}} src={data2.image}/>
                                ):(
                                    <div/>
                                )
                            }
                            {data2===null?' Select Inbox':data2.name}
                        </div>
                    </div>
                    <div style={{float:'right',marginLeft:'auto'}}>
                        <Button onClick={signoutClick} variant="outlined" startIcon={<LogoutIcon />}>
                            Logout
                        </Button>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            style={{marginRight:'-10px',marginLeft:'5px'}}
                            onClick={handleDrawerToggle2}
                            sx={{ mr: 2, display: { sm: 'none' } }}
                        >
                            <InfoIcon />
                        </IconButton>

                    </div>
                </Toolbar>
            </AppBar>
            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Edit Profile</DialogTitle>

                <DialogContent >
                    <TextField
                        id="outlined-name-input"
                        label="Name"
                        defaultValue={profileData.name ? profileData.name : ''}
                        type="text"
                        inputRef={nameRef}
                        style={{marginTop: '20px'}}
                        autoFocus
                        margin="dense"

                    /><br/>

                    <TextField
                        id="outlined-password-input"
                        label="Status"
                        defaultValue={profileData.status ? profileData.status : ''}
                        type="text"
                        inputRef={statusRef}
                        style={{marginTop: '20px'}}
                        autoFocus
                        margin="dense"


                    /><br/>
                    <input
                        style={{display: "none"}}
                        id="contained-button-file"
                        type="file"
                        onChange={onImageChange}
                    />
                    <center>
                        <div>
                            <img style={{marginTop: "10px"}} src={imagePreview} height={'100px'} width={'100px'}/>
                        </div>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{marginTop: "10px"}}>
                                Upload Image
                            </Button>
                        </label>
                        <Button onClick={upload} variant="contained" color="primary" component="span"
                                style={{marginLeft: "10px", marginTop: '10px'}}>
                            Update
                        </Button>
                    </center>

                </DialogContent>
            </Dialog>
            <Dialog onClose={handleClose2} open={open2}>
                <DialogTitle>Create Group</DialogTitle>

                <DialogContent >
                    <TextField
                        id="outlined-name-input"
                        label="Name"

                        type="text"
                        inputRef={groupNameRef}
                        style={{marginTop: '20px'}}
                        autoFocus
                        margin="dense"

                    />


                    <input
                        style={{display: "none"}}
                        id="contained-button-file"
                        type="file"
                        onChange={onImageChange2}
                    />
                    <center>
                        <div>
                            <img style={{marginTop: "10px"}} src={imagePreview2} height={'100px'} width={'100px'}/>
                        </div>
                        <label htmlFor="contained-button-file">
                            <Button variant="contained" color="primary" component="span" style={{marginTop: "10px"}}>
                                Upload Image
                            </Button>
                        </label>
                        <Button onClick={upload2} variant="contained" color="primary" component="span"
                                style={{marginLeft: "10px", marginTop: '10px'}}>
                            Create
                        </Button>
                    </center>

                </DialogContent>
            </Dialog>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="left"
            >
                <Toolbar >
                    {
                        profileData && Object.keys(profileData)!==0?(
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Avatar src={profileData.image} style={{marginLeft:'-10px',marginRight:'10px',height:'50px',width:'50px'}}>
                                    {
                                        profileData.name?.substr(0,1)
                                    }
                                </Avatar>
                                <div>
                                    <b>{
                                        profileData.name
                                    }</b>
                                </div>

                            </div>
                        ):(
                            <div/>
                        )
                    }
                    <div style={{width:'100%'}}>
                        <div style={{float:'right',marginLeft:'auto',paddingTop:'10px'}}>
                            <EditIcon onClick={()=>{setOpen(true)}} style={{color:'#0090ff',marginRight:'5px',cursor:'pointer'}}/>
                            <AddCircleIcon onClick={()=>{setOpen2(true)}} style={{color:'#0090ff',cursor:'pointer'}}/>

                        </div>
                    </div>
                </Toolbar>
                <Divider />
                {
                    profileData.name === undefined ? <LinearProgress/>:(
                        <ChatList
                            className='chat-list'
                            onClick={chatHeadClick}
                            dataSource={chatHeads.map((c, i) => {
                                return(
                                    {
                                        data:c,
                                        avatar: c.image,
                                        alt: c.name,
                                        title: c.name,
                                        subtitle: c.message.text,
                                        date: c.message.timestamp===0?Date.now():new Date(c.message.timestamp*1000),
                                        unread: c.message.seen?1:0,
                                    }
                                )
                            })}
                         />
                    )
                }
            </Drawer>
            <Drawer
                variant="permanent"
                anchor="left"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Toolbar >
                    {
                        profileData && Object.keys(profileData)!==0?(
                            <div style={{display:'flex',alignItems:'center'}}>
                                <Avatar src={profileData.image} style={{marginLeft:'-10px',marginRight:'10px',height:'50px',width:'50px'}}>
                                    {
                                        profileData.name?.substr(0,1)
                                    }
                                </Avatar>
                                <div>
                                    <b>{
                                        profileData.name
                                    }</b>
                                </div>

                            </div>
                        ):(
                            <div/>
                        )
                    }
                    <div style={{width:'100%'}}>
                        <div style={{float:'right',marginLeft:'auto',paddingTop:'10px'}}>
                            <EditIcon onClick={()=>{setOpen(true)}} style={{color:'#0090ff',marginRight:'5px',cursor:'pointer'}}/>
                            <AddCircleIcon onClick={()=>{setOpen2(true)}} style={{color:'#0090ff',cursor:'pointer'}}/>

                        </div>
                    </div>
                </Toolbar>
                <Divider />
                {
                    profileData.name === undefined ? <LinearProgress/>:(
                        <ChatList
                            className='chat-list'
                            onClick={chatHeadClick}
                            dataSource={chatHeads.map((c, i) => {
                                return(
                                    {
                                        data:c,
                                        avatar: c.image,
                                        alt: c.name,
                                        title: c.name,
                                        subtitle: c.message.text,
                                        date: c.message.timestamp===0?Date.now():new Date(c.message.timestamp*1000),
                                        unread: c.message.seen?1:0,
                                    }
                                )
                            })}
                        />
                    )
                }
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <Toolbar />
                {
                    state === 1 || state === 2 ?(
                        < MessageContainer replies={replies} modifyReplies={modifyReply} reacts={reactList} data={data} data2={data2}/>
                    ):(
                        <p></p>
                    )
                }
                {
                    data2===null?(
                        <div/>
                    ):(
                        <div className={'chat-wrapper'}>
                            <Stack direction="row" spacing={1}>
                                {
                                    replies.map(r=>{
                                        return(
                                            <Chip color={'primary'} style={{backgroundColor:'white'}} onDelete={()=>{
                                                modifyReply(r,false)
                                            }} label={truncate(r.msg,10)} variant="outlined" />

                                        )
                                    })
                                }
                            </Stack>
                            <div className="chatBoxBottom">


                                <TextField
                                    variant={'filled'}
                                    onChange={handleType}
                                    inputRef={msgRef}
                                    fullWidth

                                    className="chatMessageInput"
                                    label="write your message..."
                                ></TextField>
                                <IconButton className={'chat'} onClick={sendMessageClick} aria-label="delete">
                                    <SendIcon color={'primary'}/>
                                </IconButton>
                            </div>
                        </div>
                    )
                }
            </Box>
            <Drawer
                container={container}
                variant="temporary"
                open={mobileOpen2}
                onClose={handleDrawerToggle2}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                anchor="right"
            >
                <Toolbar >
                    {
                        data2 && data2.type===2?(
                            <div style={{width:'100%'}}>
                                <DeletedDialog data2={data2}/>
                            </div>
                        ):(
                            <div>

                            </div>
                        )
                    }

                </Toolbar>
                <Divider />
                {
                    data2 && members && data2.type===2?(
                        <div  style={{padding:'10px'}}>
                            <b style={{marginLeft:'10px',marginTop:'20px',marginBottom:'10px'}}>Add Senders</b>
                            <Select
                                style={{marginLeft:'10px',marginRight:'10px'}}
                                isMulti={true}
                                isSearchable={true}
                                value={selectedSenders}
                                onChange={handleSendersChange}
                                options={members.map(m=>{return {value:m.ID,label:m.NAME,name:m.NAME,image:m.IMAGE}})}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }


                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <b style={{marginLeft:'10px',marginTop:'20px',marginBottom:'10px'}}>Receivers</b>
                            <Select
                                style={{marginLeft:'10px',marginRight:'10px'}}

                                isMulti={true}
                                isSearchable={true}
                                value={selectedReceivers}
                                onChange={handleReceiversChange}
                                options={members.map(m=>{return {value:m.ID,label:m.NAME,name:m.NAME,image:m.IMAGE}})}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }

                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <FormGroup>
                                <FormControlLabel control={<Switch/>} label="Scheduled Send" />
                                <FormControlLabel control={<Switch />} label="Scheduled Deletion" />
                            </FormGroup>
                        </div>
                    ):(
                        <div/>
                    )
                }



                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <TextField
                                id="datetime-local"
                                label="Send Schedule"
                                type="datetime-local"
                                defaultValue="2022-02-25T10:30"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }

                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <TextField
                                id="datetime-local"
                                label="Delete Schedule"
                                type="datetime-local"
                                defaultValue="2022-02-25T10:30"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }


                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <TextField
                                id="datetime-local"
                                label="Password"
                                type="password"
                                fullWidth
                                aria-autocomplete={'none'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }
                {state == 2 && members ? <div style={{marginTop:'10px'}}>
                    <b style={{marginLeft:'10px',marginTop:'10px'}}>Group Members ({members.length})</b>
                    <b style={{marginRight:'10px',cursor:'pointer',float:'right',color:'#dd0000'}}>Leave</b>
                </div>: null}
                {
                    state == 2 && members ? (
                        <GroupMembers groupData={data2} members={members}/>
                    ):(
                        <div/>
                    )
                }
                {state == 2 && others ? <b style={{marginLeft:'10px',marginTop:'10px'}}>Add Members</b> : null}

                {
                    state == 2 && others ? (
                        <GroupOthers groupData={data2} others={others}/>
                    ):(
                        <div/>
                    )
                }
            </Drawer>
            <Drawer
                variant="permanent"
                anchor="right"
                sx={{
                    display: { xs: 'none', sm: 'block' },
                    '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
                open
            >
                <Toolbar >
                    {
                        data2 && data2.type===2?(
                            <div style={{width:'100%'}}>
                                <DeletedDialog data2={data2}/>
                            </div>
                        ):(
                            <div>

                            </div>
                        )
                    }

                </Toolbar>
                <Divider />

                {
                    data2 && members && data2.type===2?(
                        <div  style={{padding:'10px'}}>
                            <b style={{marginLeft:'10px',marginTop:'20px',marginBottom:'10px'}}>Add Senders</b>
                            <Select
                                style={{marginLeft:'10px',marginRight:'10px'}}
                                isMulti={true}
                                isSearchable={true}
                                value={selectedSenders}
                                onChange={handleSendersChange}
                                options={members.map(m=>{return {value:m.ID,label:m.NAME,name:m.NAME,image:m.IMAGE}})}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }


                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <b style={{marginLeft:'10px',marginTop:'20px',marginBottom:'10px'}}>Receivers</b>
                            <Select
                                style={{marginLeft:'10px',marginRight:'10px'}}

                                isMulti={true}
                                isSearchable={true}
                                value={selectedReceivers}
                                onChange={handleReceiversChange}
                                options={members.map(m=>{return {value:m.ID,label:m.NAME,name:m.NAME,image:m.IMAGE}})}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }

                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <FormGroup>
                                <FormControlLabel control={<Switch/>} label="Scheduled Send" />
                                <FormControlLabel control={<Switch />} label="Scheduled Deletion" />
                            </FormGroup>
                        </div>
                    ):(
                        <div/>
                    )
                }



                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <TextField
                                id="datetime-local"
                                label="Send Schedule"
                                type="datetime-local"
                                defaultValue="2022-02-25T10:30"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }

                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <TextField
                                id="datetime-local"
                                label="Delete Schedule"
                                type="datetime-local"
                                defaultValue="2022-02-25T10:30"
                                fullWidth
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }


                {
                    data2 && members && data2.type===2?(
                        <div style={{padding:'10px'}}>
                            <TextField
                                id="datetime-local"
                                label="Password"
                                type="password"
                                fullWidth
                                aria-autocomplete={'none'}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </div>
                    ):(
                        <div/>
                    )
                }






                {state == 2 && members ? <div style={{marginTop:'10px'}}>
                    <b style={{marginLeft:'10px',marginTop:'10px'}}>Group Members ({members.length})</b>
                    <b style={{marginRight:'10px',cursor:'pointer',float:'right',color:'#dd0000'}}>Leave</b>
                </div>: null}
                {
                    state == 2 && members ? (
                        <GroupMembers groupData={data2} members={members}/>
                    ):(
                        <div/>
                    )
                }
                {state == 2 && others ? <b style={{marginLeft:'10px',marginTop:'10px'}}>Add Members</b> : null}

                {
                    state == 2 && others ? (
                        <GroupOthers groupData={data2} others={others}/>
                    ):(
                        <div/>
                    )
                }
            </Drawer>
        </Box>
    );
}

const DeletedDialog=props=>{

    const [open, setOpen]=useState(false)
    const [groupId,setGroupId]=useState(props.data2.id)

    const [data,setData]=useState(null)

    const [done,isDone]=useState(false)

    const fetch=()=>{
        setGroupId(props.data2.id)
        axios.get('http://localhost:8080/api/v1.0.0/message/group/get/deletedMessages/'+props.data2.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res => {
                setData(res.data)
                isDone(true)
            })

            .catch(e => {
                isDone(false)
            })
    }

    useEffect(()=>{
        fetch()
    },[props.data2.id])

    return(
        <div>
            <Dialog open={open} onClose={()=>{setOpen(false)}}>
                <DialogTitle>
                    Deleted Messages
                </DialogTitle>
                <DialogContent>
                    {
                        !isDone?(
                            <div>
                                You are not allowed to see deleted messages
                            </div>
                        ):(
                            <List>
                                {
                                    data && data.map(d=>{
                                        return(
                                            <ListItem>
                                                <ListItemAvatar>
                                                    <Avatar>
                                                        !
                                                    </Avatar>
                                                </ListItemAvatar>
                                                <ListItemText primary={d.MSG} secondary={'deleted by sender(s)'}/>
                                            </ListItem>

                                        )
                                    })
                                }
                            </List>
                        )
                    }
                </DialogContent>
            </Dialog>
            <AutoDeleteIcon onClick={()=>{
                setOpen(true);
                fetch()
            }} style={{color:'#0090ff',float:'right',marginLeft:'auto',cursor:'pointer'}}/>
        </div>
    )
}

const GroupMembers=props=>{
    const removeClick=(u)=> {
        console.log(u)
        var newData = {
            groupId: props.groupData.id,
            userId: u.ID,
            userName:u.NAME,
            userImage:u.IMAGE
        }
        axios.post('http://localhost:8080/api/v1.0.0/group/remove', newData, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res => {
                showToast("User successfully removed");
            })

            .catch(e => {
                showToast("You cannot remove members");
            })
    }
    return(
        <List>
            {
                props.members.map(m=>{

                    return(
                        <ListItem
                            secondaryAction={
                                <IconButton onClick={()=>{removeClick(m)}} edge="end" aria-label="delete">
                                    <PersonRemoveIcon style={{color:'#dd0000'}} />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={m.IMAGE}>
                                    {m.NAME.substr(0,1)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={m.NAME}
                                secondary={`Joined on ${new Date(m.TIMESTAMP*1000).toDateString()}`}
                            />
                        </ListItem>
                    )
                })
            }
        </List>
    )
}

const GroupOthers=props=>{

    const addClick=(u)=> {
        var newData = {
            groupId: props.groupData.id,
            userId: u.id,
            userName:u.name,
            userImage:u.image
        }
        axios.post('http://localhost:8080/api/v1.0.0/group/add', newData, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res => {
                showToast("User successfully added");
            })

            .catch(e => {
                showToast("Error occured");
            })
    }


    if(props.others)
    return(
        <List>
            {
                props.others.map(m=>{
                    if(m!==null)
                    return(
                        <ListItem
                            secondaryAction={
                                <IconButton onClick={()=>{addClick(m)}} edge="end" aria-label="delete">
                                    <PersonAddAltIcon style={{color:'#0090ff'}} />
                                </IconButton>
                            }
                        >
                            <ListItemAvatar>
                                <Avatar src={m.image}>
                                    {m.name.substr(0,1)}
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                                primary={m.name}
                                secondary={`Hello There`}
                            />
                        </ListItem>
                    )
                })
            }
        </List>
    )
    return(
        <div/>
    )
}

MessagesNew.propTypes = {
    window: PropTypes.func,
};

export default MessagesNew
export {socket}
