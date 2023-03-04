import AdminOrderDetailsComponent from "./components/AdminOrderDetailsComponent";
import axios from "axios"

const GetOrder = async(id)=>{
  const {data} = await axios.get(`/api/orders/admin/${id}`)
  return data
}

const OrderedPrductDetails = () => {
  return (<AdminOrderDetailsComponent  GetOrder={GetOrder}/>);
};

export default OrderedPrductDetails;
