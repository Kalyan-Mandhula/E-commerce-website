
import { Container } from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { LinkContainer } from 'react-router-bootstrap';
import VerticalNav from '../../../components/Admin/VerticalNav';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { UserLogout } from '../../../redux/ReduxActions/UserActions';


function AdminUsersComponent({FetchUsers,DeleteUser}) {
  const dispatch = useDispatch()
    const [data ,setdata] = useState([])
    const [userDeleted , setDeleted] = useState(false)

    useEffect(()=>{
        let abrtctrl = new AbortController()
       FetchUsers(abrtctrl).then((res)=>setdata(res)).catch((err)=>dispatch(UserLogout()))
       return ()=>abrtctrl.abort()
    },[userDeleted])

    const ConfirmDelete = async (id)=>{
        if(window.confirm("Are you sure ?")){
            const data  = await DeleteUser(id);
        if(data === 'User deleted') {
            setDeleted(!userDeleted)
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
            <h2 className='d-inline me-5'>Users</h2>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>FIrst Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>isAdmin</th>
          <th>Edit/Delete</th>
        </tr>
      </thead>
      <tbody>

        {
          data.map((data,idx)=>(
          <tr key={idx}>
          <td>{idx+1}</td>
          <td>{data.name}</td>
          <td>{data.lastName}</td>
          <td>{data.email}</td>
          <td>{data.admin ? "Yes" : "No"}</td>
          <td><LinkContainer to={"/admin/editUsers/"+data._id}>
          <Button variant="info">Edit</Button>
          </LinkContainer>{' '} 
          <Button variant="danger" onClick={()=>ConfirmDelete(data._id)}>Delete</Button>
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

export default AdminUsersComponent;