import { useState, useEffect } from 'react';
import axios from 'axios';

const Shipping = () => {

    const [currentShipping, setCurrentShipping] = useState(null);
    const [shippingLoading, setShippingLoading] = useState(true);

    useEffect(() => {

        const getShippingData = async () => {

            await axios
            .get('http://localhost:8000/get_shipping', { withCredentials: true })
            .then(response => {
                setCurrentShipping(response.data);
                setShippingLoading(false)
            })
            .catch(error => {
                console.log(error);
                setShippingLoading(false)
            });
        }

        getShippingData()
        
    }, []);

    return { currentShipping, shippingLoading };
};

export default Shipping;