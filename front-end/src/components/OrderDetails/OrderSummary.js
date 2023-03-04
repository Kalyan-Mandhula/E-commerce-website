
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import  Button  from 'react-bootstrap/Button';
import { ListGroupItem } from 'react-bootstrap';
import { useState } from 'react';


export default function OrderDetails(props){

    const [paymentButton,setPaymentButton] = useState(false)

    const Payment = ()=>{
      setPaymentButton(true)
    }
    return <>
           <Card>
              <Card.Header>{props.Text} summary</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  {" "}
                  <h6 className="d-inline">Items price</h6> : Rs.{props.totalPrice}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h6 className="d-inline">Shipping</h6> : Included
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h6 className="d-inline">Tax</h6> : Included
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h6 className="d-inline text-danger">Total price </h6> :
                  Rs.{props.totalPrice+20}
                </ListGroup.Item>
                {
                  props.Pay === "true" ?<ListGroup.Item>
                    <Button variant="danger w-100" disabled={(!props.userInfo.phone || !props.userInfo.city  || !props.userInfo.zipcode ) ? true : false}  onClick={()=>props.PlaceOrder()}>Place Order</Button>
                  </ListGroup.Item> : ''
                   }
                   {
                    props.admin === "true" ? <ListGroup.Item>
                      {
                        props.isDelivered ? <><Button variant="success w-100 text-white" disabled>Order is delivered</Button> </>:
                        <><Button variant="secondary w-100 text-white" onClick={props.MarkAsDelivered}>Mark as delivered</Button></>
                      }
                    
                  </ListGroup.Item> : ''
                   }
                   {
                    props.page === "orderPage" ? props.isDelivered ? <><Button variant="success w-100 text-white" disabled>Order is delivered</Button> </> : <ListGroupItem>{props.paymentMethod==="Paypal" ?  <><Button variant="danger w-100 text-white" onClick={()=>Payment()} disabled={paymentButton}>Pay now</Button> </> : <><Button variant="success w-100 text-white" >Yet to deliver</Button> </>}</ListGroupItem>  : ""
                   }
              </ListGroup>
            </Card>
    </>
}