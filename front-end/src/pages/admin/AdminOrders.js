
import AdminOrdersComponent from './components/AdminOrderComponent';
import axios from "axios"

function AdminOrders() {

  const FetchOrders = async()=>{
    const {data} = await axios.get("/api/orders/admin")    
    return data
  }

  return (<AdminOrdersComponent FetchOrders={FetchOrders}/>);
}

export default AdminOrders;