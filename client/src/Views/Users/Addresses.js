import React, { useState, useEffect } from "react";
import axios from "axios";
import User from "../../Components/Widgets/User";
import Loader from "../../Components/Widgets/Loader";

export default function Addresses() {
    const { currentUser, userLoading } = User();
    const [isAddingAddress, setIsAddingAddress] = useState(null);
    const [addresses, setAddresses] = useState([]);
    const [isUpdatingAddress, setIsUpdatingAddress] = useState(null);

    const [form, setForm] = useState({
        country: "",
        city: "",
        zipcode: Number(),
        address: "",
    });

    const [editForm, setEditForm] = useState({
        country: "",
        city: "",
        zipcode: Number(),
        address: "",
    });

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    useEffect(() => {
        if (currentUser && addresses.length <= 0) {
            setAddresses(currentUser.data.addresses);
        }
        if (isUpdatingAddress) {
            setEditForm({
                country: isUpdatingAddress.address.country,
                city: isUpdatingAddress.address.city,
                zipcode: isUpdatingAddress.address.zipcode,
                address: isUpdatingAddress.address.address,
            });
        }
    }, [currentUser, addresses, isUpdatingAddress]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    if (userLoading) {
        return <Loader />;
    }

    const newAddress = async (e) => {
        e.preventDefault();
        await axios
            .post(
                "http://localhost:8000/newAddress",
                { form: form },
                { withCredentials: true }
            )
            .then((response) => {
                setAddresses(response.data);
                setIsAddingAddress(null);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const editAddress = async () => {
        axios
            .put(
                "http://localhost:8000/updateAddress",
                { data: editForm, index: isUpdatingAddress.index },
                { withCredentials: true }
            )
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    return (
        currentUser &&
        (isAddingAddress ? (
            <>
                <p
                    onClick={() => {
                        setIsAddingAddress(null);
                    }}
                    className="text-center my-4 cursor-pointer">
                    Voir vos adresses
                </p>
                <form
                    onSubmit={newAddress}
                    className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2">
                    <label htmlFor="country">Votre pays</label>
                    <input
                        type="text"
                        id="country"
                        name="country"
                        defaultValue={form.country}
                        onChange={handleChange}
                        required
                        placeholder="Pays"
                        className="border"
                    />
                    <label htmlFor="city">Votre ville</label>
                    <input
                        type="text"
                        id="city"
                        name="city"
                        defaultValue={form.city}
                        onChange={handleChange}
                        required
                        placeholder="Ville"
                        className="border"
                    />
                    <label htmlFor="city">Code postal</label>
                    <input
                        type="text"
                        id="zipcode"
                        name="zipcode"
                        defaultValue={form.zipcode}
                        onChange={handleChange}
                        required
                        placeholder="Code postal"
                        className="border"
                    />
                    <label htmlFor="adress">Votre adresse</label>
                    <input
                        type="text"
                        id="address"
                        name="address"
                        defaultValue={form.address}
                        onChange={handleChange}
                        required
                        placeholder="Adresse"
                        className="border"
                    />
                    <button
                        type="submit"
                        className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg">
                        Créer la nouvelle adresse
                    </button>
                </form>
            </>
        ) : (
            <div>
                <p
                    onClick={() => {
                        setIsAddingAddress(true);
                    }}
                    className="text-center my-4 cursor-pointer">
                    Créer une nouvelle adresse
                </p>
                <div className="border flex w-3/4 mx-auto text-center gap-8">
                    {addresses.length > 0 &&
                        addresses.map((item, index) => (
                            <div
                                key={index}
                                className="w-1/4 border cursor-pointer"
                                onClick={() => {
                                    setIsUpdatingAddress({
                                        address: item,
                                        index: index,
                                    });
                                }}>
                                {" "}
                                {/* en cliquant sur la div / la card contenant les infos, ouvre de quoi la modifier */}
                                <p>{item.country}</p>
                                <p>{item.city}</p>
                                <p>{item.zipcode}</p>
                                <p>{item.address}</p>
                            </div>
                        ))}
                </div>
                {isUpdatingAddress ? (
                    <form
                        onSubmit={editAddress}
                        className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2">
                        <label htmlFor="country">Votre pays</label>
                        <input
                            type="text"
                            id="country"
                            name="country"
                            defaultValue={isUpdatingAddress.address.country}
                            onChange={handleEditChange}
                            required
                            placeholder="Pays"
                            className="border"
                        />
                        <label htmlFor="city">Votre ville</label>
                        <input
                            type="text"
                            id="city"
                            name="city"
                            defaultValue={isUpdatingAddress.address.city}
                            onChange={handleEditChange}
                            required
                            placeholder="Ville"
                            className="border"
                        />
                        <label htmlFor="city">Code postal</label>
                        <input
                            type="text"
                            id="zipcode"
                            name="zipcode"
                            defaultValue={isUpdatingAddress.address.zipcode}
                            onChange={handleEditChange}
                            required
                            placeholder="Code postal"
                            className="border"
                        />
                        <label htmlFor="adress">Votre adresse</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            defaultValue={isUpdatingAddress.address.address}
                            onChange={handleEditChange}
                            required
                            placeholder="Adresse"
                            className="border"
                        />
                        <button
                            type="submit"
                            className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg">
                            Créer la nouvelle adresse
                        </button>
                    </form>
                ) : null}
            </div>
        ))
    );
}
