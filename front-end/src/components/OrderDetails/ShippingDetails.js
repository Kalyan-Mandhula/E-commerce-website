import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';

export default function ShippingDetails({userInfo,isDelivered}){
    return <>
    <Card style={{ marginBottom: "1rem" }}>
              <Card.Header>Shipping details</Card.Header>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h6 className="d-inline">Name</h6> : {userInfo.name+" "+userInfo.lastName}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6 className="d-inline">Address</h6> : {(userInfo.country && userInfo.city  && userInfo.zipcode ) ? userInfo.country+" "+userInfo.city+" "+userInfo.zipcode : ""}
                </ListGroup.Item>
                <ListGroup.Item>
                  {" "}
                  <h6 className="d-inline">Phone</h6> : +91 {userInfo.phone}
                </ListGroup.Item>
                <ListGroup.Item>
                  <h6 className="d-inline">Status</h6> : {isDelivered ? <>Delivered at {isDelivered }</>: "Not delivered yet"}
                </ListGroup.Item>
              </ListGroup>
            </Card>
    </>
}

