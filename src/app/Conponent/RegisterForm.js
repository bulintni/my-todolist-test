import React, { useEffect, useState } from 'react'
import { onRegisterApi } from '../Service/authService';

export default function RegisterForm({ onToLogin }) {
  const [formData, setFormData] = useState({
    password: '',
    user_name: '',
  })
  const [passConfirm, setPassConfirm] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  useEffect(() => {
    const storedUser = localStorage.getItem('user'); // Assuming 'user' is the key where you store user data
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser); // Convert string to object
      setFormData((prevData) => ({
        ...prevData,
        user_id: parsedUser.user_id, // Set user_id from localStorage
      }));
    }
    console.log("Data in useEffect : ", formData)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.password === passConfirm) {
        const registerData = await onRegisterApi(formData);
        console.log("Test Todolist Data : ", registerData)
        onToLogin();
        alert("Register Success!!")
      } else {
        alert("Passwords are not the same")
      }
    } catch (e) {
      console.log("Error : ", e)
    }
  }

  const handleComfirm = async (e) => {
    setPassConfirm(e.target.value)
  }

  return (
    <div className='flex flex-col p-10'>
      <div className='flex justify-center items-center my-4'>
        <h1 className='text-4xl font-bold'>Register</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className='my-2'>
          <label>Username</label>
          <input type="text" className='w-full h-10 border-2 p-1' onChange={handleChange} name='user_name' placeholder="Enter your username"/>
        </div>
        <div className='my-2'>
          <label>Password</label>
          <input type="password" className='w-full h-10 border-2 p-1' onChange={handleChange} name='password' placeholder="Enter your password" />
        </div>
        <div className='my-2'>
          <label>Confirm Password</label>
          <input type="password" className='w-full h-10 border-2 p-1' onChange={handleComfirm} placeholder="Enter your password again" />
        </div>
        <button type='submit' className='px-7 py-1 rounded-md bg-green-400 my-2 w-full'>Register</button>
        <button className='px-5 py-1 rounded-md bg-red-400 my-2 w-full'>Cancel</button>
      </form>
    </div>
  )
}
