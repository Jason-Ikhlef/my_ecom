import axios from 'axios';

export default function LogOut() {

    axios
    .get('http://localhost:8000/logout', {withCredentials: true})
    .then(() => {
        
        window.location.href = "http://localhost:3000/";
    })
}