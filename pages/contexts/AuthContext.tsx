import { createContext, Dispatch, ReactNode, SetStateAction, useEffect, useState } from "react";
import apiService from "../api/apiService";

export interface AuthContextProviderProps{
  children:ReactNode
}
interface AuthContextProps  {
  teacherList: string[],
  setTeacherList:Dispatch<SetStateAction<never[]>> | string[],
  studentList: string[],
  studentNameText: string,
  setStudentList: Dispatch<SetStateAction<never[]>> | string[],
  oldText: number,
  classText:number,
  cityText: string,
  setCityText: Dispatch<SetStateAction<string>> | any,
  setStudentNameText: Dispatch<SetStateAction<string>>  |any,
  setOldText: Dispatch<SetStateAction<number>> | any,
  setclassText: Dispatch<SetStateAction<number>> | any,
}

const authContextProps: AuthContextProps = {
  teacherList: [],
  studentList: [],
  setTeacherList:[],
  setStudentList: [],
  studentNameText: "",
  oldText: 0,
  classText:0,
  cityText: "",
  setCityText:"",
  setStudentNameText:"",
  setOldText: 0,
  setclassText: 0,
}

const AuthContext = createContext<AuthContextProps>(authContextProps);

function AuthProvider({ children }:AuthContextProviderProps) {
  const [studentList, setStudentList] = useState([])
  const [teacherList, setTeacherList] = useState([])
  const [studentNameText, setStudentNameText] = useState("")
  const [oldText, setOldText] = useState(0)
  const [classText, setclassText] = useState(0)
  const [cityText, setCityText] = useState("")
  
  useEffect(() => {
    async function dataApi () {
      const response = await apiService.get("https://62d6208f15ad24cbf2d1187f.mockapi.io/api/students")
      setStudentList(response.data)
    } 
    dataApi() 
   }, [])
   useEffect(() => {
    async function dataApi () {
      const response = await apiService.get("https://62d6208f15ad24cbf2d1187f.mockapi.io/api/teachers")
      setTeacherList(response.data)
    } 
    dataApi() 
   }, [])


  return (
    <AuthContext.Provider value={{
      studentList,
      setStudentList, 
      studentNameText,
      oldText,
      classText,
      cityText,
      setCityText,
      setclassText,
      setOldText,
      setStudentNameText,
      teacherList,
      setTeacherList
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthProvider };
