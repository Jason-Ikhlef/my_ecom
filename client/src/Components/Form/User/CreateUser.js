import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import CreateWithGoogle from './CreateWithGoogle';
// import FacebookLogin from 'react-facebook-login'; 

export default function CreateUser() {
    
  const [form, setForm] = useState({
    email: '',
    password: '',
    admin: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/createUser', form);
      if (response.data === 'success') {
        toast.success('Bienvenue !');
      } else {
        toast.error('Une erreur est survenue');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      toast.error("Une erreur est survenue lors de l'ajout de l'article");
    }
  };

  return (
    <div className='bg-[#C1E1C1] mt-10 w-1/2 mx-auto'>
      <h1 className= 'text-center my-5 bg-[#4FBEB7] p-2'>Créer un compte</h1>
      <div className="w-1/2 mx-auto">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="Email"
            className="border"
          />
          <label htmlFor="password">Mot de passe</label>
          <input
            type="password"
            id="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
            placeholder="Mot de passe"
            className="border"
          />
          <button type="submit" className="mt-5 bg-[#4FBEB7] p-2 mb-2">
            S'enregistrer
          </button>
        </form>

        <div className='bg-gray-200'>
        <CreateWithGoogle />

          {/* <FacebookLogin
            appId="son app id client facebook"
            autoLoad={false}
            fields="name,email,picture"
            callback={handleFacebookResponse}
            onFailure={handleFacebookFailure}
          /> */}
        </div>
      </div>
    </div>
  );
}
