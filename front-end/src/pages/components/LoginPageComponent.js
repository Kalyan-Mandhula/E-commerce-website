
import { Alert, Container } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import { Link ,useNavigate} from 'react-router-dom';
import { useState } from 'react';

export default function LoginPageComponent({LoginUser,UserDispatch,UserActions}) {
    const [validated, setValidated] = useState(false);
    const [validCredentials , setValidCredentials] = useState(true)

    const navigate = useNavigate()

    const handleSubmit = (event)=>{
        event.preventDefault()
        event.stopPropagation()
        const form = event.currentTarget.elements
        const email = form.email.value
        const password = form.password.value
        const doNotLogout = form.doNotLogout.checked

        if(event.currentTarget.checkValidity() && email && password){
            LoginUser(email, password, doNotLogout)
            .then((res) => {
                res === "email or password is incorrect" ?setValidCredentials(false) : setValidCredentials(true)

                if(res.success === "Logged in"){
                    UserDispatch(UserActions(res.User))
                }
                
                if(res.success ==="Logged in" && !res.User.isAdmin){
                   navigate("/",{replace:true})
                }

                if(res.success ==="Logged in" && res.User.isAdmin){
                    navigate("/",{replace:true})
                 }

            })
            .catch((er) => {
                console.log(er)
                setValidCredentials(false)
            });
        }
    
        setValidated(true);
    
    }
  return (
    <Container style={{width:"35%",marginTop:"2rem"}}>
        <Alert show={validCredentials === false} variant='danger'>Email or password is incorrect</Alert>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <h4>Login</h4>
        
        <Form.Group   style={{marginBottom:"1rem",marginTop:"1rem"}} >
          <Form.Label>Email address</Form.Label>
          <InputGroup hasValidation>
            <Form.Control
              name="email"
              type="email"
              placeholder="Enter email"
              aria-describedby="inputGroupPrepend"
              required
            />
            <Form.Control.Feedback type="invalid">
              Please choose a email address.
            </Form.Control.Feedback>
          </InputGroup>
        </Form.Group>
        <Form.Group   style={{marginBottom:"1rem",marginTop:"1rem"}}>
          <Form.Label>Password</Form.Label>
          <Form.Control name="password" type="password" placeholder="Enter your password" required />
          <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3">
        <Form.Check
          name="doNotLogout"
          label="Do not logout"
          feedback="You must agree before submitting."
          feedbackType="invalid"
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Dont have an account ? </Form.Label>{"  "}
        <Link to="/register" className="text-danger">register</Link>
      </Form.Group>
      <Button type="submit" >Login</Button>
    </Form>
    </Container>
  );
}
