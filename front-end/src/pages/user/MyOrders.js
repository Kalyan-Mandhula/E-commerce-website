import axios from "axios";
import MyOrdersComponent from "./components/MyOrdersComponent";

function MyOrders() {
  const GetMyOrders = async (id) => {
    const {data}  =await axios.get(`/api/orders/${id}`)
    return data
  };
  return <MyOrdersComponent GetMyOrders={GetMyOrders} />;
}

export default MyOrders;
