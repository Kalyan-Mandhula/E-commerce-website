import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ShippingDetails from "../../../components/OrderDetails/ShippingDetails";
import OrderSummary from "../../../components/OrderDetails/OrderSummary";
import PaymentDetails from "../../../components/OrderDetails/PaymentDetails";
import ItemIncart from "../../../components/ItemInCart";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const OrderDetailsComponent = ({GetOrder,GetUser}) => {
  const {id}= useParams()
  const userId = useSelector((state)=>state.user._id)
  const [order ,setOrder] = useState({})
  const [userInfo,setUserInfo] = useState({})
  useEffect(()=>{
    GetOrder(id).then((res)=>setOrder(res)).catch((err)=>console.log(err))
  },[])

  useEffect(()=>{
    GetUser(userId).then((res)=>setUserInfo(res)).catch((err)=>console.log(err))
},[])

  
  return (
    <>
      <Container className="mx-auto py-5" style={{ width: "100%" }}>
        <h2 className="my-3">Order Details</h2>
        <Row>
          <Col lg={4} md={6}>
            <ShippingDetails userInfo={userInfo} isDelivered={order.isDelivered}/>
          </Col>
          <Col lg={4} md={6}>
            <PaymentDetails isPaid={order.isPaid} paymentMethod={order.paymentMethod} paidAt={order.paidAt}/>
          </Col>
          <Col lg={4}>
            <OrderSummary page={"orderPage"} Text="Order" Pay="false" isPaid={order.isPaid} paymentMethod={order.paymentMethod} isDelivered={order.isDelivered} totalPrice={order.cartSubtotal} itemsCount={order.itemsCount}/>
          </Col>
        </Row>
        <Row>
            <h2 className="my-3">Order Items</h2>
          <Col>
         
          {
           order.cartItems ? order.cartItems.map((item,idx)=>(
                <ItemIncart Qty="disabled" key={idx} item={item} inOrderPage={true}/>
            )) : ""
          }
          
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default OrderDetailsComponent;
