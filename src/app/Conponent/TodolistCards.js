import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Done from '@/app/IMG/check.png'
import { useDataContext } from '../Context/Datacontext'

export default function TodolistCards({todolistdata}) {
  const { currentDate, pageState, handleNewTask, handleSaveForm, handleEditForm, setEditData, editData } = useDataContext();
  const [isDone, setIsDone] = useState(false)
  const getPriorityLabel = (todolistType) => {
    if(todolistType === 1) {
      return "NORMAL PRIORITY"
    } else if (todolistType === 2) {
      return "HIGH PRIORITY"
    } else if (todolistType === 0) {
      return "DONE"
    }
  }

  const getClassColorName = (todolistType) => {
    if(todolistType === 1) {
      return "bg-blue-400"
    } else if (todolistType === 2) {
      return "bg-orange-400"
    } else if (todolistType === 0) {
      return "bg-green-400"
    }
  }

  const changeToEdit = async () => {
    handleEditForm();
    await setEditData(todolistdata)
    console.log("todolist Data to context : ",editData);
  }

  useEffect(()=>{
    console.log("Prop Todolist Data : ",todolistdata)
  },[])

  return (
    <div onClick={todolistdata?.todolist_type !== 0 ? changeToEdit : null} className={`w-full h-24 rounded-xl text-white flex justify-between items-center p-5 ${getClassColorName(todolistdata?.todolist_type)}`}>
      <div>
        <p className='text-[10px] font-medium'>{getPriorityLabel(todolistdata?.todolist_type)}</p>
        <h1 className='font-bold text-xl'>{todolistdata?.todolist_name}</h1>
        <p className='text-[10px] font-light'>{todolistdata?.todolist_detail}</p>
      </div>
      <div className='bg-white border-2 w-6 h-6 rounded-full relative'>
        {todolistdata?.todolist_type ===0 ? (
          <Image
          className='absolute right-0 top-1 left-1'
          src={Done}
          height={14}
          alt='About Me 1'
          />
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
