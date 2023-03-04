import React, { useEffect, useState } from 'react';
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import UserLogin from '../../../redux/ReduxActions/UserActions';
import {useDispatch} from "react-redux"

export default function UserProfileComponent({UpdateProfile,FetchUser,id}) {
  const [validated, setValidated] = useState(false);
  const [Details , setDetails] = useState({})
  const [update ,setupdate] = useState(false)

  useEffect(()=>{
    FetchUser(id).then((res)=>setDetails(res)).catch((err)=>console.log(err))
  },[update])
  
  const dispatch = useDispatch()

  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget.elements;

    const UserDetails = {
        name : form.name.value ,
        lastName : form.lastName.value ,
        email : form.email.value ,
        password : form.password.value ,
        phone : form.phone.value ,
        country : form.country.value ,
        city : form.city.value ,
        zipcode : form.zipcode.value 
    }

    if(event.currentTarget.checkValidity() && UserDetails.name && UserDetails.password){
            UpdateProfile(UserDetails).then((res)=>{
                    dispatch(UserLogin(res.User))
                    setupdate(true)
                    sessionStorage.setItem("User",JSON.stringify(res.User))
                    window.location.href="/user"
            }).catch((err)=>console.log(err))
    }


    setValidated(true);
  };




  return (
    <Container style={{width:"35%",marginTop:"2rem"}}>
      <Alert variant='success' show={update}>Profile updated</Alert>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h4>View/Edit your Profile</h4>
        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>First name</Form.Label>
          <Form.Control
            required
            type="text"
            name="name"
            placeholder="First name"
            defaultValue={Details.name}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustom02" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Last name</Form.Label>
          <Form.Control
            required
            type="text"
            name="lastName"
            placeholder="Last name"
            defaultValue={Details.lastName}
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
        <Form.Group  controlId="validationCustomUsername" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Email address</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              type="email"
              name="email"
              placeholder="Enter email"
              aria-describedby="inputGroupPrepend"
              defaultValue={Details.email}
              readOnly
              required
            />
          </InputGroup>
          <Form.Label className=' mt-2 text-secondary'>To change email address delete your account and create new</Form.Label>
        </Form.Group>
        <Form.Group  controlId="validationCustom03" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" name="password" placeholder="Enter your password" required minLength={6}/>
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          <Form.Label className=' mt-2 text-secondary'>Password should have atleast six letters</Form.Label>
        </Form.Group>

        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Phone number</Form.Label>
          <Form.Control
            type="text"
            name="phone"
            defaultValue={Details.phone}
            placeholder="+91 8754565245"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type="text"
            name="country"
            defaultValue={Details.country}
            placeholder="eg: India China"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>City</Form.Label>
          <Form.Control
            type="text"
            name="city"
            defaultValue={Details.city}
            placeholder="eg: Hyderabad Chennai"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group  controlId="validationCustom01" style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Pincode</Form.Label>
          <Form.Control
            type="Number"
            name="zipcode"
            defaultValue={Details.zipcode}
            placeholder="eg: 508114"
          />
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>
      <Button type="submit">Update</Button>
    </Form>
    </Container>
  );
}

