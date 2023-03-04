import { Nav ,Navbar } from "react-bootstrap"
import { LinkContainer } from "react-router-bootstrap"
import { useDispatch, useSelector } from "react-redux"
import { UserLogout } from "../../redux/ReduxActions/UserActions"

export default function VerticalNav(){
    const dispatch = useDispatch()
    const {socket} = useSelector((state)=>state.chatRooms)
    const Logout = ()=>{
        socket && socket.disconnect()
        dispatch(UserLogout())
    }
    return <><Navbar className='bg-light rounded ps-3' variant="light">
    <Nav defaultActiveKey="/home" className="flex-column">
<LinkContainer to="/admin/orders"><Nav.Link href="/admin/orders">Orders</Nav.Link></LinkContainer>
<LinkContainer to="/admin/admin_products"><Nav.Link href="/admin/admin_products">Products</Nav.Link></LinkContainer>
<LinkContainer to="/admin/chats"><Nav.Link href="/admin/chats">Chats</Nav.Link></LinkContainer>
<LinkContainer to="/admin/users"><Nav.Link href="/admin/users">users</Nav.Link></LinkContainer>
<LinkContainer to="/admin/analysis"><Nav.Link href="/admin/analysis">Analysis</Nav.Link></LinkContainer>
<Nav.Link onClick={()=>Logout()}>logout</Nav.Link>

</Nav></Navbar></>
}