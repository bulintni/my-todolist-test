"use client"
import { createContext, useState, useContext } from "react";
import axios from "axios";

const AuthContext = createContext();

const HASURA_API_URL = "https://skilled-escargot-51.hasura.app/api/rest/login";
const HASURA_API_KEY = "your-hasura-admin-secret";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // เก็บข้อมูลผู้ใช้

  const login = async (username, password) => {
    try {
      const response = await axios.post(
        HASURA_API_URL,
        { username, password },
        {
          headers: {
            "x-hasura-admin-secret": HASURA_API_KEY,
            "Content-Type": "application/json",
          },
        }
      );
      const data = response.data;
      if (data.user_data.length > 0) {
        setUser(data.user_data[0]); // ตั้งค่าผู้ใช้ที่เข้าสู่ระบบ
        return data.user_data[0];
      } else {
        throw new Error("Invalid username or password");
      }
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook สำหรับใช้ Context
export const useAuth = () => useContext(AuthContext);