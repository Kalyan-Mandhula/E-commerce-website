

export const ChatRoom = (user,message)=>(dispatch)=>{
    dispatch({
        type : "Message_From_User",
        payload : {
            userName : user,
            message : message 
        }
    })
}

export const socketAction = (socket)=>(dispatch)=>{
    dispatch({
        type : "Socket",
        payload : {
            socket : socket 
        }
    })
}

export const messageRecieved = (value)=>(dispatch)=>{
    dispatch({
        type : "Message_Recieved",
        payload : {
            value : value 
        }
    })
}

export const RemoveChatRoom = (clientId)=>(dispatch)=>{
    dispatch({
        type : "DisconnectChat",
        payload : {
            clientId : clientId
        }
    })
}