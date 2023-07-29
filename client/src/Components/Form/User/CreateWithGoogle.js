import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { googleLogout,useGoogleLogin } from '@react-oauth/google';

export default function CreateWithGoogle() {

    const[user,setUser]=useState([]);
    const[profile,setProfile]=useState([]);
    const login = useGoogleLogin({
        onSuccess : (res) =>  setUser(res),
        onError : (err) =>  console.log(err),

    })

    useEffect(() => {
        if(user.access_token){
            axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,{
                headers:{
                    Authorization : `Bearer ${user.access_token}`,
                    Accept : 'application/json'
                }
            })
            .then(res => setProfile(res.data))
            .catch(err => console.log(err))
        }
    }, [user])

    function SendToDatabase(){
        axios.post('http://localhost:8000/create', profile)
        .then(res => console.log(res))
        .catch(err => console.log(err))
    }
    if(profile){
        SendToDatabase();
    }

    console.log(profile);
    return (
        <div className='w-fit mx-auto mt-5'>
            <button onClick={() => login()}>Se connecter avec Google 🚀 </button>
        </div>
    )
}