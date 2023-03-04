import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import Button from "react-bootstrap/Button";
import ItemIncart from "../components/ItemInCart";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { Alert } from "react-bootstrap";

const Cart = () => {
  const cart = useSelector((state)=>state.cart)
  const cartItems = cart.cartItems
  const itemsCount = cart.itemsCount
  const cartSubTotal = cart.cartSubTotal

  return (
    <Row style={{ width: "90%", marginLeft: "3rem", marginTop: "2rem" }}>
      <Col lg={8} md={6}>
        {
          cartItems.length > 0 ? cartItems.map((item,idx)=>(<ItemIncart key={idx} item={item}/>)) : <Alert variant="success">No items in cart</Alert>
        }
      </Col>

      <Col md={4}>
        <Card style={{ width: "100%" }} className="text-center">
          <Card.Body>
            <Card.Title>Subtotal ({itemsCount} items)</Card.Title>
          </Card.Body>
          <ListGroup className="list-group-flush">
            <ListGroup.Item>
              Total Price : <b>Rs. {cartSubTotal}</b>
            </ListGroup.Item>
            {
              cartItems.length > 0 ? <><ListGroup.Item>
              <div className="d-grid gap-2">
                <LinkContainer to="/user/cart_details"><Button variant="warning" size="lg">
                  Proceed to buy
                </Button></LinkContainer> 
                
              </div>
            </ListGroup.Item></> : ""
            }
            
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default Cart;
