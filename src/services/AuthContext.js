'use client'

import { axiosInstance } from "@/utils/axios";
import { createContext, useContext, useState } from "react"
import { useNavigate } from "react-router-dom";

export const AuthContext =createContext(); 

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user,setUser] = useState({});

    const userLogout = () => {
        setUser({})
        setIsLoggedIn(false);
    }

    const userLogin = async (username,password) => {
        const data = {
            username:username,
            userPassword:password
        }
        console.log(data)
        const res = await axiosInstance.post('/user/sign-in-admin.php',data);
        console.log(res.data.data)
        if (res.data.response_code == 1) {
            setUser(res.data.data);
            setIsLoggedIn(true)
        }
    }
    return(
    <AuthContext.Provider value={{ userLogout, userLogin,isLoggedIn,user }}>
        {children}
    </AuthContext.Provider>)
}
