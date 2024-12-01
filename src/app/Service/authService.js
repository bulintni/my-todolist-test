import axios from "axios";
import Cookies from "js-cookie";

const HASURA_API_URL = "https://skilled-escargot-51.hasura.app/api/rest/login";
const HASURA_API_GET_TODOLIST = "https://skilled-escargot-51.hasura.app/api/rest/todolist_detail"
const HASURA_API_INSERT_TODOLIST = "https://skilled-escargot-51.hasura.app/api/rest/todolist_detail"
const HASURA_API_INSERT_REGISTER = "https://skilled-escargot-51.hasura.app/api/rest/user_data"
const HASURA_API_UPDATE_TODOLIST = "https://skilled-escargot-51.hasura.app/api/rest/todolist_detail/"
const HASURA_API_KEY = "tGja0UlnGtRcB9CWhQBiWhES8Gf8ueXq3e3SuVHwHUgBn5V35xHF50QVGpTrSJ0v";

// ฟังก์ชันสำหรับ Login
export const login = async (username, password) => {
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
    return data.user_data.length > 0 ? data.user_data[0] : null; // คืนค่าผู้ใช้ที่เจอ หรือ null
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const setUserCookie = (user, expiresInMinutes) => {
  const expires = new Date(new Date().getTime() + expiresInMinutes * 60 * 1000); // เวลา Cookie หมดอายุ
  const encodedUser = encodeURIComponent(JSON.stringify(user));
  Cookies.set("user", encodedUser, { expires });
};

// ดึงข้อมูลผู้ใช้จาก Cookie
export const getUserCookie = () => {
  const encodedCookie = Cookies.get("user"); // ดึงค่าจาก Cookie
  if (encodedCookie) {
    try {
      return JSON.parse(decodeURIComponent(encodedCookie)); // Decode และแปลงเป็น Object
    } catch (error) {
      console.error("Error decoding cookie:", error);
      return null;
    }
  }
  return null;
};

// ลบ Cookie เมื่อผู้ใช้ Logout
export const removeUserCookie = () => {
  Cookies.remove("user");
};

export const getTodolist = async (user_id) => {
  console.log("PAYLOAD user_id : ", user_id)
  try {
    const response = await axios.get(HASURA_API_GET_TODOLIST, {
      params: { user_id },  // ส่ง user_id ผ่าน params
      headers: {
        "x-hasura-admin-secret": HASURA_API_KEY,
        "Content-Type": "application/json",
      },
    });
    const data = response.data;
    return data //Data Final
  } catch (error) {
    console.error("Login Error:", error);
    throw new Error("Login failed. Please check your credentials.");
  }
};

export const insertTodolist = async (todolistData) => {
  console.log("PAYLOAD TodolistData : ", todolistData);

  try {
    const response = await axios.post(
      HASURA_API_INSERT_TODOLIST, // URL ของ REST API ที่ใช้
      { object: todolistData }, // Payload (ข้อมูลที่ส่ง)
      {
        headers: {
          "x-hasura-admin-secret": HASURA_API_KEY, // Authentication Key
          "Content-Type": "application/json", // แจ้งว่า payload เป็น JSON
        },
      }
    );

    const data = response.data;
    return data; // คืนค่าผลลัพธ์ที่ได้จาก API
  } catch (error) {
    console.error("Insert Todolist Error:", error.response?.data || error);
    throw new Error("Failed to insert todolist. Please try again.");
  }
};

export const onRegisterApi = async (registerData) => {
  console.log("PAYLOAD TodolistData : ", registerData);

  try {
    const response = await axios.post(
      HASURA_API_INSERT_REGISTER, // URL ของ REST API ที่ใช้
      { object: registerData }, // Payload (ข้อมูลที่ส่ง)
      {
        headers: {
          "x-hasura-admin-secret": HASURA_API_KEY, // Authentication Key
          "Content-Type": "application/json", // แจ้งว่า payload เป็น JSON
        },
      }
    );

    const data = response.data;
    return data; // คืนค่าผลลัพธ์ที่ได้จาก API
  } catch (error) {
    console.error("Insert Todolist Error:", error.response?.data || error);
    throw new Error("Failed to insert todolist. Please try again.");
  }
};

export const updateTodolist = async (dataUpdate, todolist_id) => {
  console.log("PAYLOAD TodolistData : ", dataUpdate);

  try {
    const url = `https://skilled-escargot-51.hasura.app/api/rest/todolist_detail/${todolist_id}`
    console.log(url)

    const response = await axios.post(
      url, // URL ของ REST API ที่ใช้
      { object: dataUpdate }, // Payload (ข้อมูลที่ส่ง)
      {
        headers: {
          "x-hasura-admin-secret": HASURA_API_KEY, // Authentication Key
          "Content-Type": "application/json", // แจ้งว่า payload เป็น JSON
        },
      }
    );

    const data = response.data;
    return data; // คืนค่าผลลัพธ์ที่ได้จาก API
  } catch (error) {
    console.error("Insert Todolist Error:", error.response?.data || error);
    throw new Error("Failed to insert todolist. Please try again.");
  }
};

export const doneTodolistApi = async (todolist_id, todolistType) => {
  console.log("Done Todo!!")
  console.log("Done Todo!! : ", todolistType)
  console.log("Done Todo!! : ", todolist_id)
  try {
    const url = `https://skilled-escargot-51.hasura.app/api/rest/updateTodo_Done/${todolist_id}`
    console.log(url)

    const response = await axios.post(
      url, // URL ของ REST API ที่ใช้
      { 
        todolist_type: todolistType
      }, // Payload (ข้อมูลที่ส่ง)
      {
        headers: {
          "x-hasura-admin-secret": HASURA_API_KEY, // Authentication Key
          "Content-Type": "application/json", // แจ้งว่า payload เป็น JSON
        },
      }
    );

    const data = response.data;
    return data; // คืนค่าผลลัพธ์ที่ได้จาก API
  } catch (error) {
    console.error("Insert Todolist Error:", error.response?.data || error);
    throw new Error("Failed to insert todolist. Please try again.");
  }
};