import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import ShippingDetails from "../../../components/OrderDetails/ShippingDetails";
import OrderDetails from "../../../components/OrderDetails/OrderSummary";
import ItemIncart from "../../../components/ItemInCart";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import { Form } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";
import { useEffect, useState } from "react";

const CartDetailsComponent = ({GetUser , PlaceOrder}) => {

  const cart = useSelector((state)=>state.cart)
  const userId = useSelector((state)=>state.user._id)
  const cartItems = cart.cartItems
  const itemsCount = cart.itemsCount
  const cartSubTotal = cart.cartSubTotal

  const [userInfo,setUserInfo] = useState({})
  const [paymentMethod,setPaymentMethod] = useState("Paypal")

  useEffect(()=>{
      GetUser(userId).then((res)=>setUserInfo(res)).catch((err)=>console.log(err))
  },[])
 
  return (
    <>
      <Container className="mx-auto py-5" style={{ width: "100%" }}>
        <h2 className="my-3">Cart Details</h2>
        {
            cartItems.length > 0 ? <><Row>
            <Col lg={4} md={6}>
              <ShippingDetails userInfo={userInfo} isDelivered={false}/>
              <Alert variant="danger" show={(!userInfo.phone || !userInfo.city  || !userInfo.zipcode ) ? true : false}>adress or phone number is missing</Alert>
            </Col>
            <Col lg={4} md={6}>
            <Card style={{ marginBottom: "1rem" }}>
                <Card.Header>Payment method </Card.Header>
                <ListGroup variant="flush">
                  <ListGroup.Item className="px-1">
                  <Form.Select aria-label="Default select example" style={{border:"none"}} onChange={(e)=>{
                      setPaymentMethod(e.target.value)
                  }}>
        <option value="Paypal">Paypal</option>
        <option value="Cash on delivery">Cash on Delivery</option>
      </Form.Select>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    {" "}
                    <h6 className="d-inline">Payement status</h6> : Not paid yet
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
            <Col lg={4}>
              <OrderDetails Text="Cart" Pay="true" totalPrice={cartSubTotal} userInfo={userInfo} PlaceOrder={()=>PlaceOrder(cart,paymentMethod)} itemsCount={itemsCount}/>
            </Col>
          </Row>
          <Row>
              <h2 className="my-3">Cart Items</h2>
            <Col>
            {
            cartItems.length > 0 ? cartItems.map((item,idx)=>(<ItemIncart key={idx} item={item}/>)) : <Alert variant="success">No items in cart</Alert>
          }
            </Col>
          </Row></> : <Alert variant="danger">No items in cart</Alert>
        }
      </Container>
    </>
  );
};

export default CartDetailsComponent;
