"use client"
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
  const date = new Date();
  const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  const [state] = useState('')
  const [pageState, setPageState] = useState(1);

  const currentDate = {
    dayOfWeek: weekdays[date.getDay()],
    dayOfMonth: date.getDate(),
    month: months[date.getMonth()],
    year: date.getFullYear(), 
  };

  const [editData, setEditData] = useState({})
  const handleNewTask = () => setPageState(2);
  const handleSaveForm = () => setPageState(1);
  const handleEditForm = () => setPageState(3);


  return (
    <DataContext.Provider value={{state, currentDate, editData, setEditData, handleNewTask, handleSaveForm, handleEditForm, pageState}}>
      {children}
    </DataContext.Provider>
  )
}

export const useDataContext = () => {
  return useContext(DataContext)
}

