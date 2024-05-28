import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Youtubelogo from './YoutubeLogo.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const router = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    appType: 'ott'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const checkpassword=(str)=>{
    let specialChar;
    let upperCase;
    let lowerCase;
    let numbers;
    for(let i=0;i<str.length;i++){
      if(str[i]>='A' && str[i]<='Z'){
        upperCase++;
      }else if(str[i]>='a' && str[i]<='z'){
        lowerCase++;
      }else if(str[i]>='0' && str[i]<='9'){
        numbers++;
      }else if('!@#$%^&*'.includes(str[i])){
        specialChar++;
      }
    }
    if(specialChar>0 && upperCase>0 && lowerCase>0 && numbers>0){
      return true;
    }
    else{
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://academics.newtonschool.co/api/v1/user/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'projectID': 'elpdupuc4cvs',
          'accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.status === "fail") {
        toast.error(data.message, {
          theme: "dark"
        })
      } else {
        if(checkpassword(formData.password)){
          toast.success("Account created Successfully!", {
            theme: "dark"
          })
        }else{
          toast.error("Please input correct Characters",{
            theme:'dark'
          })
        }
        router("/signin");
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <nav className="bg-black text-white py-3 px-5 flex justify-between items-center">
        <img src={Youtubelogo} className="h-12 cursor-pointer" alt="YouTube Logo" onClick={() => { router("/") }} />
        <div className="right">
          <button className="py-2 px-4 bg-red-600 text-white cursor-pointer hover:bg-white hover:text-black" onClick={() => { router("/signin") }}>Sign In</button>
        </div>
      </nav>

      <div className="flex justify-center items-center min-h-screen bg-black">
        <form className="max-w-md w-full p-10 rounded-lg bg-gray-600 text-white" onSubmit={handleSubmit}>
          <h1 className="text-center mb-6 text-2xl">Sign Up</h1>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          />
          <button type="submit" className="w-full p-2 rounded bg-red-600 text-white hover:bg-red-500">Sign Up</button>
          <span className="text-gray-100">Already have an account?</span> <Link to="/signin" className="text-red-600">Sign in here.</Link>
        </form>
      </div>
    </>
  );
};

export default Signup;
