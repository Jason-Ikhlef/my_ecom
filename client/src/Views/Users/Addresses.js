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

  useEffect(() => {
    if (currentUser && addresses.length <= 0) {
      setAddresses(currentUser.data.addresses);
    }
  }, [currentUser, addresses]);

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
        setAddresses(response.data)
        setIsAddingAddress(null);
      })
      .catch((err) => {
        console.log(err);
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
          className="text-center my-4"
        >
          Voir vos adresses
        </p>
        <form
          onSubmit={newAddress}
          className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2"
        >
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
            className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg"
          >
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
          className="text-center my-4"
        >
          Créer une nouvelle adresse
        </p>
        <div className="border flex w-3/4 mx-auto text-center gap-8">
        {addresses.length > 0 &&
          addresses.map((item, index) => (
            <div key={index} className="w-1/4 border cursor-pointer" onClick={() => {setIsUpdatingAddress(item)}}> {/* en cliquant sur la div / la card contenant les infos, ouvre de quoi la modifier */}            
              <p>{item.country}</p>
              <p>{item.city}</p>
              <p>{item.zipcode}</p>
              <p>{item.address}</p>
            </div>
          ))
        }
        </div>
        {
          isUpdatingAddress ? 
          (
            <form
              onSubmit={newAddress}
              className="flex flex-col w-2/4 mx-auto mt-8 border rounded-xl p-2"
            >
            <label htmlFor="country">Votre pays</label>
            <input
              type="text"
              id="country"
              name="country"
              defaultValue={isUpdatingAddress.country}
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
              defaultValue={isUpdatingAddress.city}
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
              defaultValue={isUpdatingAddress.zipcode}
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
              defaultValue={isUpdatingAddress.address}
              onChange={handleChange}
              required
              placeholder="Adresse"
              className="border"
            />
            <button
              type="submit"
              className="mt-5 bg-[#4FBEB7] p-2 mb-2 rounded-lg"
            >
              Créer la nouvelle adresse
            </button>
          </form>
          ) : 
          (null)
        }
      </div>
    ))
  );
}