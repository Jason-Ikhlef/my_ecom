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
        console.log(user)
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
    
    const logout = () => {
        googleLogout();
        setProfile(null);
    }

    return (
        <div>
                <h2>React Google Login</h2>
                <br />
                <br />
                {profile ? (
                    <div>
                        <img src={profile.picture} alt="user image" />
                        <h3>User Logged in</h3>
                        <p>Name: {profile.name}</p>
                        <p>Email Address: {profile.email}</p>
                        <br />
                        <br />
                        <button onClick={logout}>Log out</button>
                    </div>
                ) : (
                    <button onClick={() => login()}>Sign in with Google 🚀 </button>
                )}
            </div>
    )
}