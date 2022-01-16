import React, {useEffect} from 'react'
import {showToast} from "../App";

const Auth=props=>{

    useEffect(()=>{
       showToast('Hello World')
    },[])

    return(
        <div>
            Hello World
        </div>
    )
}

export default Auth