import { Outlet , Navigate } from "react-router-dom"
import axios from "axios"
import { useEffect, useState } from "react"
import Login from "../pages/Login"

const CheckLoggedIn =  ({admin})=>{
    
    const [isAuth , setisAuth] = useState()
    const [isAdmin , setisAdmin] = useState()

    useEffect(()=>{
        axios.get("/api/getToken").then((res)=>{
            if(res.data.isAuth){
                setisAdmin(res.data.isAdmin)
                setisAuth(true)
            }    
        }).catch((err)=>console.log(err))
       
    },[isAuth])
  
    if (isAuth === undefined) return <Login/>

    return !isAuth ? <Navigate to="/login"/> : isAuth  ? <><Outlet /></> : 
    isAuth && admin && !isAdmin ? <Navigate to="/"/> : isAuth && admin && isAdmin ? <Outlet/> : <Navigate to="/login"/>

}

export default  CheckLoggedIn



