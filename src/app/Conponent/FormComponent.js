import React, { useEffect, useState } from 'react'
import { insertTodolist } from '../Service/authService';

export default function FormComponent({ saveTodo }) {
  const [formData, setFormData] = useState({
    todolist_detail: '',
    todolist_name: '',
    todolist_type: 1,
    user_id: '',
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "todolist_type") {
      setFormData({
        ...formData,
        [name]: Number(value)
      });
    } else {
      setFormData({ ...formData, [name]: value })
    }
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
      const todolistData = await insertTodolist(formData);
      console.log("Test Todolist Data : ", todolistData)
      saveTodo();
    } catch (e) {
      console.log("Error : ", e)
    }
  }

  const handleCancel = async () => {
    saveTodo();
  }

  return (
    <div className='flex flex-col'>
      <div className='flex justify-center items-center my-4'>
        <h1 className='text-4xl font-bold'>New Todo</h1>
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className='my-2'>
          <label>Todolist Name</label>
          <input type="text" className='w-full h-10 border-2 p-1' onChange={handleChange} name='todolist_name' />
        </div>
        <div className='my-2'>
          <label>Priority</label>
          <select id="cars" name="todolist_type" className='w-full flex p-2 border-2' onChange={handleChange}>
            <option value="1">Normal</option>
            <option value="2">High</option>
          </select>
        </div>
        <div className='my-2'>
          <label>Todolist Detail</label>
          <textarea type="text" className='w-full h-20 border-2 resize-none p-1' onChange={handleChange} name='todolist_detail'></textarea>
        </div>
        <button type='submit' className='px-7 py-1 rounded-md bg-green-400 mx-1'>Save</button>
        <button className='px-5 py-1 rounded-md bg-red-400 mx-1' onClick={handleCancel}>Cancel</button>
      </form>
    </div>
  )
}
