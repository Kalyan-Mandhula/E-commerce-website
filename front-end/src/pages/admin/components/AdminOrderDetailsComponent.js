import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ShippingDetails from "../../../components/OrderDetails/ShippingDetails";
import OrderDetails from "../../../components/OrderDetails/OrderSummary";
import PaymentDetails from "../../../components/OrderDetails/PaymentDetails";
import ItemIncart from "../../../components/ItemInCart";
import { useEffect, useState } from "react";
import {useParams } from 'react-router-dom';
import axios from "axios";

const AdminOrderDetailsComponent = ({GetOrder}) => {
    const {id} = useParams()
    const [userInfo ,setUserInfo] = useState({})
    const [isDelivered,setisDelivered] = useState(false)
    const [isPaid,setisPaid] = useState(false)
    const [paymentMethod,setPaymentMethod] = useState("Paypal")
    const [buttonDisabled , setbuttonDisabled] = useState(false)
    const [totalPrice , setTotalPrice] = useState()
    const [cartList,setCartList] = useState([])

    useEffect(()=>{
       GetOrder(id).then((res)=>{
        setUserInfo(res.user) ;
        res.isPaid ? setisPaid(res.paidAt) : setisPaid(false) 
        setPaymentMethod(res.paymentMethod) ;
        res.isDelivered ? setisDelivered(res.deliveredAt.substring(0,10)) : setisDelivered(false) ;
        if(res.isDelivered){
          setbuttonDisabled(true)
        }
        setTotalPrice(res.orderTotal.cartSubtotal)
        setCartList(res.cartItems)
       }).catch((err)=>console.log(err))
    },[isDelivered])


    const MarkAsDelivered = async ()=>{
      await axios.put(`/api/orders/delivered/${id}`).then((res)=>{
        if(res){
          setisDelivered(res.data.deliveredAt.substring(0,10))
          console.log(res.data.deliveredAt.substring(0,10))
        }
      })
    }

  return (
    <>
      <Container className="mx-auto py-5" style={{ width: "100%" }}>
        <h2 className="my-3">Order Details</h2>
        <Row>
          <Col lg={4} md={6}>
            <ShippingDetails userInfo={userInfo} isDelivered={isDelivered}/>
          </Col>
          <Col lg={4} md={6}>
            <PaymentDetails isPaid={isPaid} paymentMethod={paymentMethod} />
          </Col>
          <Col lg={4}>
            <OrderDetails Text="Order" Pay="false" admin="true" isDelivered={isDelivered} totalPrice={totalPrice} MarkAsDelivered={MarkAsDelivered}/>
          </Col>
        </Row>
        <Row>
            <h2 className="my-3">Ordered Items</h2>
          <Col>
          {cartList.map((item, idx) => (
              <ItemIncart key={idx} item={item} Qty={"disabled"} isAdmin={true}/>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AdminOrderDetailsComponent;
