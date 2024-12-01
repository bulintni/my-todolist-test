import React, { useState } from 'react'
import { useDataContext } from '../Context/Datacontext'
import { faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TodolistCards from './TodolistCards';
import TodolistPage from './TodolistPage';
import FormComponent from './FormComponent';
import EditFormComponent from './EditFormComponent';

export default function DashboardComponent() {
  const { currentDate, pageState, handleNewTask, handleSaveForm, handleEditForm } = useDataContext();
  // const [pageState, setPageState] = useState(1)

  // const handleNewTask = () => {
  //   setPageState(2)
  // }

  // const handleSaveForm = () => {
  //   setPageState(1)
  // }

  // const handleEditForm = () => {
  //   setPageState(3)
  // }

  return (
    <div className='p-10'>
      <div className='flex justify-between items-center border-b-2 border-dashed pb-7'>
        <div className='flex items-center justify-center'>
          <h1 className='font-semibold text-5xl pr-3'>{currentDate.dayOfMonth}</h1>
          <div className='text-sm'>
            <p>{currentDate.dayOfWeek}</p>
            <p>{currentDate.month} {currentDate.year}</p>
          </div>
        </div>
        {
          pageState === 1 && (
            <button className='flex justify-center items-center' onClick={handleNewTask}>
              <FontAwesomeIcon icon={faCirclePlus} size='2x' className='mr-2 text-pink-500' />
              <p className='font-bold'>NEW TASK</p>
            </button>
          )
        }
      </div>
      <div>
        {pageState === 1 && (
          <TodolistPage toEditForm={handleEditForm} />
        )}
        {pageState === 2 && (
          <FormComponent saveTodo={handleSaveForm} />
        )}
        {pageState === 3 && (
          <EditFormComponent />
        )}
      </div>
    </div>
  )
}
