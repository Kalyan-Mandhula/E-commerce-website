import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { useParams } from 'react-router-dom';


export default function AdminEditUserComponent({GetUser,UpdateUser}) {
  const [validated, setValidated] = useState(false);
  const [data,setData]= useState({})
  const {id} = useParams()

  useEffect(()=>{
    GetUser(id).then((res)=>{
        setData(res)
    }).catch((err)=>console.log(err))
  },[data])

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      const form = event.currentTarget
      const isAdmin = form.isAdmin.checked
      UpdateUser(data._id,isAdmin)
      window.location.href = "/admin/users"
    }

    setValidated(true);
  };

  return (
    <Container style={{width:"35%",marginTop:"2rem"}}>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h4>Edit User</h4>
        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>First name</Form.Label>
          <Form.Control
            type="text"
            placeholder="First name"
            defaultValue={data.name}
            readOnly
          />
        </Form.Group>
        <Form.Group  controlId="validationCustom02" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Last name"
            defaultValue={data.lastName}
            readOnly
          />
        </Form.Group>
        <Form.Group  controlId="validationCustomUsername" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Email address</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              placeholder="Enter email"
              aria-describedby="inputGroupPrepend"
              defaultValue={data.email}
              readOnly
            />
          </InputGroup>
        </Form.Group>
        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
        <Form.Check
            inline
            label="isAdmin"
            name="isAdmin"
          />
        </Form.Group>
        {data.admin ? <h6>User is already a admin</h6> : "" }
      <Button type="submit">Update</Button>
    </Form>
    </Container>
  );
}

