import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import ListGroup from "react-bootstrap/ListGroup";
import { Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { useDispatch } from "react-redux";

import { DeleteFromCart, ModifyCastItems } from "../redux/ReduxActions/CartActions";

const ItemIncart = (props)=>{
    const dispatch = useDispatch();
  
    const ModifyCart = (quantity) => {
      dispatch(ModifyCastItems(props.item._id, quantity));
    };

    const DeleteProductFromCart = ()=>{
        dispatch(DeleteFromCart(props.item._id))
    }
    return <>
    <Card style={{ width: "100%", display: "flex" ,marginBottom:"1rem"}}>
          <Row>
            <Col lg={5} md={12}>
              <Card.Img
                style={{ height: "100%", width: "100%", objectFit: "cover" }}
                src={props.item.images.length > 0 ? props.item.images[0].path : null}
              />
            </Col>
            <Col lg={7} md={12}>
              <Card.Body>
                <Card.Title><h4>{props.item.name}</h4></Card.Title>
              </Card.Body>
              <ListGroup className="list-group-flush">
                <ListGroup.Item>Price : <b>Rs. {props.item.price}</b></ListGroup.Item>
                <ListGroup.Item>Color : Black</ListGroup.Item>
                {
                 props.Qty === "disabled" ? <ListGroup.Item>Quantity : {props.item.quantity}</ListGroup.Item> :  <ListGroup.Item><span className="d-inline">Quantity : </span>
                  <Form.Select size="md" onChange={(e)=>{
                    ModifyCart(e.target.value)
                  }} defaultValue={props.item.quantity} aria-label="Default select example" className="d-inline w-75 " >
                    {
                      Array.from({length : props.item.count}).map((_,idx)=>(<option key={idx} value={idx+1}>{idx+1}</option>))
                    }
                  </Form.Select></ListGroup.Item>
             
                }
                </ListGroup>
              <Card.Body>
                <Card.Link href="#"><Button className="btn btn-danger " disabled={props.isAdmin || props.inOrderPage} onClick={()=>DeleteProductFromCart()}>Delete item</Button></Card.Link>
              </Card.Body>
            </Col>
          </Row>
        </Card>
    </>
}

export default ItemIncart