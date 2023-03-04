import RegisterPageComponent from "./components/RegisterPageComponent";
import axios from "axios"


export default function Register() {

  const RegisterUser = async(UserDetails)=>{
      const {data} = await axios.post("/api/users/register",UserDetails)
      return data
  }

  return (<RegisterPageComponent RegisterUser={RegisterUser}/>);
}

