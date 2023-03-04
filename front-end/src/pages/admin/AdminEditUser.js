
import AdminEditUserComponent from "./components/AdminEditUserComponent";
import axios from "axios";

export default function AdminEditUser() {
  
  const GetUser = async(id)=>{
    const {data} = await axios.get(`/api/users/${id}`)
    return data
  }

  const UpdateUser = async(id,isAdmin)=>{
    await axios.put(`/api/users/editByAdmin/${id}`,{admin:isAdmin})
  }

  return (<AdminEditUserComponent  GetUser={GetUser} UpdateUser={UpdateUser}/>);
}

