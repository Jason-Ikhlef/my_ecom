import React, {useState, useEffect} from "react";
import axios from "axios";
import FacebookLogin from 'react-facebook-login';

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
                    console.log(res)
                    setTimeout(() => {
                        window.location.href = 'http://localhost:3000'
                    }, 1500)
                })
                .catch(err => console.log(err))
        }
        if (data) {
            SendToDatabase();
        }

        return (
            <div>
                <FacebookLogin
                    appId={593441769370213}
                    autoLoad={false}
                    fields="name, email, picture"
                    scope="public_profile,email"
                    callback={responseFacebook}
                    render={(renderProps) => (
                <button onClick={renderProps.onClick}>This is my custom FB button</button>
                )}
                />
            </div>
        )
    }