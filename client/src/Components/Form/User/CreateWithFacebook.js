import React from "react";
import axios from "axios";
import FacebookLogin from 'react-facebook-login';

export default function CreateWithFacebook() {
    
        const [user, setUser] = useState([]);
        const [profile, setProfile] = useState([]);
        const [isLoggedIn, setIsLoggedIn] = useState(false);
    
        const responseFacebook = (response) => {
            console.log(response);
            setUser(response);
            setIsLoggedIn(true);
        }
    
        useEffect(() => {
            if (user.accessToken) {
                axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.accessToken}`, {
                    headers: {
                        Authorization: `Bearer ${user.accessToken}`,
                        Accept: 'application/json'
                    }
                })
                    .then(res => setProfile(res.data))
                    .catch(err => console.log(err))
            }
        }, [user])
    
        function SendToDatabase() {
            axios.post('http://localhost:8000/createUser', profile)
                .then(res => console.log(res))
                .catch(err => console.log(err))
        }
        if (profile) {
            SendToDatabase();
        }
    
        const logout = () => {
            googleLogout();
            setProfile(null);
        }
    
        console.log(profile);
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