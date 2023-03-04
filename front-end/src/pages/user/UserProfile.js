import axios from "axios";
import UserProfileComponent from "./components/UserProfileComponent";
import { useSelector } from "react-redux";

const UpdateProfile = async(UserDetails)=>{
  const {data} = await axios.put("/api/users/editProfile",UserDetails)
  return data
}

const FetchUser = async(id)=>{
  const {data} = await axios.get(`/api/users/${id}`)
  return data
}


export default function UserProfile() {

  const id = useSelector((state)=>state.user._id)
  return (<UserProfileComponent UpdateProfile={UpdateProfile} FetchUser={FetchUser} id={id}/>);
}

