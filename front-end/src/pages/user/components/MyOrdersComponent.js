import { Alert, Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

function MyOrdersComponent({GetMyOrders}) {

    const user_id = useSelector((state)=>state.user._id)
    const [MyOrders,setMyOrders] = useState([])

    useEffect(()=>{
        GetMyOrders(user_id).then((res)=>setMyOrders(res)).catch((err)=>console.log(err))
    },[])

  return (
    <Container className='mt-5'>
      <h2>My Orders</h2>
      <Alert variant='danger' show={MyOrders.length === 0 ? true : false}>You have not ordered any items</Alert>
      {
        MyOrders.length > 0 ? <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Ordered Date</th>
            <th>Total Price</th>
            <th>Delivered</th>
            <th>View details</th>
          </tr>
        </thead>
        <tbody>
  
          {
            MyOrders.map((order,idx)=>(
            <tr key={idx}>
            <td>{idx+1}</td>
            <td>{order.createdAt.substring(0,10)}</td>
            <td>{order.orderTotal.cartSubtotal}</td>
            <td>{order.isDelivered ? <>&#x2713;</> : <>&#10060; </>}</td>
            <td><Link to={"/user/ordered_Product_details/"+order._id}>View order</Link></td>
          </tr> ))
          }        
        </tbody>
      </Table> : ""
      }
    </Container>
  );
}

export default MyOrdersComponent;