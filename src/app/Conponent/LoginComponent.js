import React, { useState, useEffect } from 'react'
import { login } from '../Service/authService';
import { setUserCookie, getUserCookie, removeUserCookie } from '../Service/authService';


export default function LoginComponent({ onLogin, onRegister }) {

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userCookie, setUserCookie] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const existingUser = getUserCookie();
    if (existingUser) {
      setIsLoggedIn(true);
      setUserCookie(existingUser);
      console.log(userCookie)
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value })
  }

  const toRegister = () => {
    onRegister();
  }

  const handleSubmit = async (e) => {

    e.preventDefault();
    // setError(""); // รีเซ็ตข้อผิดพลาด
    try {
      const user = await login(formData.username, formData.password);
      console.log("Test user for login", user)
      if (user) {
        console.log("Login successful:", user);
        await setUserCookie(user, 30);
        localStorage.setItem('user', JSON.stringify(user));
        onLogin();
      } else if (user === null){
        setError("Invalid username or password");
        alert("Invalid username or password");
        console.log(error) // แสดงข้อผิดพลาด
      }

      if (userCookie) {
        console.log("Run Cookie!!")
        onLogin();
      }

    } catch (err) {
      setError(err.message); // แสดงข้อผิดพลาดที่มาจาก server
    }
    // console.log('formData username : ', formData.username, 'formData password', formData.password)
    // e.preventDefault();
  }
  return (
    <div>
      <div className="flex py-14 mx-14 justify-center bg-white border-b-2 border-dashed">
        <h1 className="bg-white text-4xl font-bold">Todolist-Login</h1>
      </div>

      <div className="mx-12 my-5">
        <form action="" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="" className="font-bold text-xl">Username</label>
            <input type="text" id='username' name='username' value={formData.username} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label htmlFor="" className="font-bold text-xl">Password</label>
            <input type="password" id='password' name='password' value={formData.password} onChange={handleChange} required className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"> Login </button>
        </form>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded hover:bg-green-600 mt-2" onClick={toRegister}> Register </button>
      </div>
    </div>
  )
}
