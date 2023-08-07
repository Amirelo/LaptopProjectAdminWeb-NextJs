"use-client";

import CustomButton from "@/components/atoms/CustomButton";
import CustomText from "@/components/atoms/CustomText";
import CustomView from "@/components/atoms/CustomView";
import { AuthContext } from "@/services/AuthContext";
import { useContext, useState } from "react";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { userLogin } = useContext(AuthContext);

  return (
      <CustomView color={'none'} type={'row'}>
        <CustomView color={'backgroundInput'} type={"login"}>
          <CustomText textStyle={"header"} textColor={"primary"}>
            Sign In
          </CustomText>
          <div className="flex items-center justify-center mt-8">
            <p className="pr-3">Username</p>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="ps-2 h-10 border w-1/2 rounded-md"
              placeholder="Username"
            />
          </div>
          <div className="flex items-center justify-center mt-2">
            <p className="pr-3">Password</p>
            <input
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="ps-2 h-10 border w-1/2 rounded-md"
              placeholder="Password"
            />
          </div>
          <div className="flex justify-center mt-6">
            <CustomButton
              onClick={() => userLogin(username, password)}
              background={"primary"}
              buttonStyle={"button_main"}
            >
              Sign In
            </CustomButton>
          </div>
          <div className="h-6"></div>
        </CustomView>
        <img className="w-1/2 h-screen object-cover" src="/static/bglogin4.jpg"></img>
      </CustomView>
  );
}
