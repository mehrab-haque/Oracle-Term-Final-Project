import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux"
import {setLoading, showToast} from "../../App";
import {logout} from "../../action/auth"
import {checkAuth} from "../../action/auth"
import Inboxes from "./Inbox/Inboxes.js"
import Members from "./Inbox/Members.js"
import Others from "./Inbox/Others.js"
import "./messages.css"
import MessageContainer from "../Message/MessageContainer"
import Navbar from "../Navbar"
import axios from "axios";
import Cookies from 'universal-cookie';
import LinearProgress from '@mui/material/LinearProgress';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import TextField from '@mui/material/TextField';
import {makeStyles} from "@mui/styles"
import DialogContent from "@mui/material/DialogContent";
import Button from '@mui/material/Button';

import {app} from '../../config/firebase_config'
import {getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {sendMessage} from "../../action/messages";

import io from 'socket.io-client'
import {socket_endpoint} from "../../index";
let socket;


const cookies = new Cookies();


const useStyles = makeStyles({


    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    }


})


const Messages = props => {

    const msgRef = useRef()

    const storage = getStorage(app);



    const [imagePreview, setImagePreview] = useState(null)
    const [imagePreview2, setImagePreview2] = useState(null)
    const nameRef = useRef()
    const statusRef = useRef()
    const groupNameRef = useRef()

    const dispatch = useDispatch();

    const dispatcher = useDispatch();
    const classes = useStyles()
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


    useEffect(() => {
        checkAuth(dispatcher);
        console.log(profileData)
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

        setData2(data);
        if (data.type === 1) {
            setState(1);
            axios.get('http://localhost:8080/api/v1.0.0/message/get/' + data.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                .then(res => {
                    setData(res.data);

                })
                .catch(e => console.log(e))
        } else {
            setState(2);
            axios.get('http://localhost:8080/api/v1.0.0/group/getMembers/' + data.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                .then(res => {
                    setMembers(res.data);
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
                    setOthers(v);

                })
                .catch(e => console.log(e))

            axios.get('http://localhost:8080/api/v1.0.0/message/group/get/' + data.id, {headers: {authorization: 'Bearer ' + cookies.get('token')}})
                .then(res => {
                    setData(res.data);

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


    const sendMessageClick = async () => {
        const msgText = msgRef.current.value
        if (msgText.trim().length === 0)
            showToast(`Message can't be empty`)
        else {
            await sendMessage(data2.id, data2.type, msgText)
        }
    }

    const chatHeadsRef=useRef()

    useEffect(()=>{
        chatHeadsRef.current=chatHeads
    },[chatHeads])

    useEffect(async ()=>{
        socket = await io(socket_endpoint);
        socket.emit('token', cookies.get('token'));
        socket.on('message',d=>{

            console.log(chatHeadsRef.current)
            console.log(d)
            var fromInbox
            var prevList=[]
            chatHeadsRef.current.map((a,i)=>{
                if(a.type===2 || (a.type===1 && a.id!==d.from)){
                    prevList.push(a)
                }else{
                    fromInbox=a
                }
            })
            fromInbox['isConnected']=true
            fromInbox['message']={
                own:false,
                seen:false,
                text:d.body,
                timestamp:parseInt(d.timestamp/1000)
            }
            setChatHeads([fromInbox,...prevList])
        })
    },[])


    return (

        <>
            <Navbar/>

            <Dialog onClose={handleClose} open={open}>
                <DialogTitle>Edit Profile</DialogTitle>

                <DialogContent className={classes.root}>
                    <TextField
                        id="outlined-name-input"
                        label="Name"
                        defaultValue={profileData.name ? profileData.name : ''}
                        type="text"
                        inputRef={nameRef}
                        style={{marginTop: '20px'}}
                        autoFocus
                        margin="dense"

                    />

                    <TextField
                        id="outlined-password-input"
                        label="Status"
                        defaultValue={profileData.status ? profileData.status : ''}
                        type="text"
                        inputRef={statusRef}
                        style={{marginTop: '20px'}}
                        autoFocus
                        margin="dense"


                    />
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

                <DialogContent className={classes.root}>
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


            {profileData.name === undefined ? <LinearProgress/>

                : (
                    <div className="messenger">
                        <div className="chatMenu">
                            <div className="self">
                                <img
                                    className="conversationImg"
                                    src={profileData.image !== undefined && profileData.image !== null ? profileData.image : "https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"}

                                    alt=""
                                />
                                <b style={{marginTop: "5px", fontSize: "23px"}}
                                   onClick={handleClick}>{profileData.name}</b>
                                <Button variant="outlined" style={{marginLeft: "40px"}} onClick={handleClick2}>Create
                                    Group</Button>
                            </div>
                            <div className="chatMenuWrapper">

                                <input placeholder="Search for friends" className="chatMenuInput"/>
                                <div style={{marginTop: "20px"}}>
                                    <b style={{fontSize: "20px"}}>Chats</b>

                                </div>

                                {
                                    chatHeads.map((c, i) => {
                                        return (
                                            <div onClick={() => inboxClick(c)}>
                                                <Inboxes key={i} data={c}/>

                                            </div>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className="chatBox">
                            <div className="chatBoxWrapper">

                                {
                                    state === 1 || state === 2 ?
                                        (
                                            <>
                                                <div className="chatBoxTop">
                                                    <div>
                                                        < MessageContainer data={data}/>
                                                    </div>
                                                </div>
                                                <div className="chatBoxBottom">
                                                    <TextField
                                                        inputRef={msgRef}
                                                        fullWidth
                                                        multiline
                                                        rows={2}
                                                        className="chatMessageInput"
                                                        placeholder="write something..."
                                                    ></TextField>
                                                    <button onClick={sendMessageClick} className="chatSubmitButton">
                                                        Send
                                                    </button>
                                                </div>

                                            </>
                                        )
                                        : <p>Open inboxes</p>
                                }


                            </div>

                        </div>


                        <div className="chatOnline">


                            <div className="chatOnlineWrapper">
                                {state == 2 ? <b>Group Members</b> : null}
                                {
                                    state == 2 && members && members.map((c, i) => {
                                        return (
                                            <div>
                                                <Members key={i} data={c} groupData={data2}/>

                                            </div>
                                        )
                                    })
                                }
                                {state == 2 ? <b>Add Members</b> : null}

                                {
                                    state == 2 && others && others.map((o, i) => {
                                        if (o != undefined) {
                                            return (
                                                <div>
                                                    <Others key={i} data={o} groupData={data2}/>

                                                </div>
                                            )
                                        }
                                    })
                                }


                            </div>
                        </div>

                    </div>)

            }

        </>
    )
}

export default Messages;
export {socket}
