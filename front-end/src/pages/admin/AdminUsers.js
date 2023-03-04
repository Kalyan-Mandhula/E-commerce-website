import AdminUsersComponent from "./components/AdminUsersComponent";
import axios from "axios"



function AdminUsers() {

    const FetchUsers = async(abrtctrl)=>{
        const {data} = await axios.get("/api/users",{signal:abrtctrl.signal})
        return data
    }

    const DeleteUser = async (id) => {
        const { data } = await axios.delete(`/api/users/deleteUser/${id}`);
        return data
    }
    
  return (<AdminUsersComponent FetchUsers={FetchUsers} DeleteUser={DeleteUser} />);
}

export default AdminUsers;