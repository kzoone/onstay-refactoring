import { createContext, useEffect, useState } from "react";

export const LoginContext = createContext();

export function LoginProvider({children}) {
  const [userInfo, setUserInfo] = useState({user_id:null, user_name:null, isAdmin:null});
  const [accessToken, setAccessToken] = useState('')

  const contextValue = {userInfo,setUserInfo,accessToken,setAccessToken}

  return (
    <LoginContext.Provider value={contextValue}>
      {children}
    </LoginContext.Provider>
  );

}