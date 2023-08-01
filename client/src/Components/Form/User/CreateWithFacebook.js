import React, {useState, useEffect} from "react";
import axios from "axios";
import FacebookLogo from "../../../assets/facebook-circle-line.svg";
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function CreateWithFacebook() {
    
        const [login, setLogin] = useState(false);
        const [data, setData] = useState(null);

        // const [picture, setPicture] = useState('');
    
        const responseFacebook = (response) => {
            console.log(response);
            setData(response);
            // setPicture(response.picture.data.url);
            if (response.accessToken) {
              setLogin(true);
            } else {
              setLogin(false);
            }
          }
        
        async function SendToDatabase() {
            await axios
                .post('http://localhost:8000/createFacebook', data, {withCredentials : true})
                .then(res => {
                    toast.success('Bienvenue !')
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3000'
                    }, 1500)
                })
                .catch(err => console.log(err))
        }

        useEffect(() => {

            if (data) 
            {
                SendToDatabase();
            }
        }, [data]);

        return (
            <div>
                <FacebookLogin
                    appId={593441769370213}
                    autoLoad={false}
                    fields="name, email, picture"
                    scope="public_profile,email"
                    callback={responseFacebook}
                    render={(renderProps) => (
                    <div className="w-1/6 mx-auto mt-5 flex bg-blue-400 cursor-pointer px-4 py-2 rounded-3xl gap-8" onClick={renderProps.onClick}>
                        <img src={FacebookLogo} className="w-[30px] h-[30px]" alt="facebook logo"></img>
                        <button>Se connecter avec Facebook</button>
                    </div>
                )}
                />
            </div>
        )
    }