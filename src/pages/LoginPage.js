'use-client'

import { AuthContext } from "@/services/AuthContext";
import Image from "next/image"
import { useContext, useState } from "react"

export default function LoginPage() {
    const [username,setUsername] = useState("");
    const [password, setPassword] = useState("");
    const {userLogin} = useContext(AuthContext);




    return (
        <div className="flex justify-center w-screen">
            <img className="absolute top-0 left-0 w-screen h-full" src={'/static/bglogin2.jpg'} alt="Login background" />
            <div className="relative w-screen h-fit  flex flex-1">
                <div className=" w-1/3 h-screen bg-mainSubColor/50 rounded-sm">
                    <p className="text-center text-2xl font-bold pt-10">Sign In</p>
                    <div className="flex items-center justify-center mt-8">
                        <p className="pr-3">Username</p>
                        <input value={username} onChange={(event)=>setUsername(event.target.value)} className="ps-2 h-10 border w-1/2 rounded-md" placeholder="Username" />
                    </div>
                    <div className="flex items-center justify-center mt-2">
                    <p className="pr-3">Password</p>
                    <input value={password} onChange={(event)=>setPassword(event.target.value)} className="ps-2 h-10 border w-1/2 rounded-md" placeholder="Password" />
                    </div>
                    <div className="flex justify-center mt-6">
                    <button onClick={()=> userLogin(username,password)} className="bg-mainColor hover:font-bold text-white px-4 py-2 rounded-md">Sign In</button>
                    </div>
                    <div className="h-6"></div>
                </div>
            </div>
        </div>

    )
}