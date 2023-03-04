
import Chat from "./Chat"
import { Outlet } from "react-router-dom"

export default function DisplayChat(){
    return <>
    <Chat /><Outlet/>
    </>
}