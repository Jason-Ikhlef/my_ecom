import { useState, useEffect } from 'react';
import axios from 'axios';

const User = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {

        const getUserData = async () => {

            await axios
            .get('http://localhost:8000/current_user', { withCredentials: true })
            .then(response => {
                setCurrentUser(response.data);
                setUserLoading(false)
            })
            .catch(error => {
                console.log(error);
                setUserLoading(false)
            });
        }

        getUserData()
        
    }, []);

    return { currentUser, userLoading };
};

export default User;