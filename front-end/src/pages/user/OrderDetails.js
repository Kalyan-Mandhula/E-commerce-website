
import axios from "axios";
import OrderDetailsComponent from "./components/OrderDetailsComponent";

const OrderDetails = () => {

  const GetUser = async (userId) => {
    const { data } = await axios.get(`/api/users/${userId}`);
    return data;
  };

  const GetOrder = async(id)=>{
    const {data} = await axios.get(`/api/orders/getOrderById/${id}`)
    return data
  }
  
  
  return (<OrderDetailsComponent GetOrder={GetOrder} GetUser={GetUser}/>);
};

export default OrderDetails;
