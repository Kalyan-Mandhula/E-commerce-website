import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import VerticalNav from '../../../components/Admin/VerticalNav';
import { useState,useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserLogout } from '../../../redux/ReduxActions/UserActions';
function AdminOrdersComponent({FetchOrders}) {
   const dispatch = useDispatch()

    const [data,setdata] = useState([])

    useEffect(()=>{
        FetchOrders().then((res=>setdata(res))).catch((err)=>
        dispatch(UserLogout()))
    },[])

  return (
    <Container className='mt-5 mx-0' style={{maxWidth:"100%"}}>
        <Row>
            <Col md={8} lg={2} className="ms-5 mb-5">
                <VerticalNav/>
            </Col>
            <Col md={8} lg={7} className="ms-5">
            <h2>Orders</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>User Name</th>
          <th>Ordered Date</th>
          <th>Total Price</th>
          <th>Delivered</th>
          <th>paymentMethod</th>
          <th>View details</th>
        </tr>
      </thead>
      <tbody>
        { 
          data.map((order,idx)=>(
          <tr key={idx}>
          <td>{idx+1}</td>
          <td>{
            order.user!==null ? order.user.name+" "+order.user.lastName : ""
            }</td>
          <td>{order.createdAt.substring(0,10)}</td>
          <td>{order.orderTotal.cartSubtotal}</td>
          <td>{order.isDelivered ? "Yes" : "No"}</td>
          <td>{order.paymentMethod}</td>
          <td><Link to={"/admin/order_Product_details/"+order._id}>Go to order</Link></td>
        </tr> ))
        }        
      </tbody>
    </Table>
            </Col>
        </Row>
     </Container>
  );
}

export default AdminOrdersComponent;