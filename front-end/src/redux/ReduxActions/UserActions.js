import axios from "axios"
const UserLogin = (UserDetails)=>(dispatch)=>{
    dispatch({
        type : "Login_User" ,
        payload : UserDetails
    })
}

export  const UserLogout =()=>(dispatch)=>{
    window.location.href ="/login"
    axios.get("/api/logout")
    localStorage.removeItem("User")
    sessionStorage.removeItem("User")
    localStorage.removeItem("cart")
    dispatch({
        type :"Logout_User"
    })
}




export default UserLogin
