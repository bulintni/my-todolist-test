import React, { useEffect, useState } from 'react'
import TodolistCards from './TodolistCards'
import { getTodolist } from '../Service/authService'

export default function TodolistPage(toEditForm) {
  const [todolist, setTodolist] = useState([]);
  const fetchTodolist = async () => {
    const userData = JSON.parse(localStorage.getItem('user'));
    console.log("UserData : ", userData)
    try{
      const response = await getTodolist(userData.user_id);
      await setTodolist(response.todolist_detail);
    } catch (e) {
      console.log(e)
    }
  }

  useEffect(() => {
    fetchTodolist();
  },[])

  useEffect(() => {
    if (todolist) {
      console.log("TODOLIST RESPONSE : ", todolist);
    }
  }, [todolist]);

  return (
    <div className='flex justify-center items-center py-5 flex-col gap-3'>
      <div className='flex justify-center items-center flex-col gap-3 w-full border-b-2 border-dashed pb-5 max-h-[400px] overflow-y-auto hide-scrollbar'>
        <h1 className='font-bold text-2xl'>TODO TASKS</h1>
        <div className='flex flex-col gap-3 w-full max-h-[500px] overflow-y-auto hide-scrollbar'>
          {todolist.map((item, index)=> {
            if(item.todolist_type >= 1) {
              return <TodolistCards todolistdata={item} key={index}/>
            } else {
              return null;
            }
          })}
        </div>
        <p className='text-xs text-red-500'>** Tab todolist card for edit</p>
      </div>

      <div className='flex justify-center items-center flex-col gap-3 w-full pb-5 max-h-[200px] overflow-y-auto hide-scrollbar'>
        <h1 className='font-bold text-2xl'>DONE TASKS</h1>
        <div className='flex flex-col gap-3 w-full pb-5 max-h-[220px] overflow-y-auto hide-scrollbar'>
        {todolist.map((item, index)=> {
            if(item.todolist_type === 0) {
              return <TodolistCards todolistdata={item} key={index}/>
            } else {
              return null;
            }
          })}
        </div>
      </div>
    </div>
  )
}
