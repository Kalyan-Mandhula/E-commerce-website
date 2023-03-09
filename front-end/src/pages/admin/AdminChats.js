
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import React, { Fragment, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Toast from 'react-bootstrap/Toast';
import { Form } from 'react-bootstrap';
import VerticalNav from '../../components/Admin/VerticalNav';
import { useSelector } from 'react-redux';
import { messageRecieved } from '../../redux/ReduxActions/ChatActions';
import { useDispatch } from "react-redux";


function AdminChats() {
  const dispatch = useDispatch()
  const [showA, setShowA] = useState(true);
  const [mssgSent,setMssgSent] = useState(false)
  const {socket , chatRooms} = useSelector((state)=>state.chatRooms)

  const CloseChat = () =>{
    setShowA(!showA);
    socket && socket.disconnect()
  } 

  useEffect(()=>{},[mssgSent])

  const SendMessage = (event,chatRoom)=>{
    event.stopPropagation()
    event.preventDefault()
    if(event.target.adminMessage.value === "") return 
    chatRooms[chatRoom].push({admin : event.target.adminMessage.value})  
    socket.emit("message from admin",event.target.adminMessage.value)
    dispatch(messageRecieved(false))
    event.target.adminMessage.value=""
    setMssgSent(!mssgSent)
    const chatMessages = document.querySelector(".chat-mssg");
    chatMessages.scrollTop = chatMessages.scrollHeight
}



  return (
    <Container className='mt-5 mx-0' style={{maxWidth:"100%"}}>
        <Row>
            <Col md={8} lg={2} className="ms-5 mb-5">
                <VerticalNav/>
            </Col>
            <Col md={8} lg={7} className="ms-5">

        {
          chatRooms ? Object.entries(chatRooms).map(([chatRoom,value],idx)=>(
          <Toast show={showA} onClose={CloseChat} key={idx}>
            <Toast.Header>
              <strong className="me-auto">Chat with {chatRoom}</strong>
              <small>11 mins ago</small>
            </Toast.Header>
            <div style={{maxHeight:"300px",textOverflow:"auto"}} >
            <Toast.Body style={{maxHeight:"300px"}} className="overflow-auto chat-mssg">   
              {
                 value.map((chat,idx)=>{
                  return <Fragment key={idx}>
                  {
                    chat.client ? <p className='bg-primary me-4 p-3 mb-2 text-white rounded-pill'>User : {chat.client}</p> :                      
                    <p className='bg-primary text-white rounded-pill ms-5 p-3 mt-0'>Me : {chat.admin}</p>
                  }
                  </Fragment>       
                }) 
              } 
              <Form onSubmit={(e)=>SendMessage(e,chatRoom)}>
              <Form.Group className="mb-3 mt-3" controlId="formBasicPassword" >
          <Form.Control type="text" placeholder="Your text message" name="adminMessage" onKeyUp={(e)=> e.keyCode === 13 ? SendMessage(e,chatRoom) : ""} style={{height:"4rem"}}/>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>  
              </Form> 
            </Toast.Body>
            </div>
          </Toast>)) : ""
        }
            </Col>
        </Row>
     </Container>
  );
}

export default AdminChats;