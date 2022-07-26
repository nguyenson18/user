import { createContext, useReducer, useEffect, useState, Dispatch, SetStateAction } from "react";
import { AuthContextProviderProps } from "./AuthContext";

const initalState ={
    isAuthenticated: false,
    userName:"",
    setUserName: () => null,
    login: ()=> null,
    logout: ()=> null,
    register:()=> null,
    loginErrors: () => null
}
interface initalStateProps {
    login: ({ username, password }: any, cb: () => void) => void ;
    logout: (cb: any) => void;
    register: ({ username, password, email }: any, cb: any) => void;
    loginErrors: (cb: any) => void;
    userName:string;
    setUserName:(value: React.SetStateAction<string>) => void;
}
const LoginContext = createContext<initalStateProps>(initalState);

function LoginProvider({ children }:AuthContextProviderProps) {
    const [userName, setUserName] = useState<string>("")
  const login = ({username, password}:any, cb:()=> void) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    cb();
  };

  const logout = (cb:any) => {
    cb();
  };
  const loginErrors = (cb:any)=>{
  }
  const register = ({username, password, email}:any, cb:any) => {
    localStorage.setItem("username", username);
    localStorage.setItem("password", password);
    localStorage.setItem("email", email)
    cb();
  } 
  
  return (
    <LoginContext.Provider value={{login, logout, register,loginErrors, userName, setUserName}}>
      {children}
    </LoginContext.Provider>
  );
}

export { LoginContext, LoginProvider };