



export const ChatRoomReducer = (state={},action)=>{
    switch(action.type){
        case "Message_From_User" :
        {   
            if(state.chatRooms && state.chatRooms[action.payload.userName]){
             state.chatRooms[action.payload.userName].push({client : action.payload.message})
             return {
                ...state, 
                chatRooms : {...state.chatRooms}
             }
            }else{
                return {
                    ...state,
                    chatRooms : { ...state.chatRooms , [action.payload.userName] : [ {client: action.payload.message}]}
                }
            }
        }

        case "Socket" : {
            return {
                ...state,
                socket : action.payload.socket
            }
        }

        case "Message_Recieved" :
            return {
                ...state ,
                messageRecieved : action.payload.value
            }
        case "DisconnectChat" : {
            let currentstate = {...state}
            currentstate.chatRooms && delete currentstate.chatRooms[action.payload.clientId] 
            return {
                ...state,
                chatRooms : {...currentstate.chatRooms}
            }
        }
            
        default :
        return state
    }
}