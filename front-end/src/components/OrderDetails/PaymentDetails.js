import { ListGroupItem } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function PaymentDetails({isPaid,paymentMethod ,paidAt}){
    return <>
    <Card style={{ marginBottom: "1rem" }}>
              <Card.Header>Payment details </Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6 className="d-inline">Payment method</h6> : {paymentMethod}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h6 className="d-inline">Payment status</h6> : {isPaid ? paidAt : "Not paid yet"} 
                </ListGroup.Item>
                  {" "}
                  {    
                    isPaid ? <ListGroupItem><h6 className="d-inline">Paid at</h6> : {isPaid}</ListGroupItem> : ""
                  }
              </ListGroup>
            </Card>
    </>
}