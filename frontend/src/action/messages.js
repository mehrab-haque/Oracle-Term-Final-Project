import axios from 'axios'
import Cookies from 'universal-cookie';
import {api_base_url} from "../index";

import {setLoading,showToast} from "../App";
const cookies = new Cookies();


export const sendMessage=async (id,type,body,replies,senders,receivers)=>{
    try{
        await axios.post(`${api_base_url}message/send`,{
            to:id,
            type:type,
            body:body,
            replies:replies,
            senders:senders,
            rs:receivers
        },
            {headers: {authorization: 'Bearer ' + cookies.get('token')}})
    }catch (e) {
        console.log(e)
    }
}
