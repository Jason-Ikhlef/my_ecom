import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {

    const [currentUser, setCurrentUser] = useState(null);
    const [userLoading, setUserLoading] = useState(true);

    useEffect(() => {

        const fetchCurrentUser = async () => {

            await axios
            .get('http://localhost:8000/current_user', { withCredentials: true })
            .then(response => {
                setCurrentUser(response.data);
            })
            .catch(err => {
                console.error(err);
                setCurrentUser(null)
            })
            .finally(() => {
                setUserLoading(false);
            })        
        };

        fetchCurrentUser();

    }, []);

    return { currentUser, userLoading };
};

export default User;
