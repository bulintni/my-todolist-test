"use client"
import Image from "next/image";
import { DataProvider } from "./Context/Datacontext";
import { useState } from "react";
import LoginComponent from "./Conponent/LoginComponent";
import DashboardComponent from "./Conponent/DashboardComponent";
import { removeUserCookie } from "./Service/authService";
import RegisterForm from "./Conponent/RegisterForm";

export default function Home() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [btnLogout, setBtnLogout] = useState(false)
  const [pageState, setPageState] = useState(1)

  const handleLogin = () => {
    setPageState(2)
    setBtnLogout(true)
  };

  const handleLogout = async () => {
    await removeUserCookie();
    await localStorage.removeItem('user');
    setPageState(1)
    setBtnLogout(false)
  }

  const handleRegister = async () => {
    setPageState(3)
  }

  const handleToLogin = async () => {
    setPageState(1)
  }

  return (
    <DataProvider>
      <div className="flex h-[100vh] justify-center items-center flex-col">
        <div className="border-2 w-[500px] h-[800px] shadow-sm bg-white">
          {pageState === 1 && (
            <LoginComponent onLogin={handleLogin} onRegister={handleRegister}/>
          )}
          {pageState === 2 && (
            <DashboardComponent />
          )}
          {pageState === 3 && (
            <RegisterForm onToLogin={handleToLogin}/>
          )}
        </div>
        {btnLogout ? (
          <div className="flex items-end justify-end w-[500px] mt-3">
            <button onClick={handleLogout} className="bg-red-300 px-3 rounded-md text-md text-gray-100">Logout</button>
          </div>
        ) : (null)}
      </div>
    </DataProvider>
  );
}
