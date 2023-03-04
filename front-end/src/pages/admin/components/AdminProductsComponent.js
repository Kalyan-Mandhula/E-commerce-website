
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap';
import VerticalNav from '../../../components/Admin/VerticalNav';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { UserLogout } from '../../../redux/ReduxActions/UserActions';



function AdminProductsComponent({FetchProducts,DeleteProduct}) {
  const dispatch = useDispatch()
    const [data,setdata] = useState([])
    const [productDeleted , setDeleted] = useState(false)


    useEffect(()=>{
        let abrtctrl = new AbortController()
        FetchProducts(abrtctrl).then((res=>setdata(res))).catch((err)=>
        dispatch(UserLogout()))
        return ()=>abrtctrl.abort()
    },[productDeleted])

    const ConfirmDelete = async (id)=>{
        if(window.confirm("Are you sure ?")){
            const data  =  DeleteProduct(id);
        if(data === 'deleted Successfully') {
            setDeleted(!productDeleted)
        }
        }
    }

  return (
    <Container className='mt-5 mx-0' style={{maxWidth:"100%"}}>
        <Row>
            <Col md={8} lg={2} className="ms-5 mb-5">
                <VerticalNav />
            </Col>
            <Col md={8} lg={7} className="ms-5">
            <h2 className='d-inline me-5'>Products</h2>
            <LinkContainer to="/admin/create_product" className="mb-2">
          <Button variant="primary">Create new product</Button>
          </LinkContainer>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Product name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>

        {
          data.map((product,idx)=>(
          <tr key={idx}>
          <td>{idx+1}</td>
          <td>{product.name}</td>
          <td>{product.price}</td>
          <td>{product.category}</td>
          <td><LinkContainer to={"/admin/edit_product/"+product._id}>
          <Button variant="info">Edit</Button>
          </LinkContainer>{' '} 
          <LinkContainer to="/admin/admin_products">
          <Button variant="danger" onClick={()=>ConfirmDelete(product._id)}>Delete</Button>
          </LinkContainer>
      </td>
        </tr> ))
        }        
      </tbody>
    </Table>
            </Col>
        </Row>
     </Container>
  );
}

export default AdminProductsComponent;