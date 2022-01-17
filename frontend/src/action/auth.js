import axios from 'axios'
import Cookies from 'universal-cookie';
import {api_base_url} from "../index";

import {setLoading,showToast} from "../App";
const cookies = new Cookies();

const COOKIE_AGE=31536000

export const checkAuth=(dispatcher)=>{
    if(cookies.get('token')==undefined || cookies.get('token')==null)
        dispatcher(logoutDispatch())
    else
        dispatcher(loginDispatch())
}

export const login=(data,dispatcher)=>{
    dispatcher(loadingDispatch())
    axios.post(api_base_url+'auth/login',data).then(res=>{  //dummy URL currently
        cookies.set('token',res.data.access_token,{ path: '/', maxAge: COOKIE_AGE }) //setting token
        checkAuth(dispatcher)
        console.log(res.data)
       
    }).catch(err=>{
        console.log(err)
        switch(err.response.status){
            case 404:
                showToast('No user exists with this email')
                break
            case 401:
                showToast('Invalid password')
                break
            case 500:
                showToast('Internal server error')
                break
            default:
                showToast('Connectvity problem')
        }
        checkAuth(dispatcher)
    })
}

export const register=(data,dispatcher)=> {
    dispatcher(loadingDispatch())

    console.log(data)
    axios.post(api_base_url+'auth/reg',data).then(res=>{  
        console.log(res.data)
       
        checkAuth(dispatcher)
showToast("Successfully registered");
    }).catch(err=>{
console.log(err)
        switch(err.response.status){
            case 409:
                showToast('User already exists')
                break
            case 500:
                showToast('Internal server error')
                break
            default:
                showToast('Connectvity problem')
        }
        checkAuth(dispatcher)
    })
}





export const logout=(dispatcher)=>{
 
    cookies.remove('token',{ path: '/' })
    checkAuth(dispatcher)
}



const loginDispatch=()=>{
    return {
        type:'SIGNED_IN'
    }
}
const logoutDispatch=()=>{
    return {
        type:'SIGNED_OUT'
    }
}
const loadingDispatch=()=>{
    return {
        type:'AUTH_LOADING'
    }
}
