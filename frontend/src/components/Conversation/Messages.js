import React, {useEffect, useRef, useState} from 'react'
import {useDispatch} from "react-redux"
import {setLoading, showToast} from "../../App";
import {logout} from "../../action/auth"
import {checkAuth} from "../../action/auth"
import Inboxes from "./Inbox/Inboxes.js"
import "./messages.css"
import Message from "../Message/Message"
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
import { getStorage, ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";



const cookies = new Cookies();


const useStyles = makeStyles({


    root: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center"

    }


})


const Messages = props => {

    const storage = getStorage(app);

    const [imagePreview,setImagePreview]=useState(null)

    const nameRef=useRef()
    const statusRef=useRef()

    const dispatch = useDispatch();

    const dispatcher = useDispatch();
    const classes = useStyles()
    const [chatHeads, setChatHeads] = useState([])
    const [open, setOpen] = useState(false);

    const [profileData, setProfileData] = useState({})
    const [image,setImage]=useState(null)

    useEffect(async () => {
        console.log(app)
        axios.get('http://localhost:8080/api/v1.0.0/users/list', {headers: {authorization: 'Bearer ' + cookies.get('token')}})
            .then(res => {

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

    const handleClose = () => {
        setOpen(false);
    };

    const onImageChange = event => {
        setImage(event.target.files[0])
        var url = URL.createObjectURL(event.target.files[0])
        setImagePreview(url)
    };

    const upload=async ()=>{
        if(nameRef.current.value.trim().length===0)
            showToast('Name cannot be empty')
        else{
            setLoading(true)

            if(image!==null){
                const profileImagesRef = ref(storage, `images/${profileData.id}.${image.name.split('.')[image.name.split('.').length-1]}`);
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
                            var newData={
                                name: nameRef.current.value,
                                status: statusRef.current.value,
                                image: downloadURL
                            }
                            axios.put('http://localhost:8080/api/v1.0.0/user/profile',newData,{headers: {authorization: 'Bearer ' + cookies.get('token')}})
                                .then(res => {
                                    setProfileData({
                                        id:profileData.id,
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
            }else{

                var newData={
                    name: nameRef.current.value,
                    status: statusRef.current.value,
                    image: profileData.image
                }
                axios.put('http://localhost:8080/api/v1.0.0/user/profile',newData,{headers: {authorization: 'Bearer ' + cookies.get('token')}})
                    .then(res => {
                        setProfileData({
                            id:profileData.id,
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
                    <Button onClick={upload} variant="contained" color="primary" component="span" style={{marginLeft: "10px",marginTop:'10px'}}>
                        Update
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
                                    src={profileData.image!==undefined && profileData.image!==null?profileData.image:"https://buet-edu-1.s3.ap-south-1.amazonaws.com/mehrab/venn_icon.png"}

                                    alt=""
                                />
                                <b style={{marginTop: "5px", fontSize: "23px"}}
                                   onClick={handleClick}>{profileData.name}</b>
                            </div>
                            <div className="chatMenuWrapper">

                                <input placeholder="Search for friends" className="chatMenuInput"/>
                                <div style={{marginTop: "20px"}}>
                                    <b style={{fontSize: "20px"}}>Chats</b>
                                </div>

                                {
                                    chatHeads.map(c => {
                                        return (
                                            <Inboxes data={c}/>
                                        )
                                    })
                                }

                            </div>
                        </div>
                        <div className="chatBox">
                            <div className="chatBoxWrapper">
                                <div className="chatBoxTop">
                                    <Message own={false}/>
                                    <Message own={true}/>
                                    <Message own={true}/>
                                    <Message own={false}/>
                                    <Message own={false}/>
                                    <Message own={true}/>
                                    <Message own={true}/>
                                    <Message own={false}/>
                                </div>
                                <div className="chatBoxBottom">
 <textarea
     className="chatMessageInput"
     placeholder="write something..."


 ></textarea>
                                    <button className="chatSubmitButton">
                                        Send
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className="chatOnline">


                            <div className="chatOnlineWrapper">
                                Online
                            </div>
                        </div>

                    </div>)

            }

        </>
    )
}

export default Messages;
