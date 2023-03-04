import "../../chat.css";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import socketIO from "socket.io-client"
import { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";


const Chat = () => {
  const [chat,setChat] = useState([])
  const [socket, setSocket] = useState(false);
  const [messageRecievedFromAdmin , setmessageRecievedFromAdmin] = useState(false)
  const user = useSelector((state)=>state.user)
  
  useEffect(()=>{
    if(!user.isAdmin){

      const socket = socketIO();
      socket.on("no admin", (msg) => {
        setChat((chat) => {
            return [...chat, { Supershop: "Sorry no admins available now" }];
        })
       })

      socket.on("server sends admin mssg to client",(mssg)=>{
        setChat((chat)=>[...chat,{admin:mssg}])
        setmessageRecievedFromAdmin(true)
      })

      socket.on("disconnected",()=>{
        setChat((chat) => {
          return [...chat, { Supershop: "Sorry admin has disconnected" }];
      })
      })

      setSocket(socket);
    }
  },[])

  const SendMessage = (event,mssg)=>{
        event.stopPropagation()
        event.preventDefault()
        if(mssg === "") return 

        socket.emit("message from client",mssg)
        setmessageRecievedFromAdmin(false)
        setChat((chat)=>[...chat,{client : mssg}])
        event.target.clientMessage.value = ""      
  }
  
   if(!user.isAdmin){
    return (
      <> 
        <input type="checkbox" id="check" className="check" />
        <Card style={{ width: "20rem" , height:"25rem" }} className="chatcard border-none ">
          <Card.Header className="bg-primary text-white text-center">Let's chat - Online</Card.Header>
          <Card.Body  style={{ overflowY: "auto" , height:"22rem"}}>
            {
              chat ? chat.map((person,idx)=>{
                return <Fragment key={idx}>
                  { person.client  ? <p className="bg-primary me-4 p-3 mb-2 text-white rounded-pill">Me : {person.client}</p> : person.admin ?
                  <p className="bg-primary text-white rounded-pill ms-5 p-3 mt-0">Admin : {person.admin}</p> : <p className="bg-primary text-white rounded-pill ms-5 p-3 mt-0">Supershop !! : {person.Supershop}</p> }
                </Fragment>
              }) : ""
            } 
          <Form onSubmit={(e)=>{
             SendMessage(e,e.target.clientMessage.value)
          }}>
          <Form.Group className="mb-3 mt-3" controlId="formBasicPassword" >
          <Form.Control type="text"  placeholder="Your text message" onKeyUp={(e)=> e.keyCode === 13 ? SendMessage(e,e.target.clientMessage.value) : ""} name="clientMessage" style={{height:"4rem",marginBottom:"1rem"}}/>
          <Button variant="success" type="submit">
          Submit
        </Button>
        </Form.Group>
          </Form>
          </Card.Body>
        </Card>
  
     <label htmlFor="check" className="chat">
          <i className="bi bi-chat-dots chat-icon"></i>
          <i className="bi bi-x-circle close"></i>
        {
          messageRecievedFromAdmin && <span className="position-absolute start-100 translate-middle p-2 bg-danger border border-light rounded-circle" style={{top:"0.5rem"}}>
          <span className="visually-hidden">New alerts</span>
        </span>
        }  
        </label>
      </>
  
    );
 
   }else{
      return ""
   }
  
};

export default Chat;
