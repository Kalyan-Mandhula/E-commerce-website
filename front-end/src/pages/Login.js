import LoginPageComponent from "./components/LoginPageComponent";
import axios from "axios"

import {useDispatch} from "react-redux"
import UserActions from "../redux/ReduxActions/UserActions";

export default function Login() {

  const UserDispatch = useDispatch()

  const LoginUser = async(email,password,doNotLogout)=>{
      const {data} = await axios.post("/api/users/login",{email,password,doNotLogout})

      if(data.User.doNotLogout){
        localStorage.setItem("User",JSON.stringify(data.User))
      }else{
        sessionStorage.setItem("User",JSON.stringify(data.User))
      }
      return data
  }
  return (<LoginPageComponent LoginUser={LoginUser} UserDispatch={UserDispatch} UserActions={UserActions}/>);
}

