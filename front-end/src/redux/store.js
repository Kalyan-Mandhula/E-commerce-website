import {createStore , applyMiddleware ,combineReducers} from "redux"
import {composeWithDevTools} from "redux-devtools-extension"
import thunk from "redux-thunk"
import CartReducer from "./ReduxReducers/CartReducers"
import UserReducer from "./ReduxReducers/UserReducers"
import { CategoryReducer } from "./ReduxReducers/CategoryReducer"
import { ChatRoomReducer } from "./ReduxReducers/ChatReducer"

const middleswares = [thunk]

const Reducers = combineReducers({
    cart : CartReducer,
    user : UserReducer ,
    categories :CategoryReducer,
    chatRooms : ChatRoomReducer
})



const InitialValues = {
    cart : {
        cartItems : localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartItems : [] ,
        itemsCount :localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).itemsCount : 0 ,
        cartSubTotal :localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")).cartSubTotal : 0
    },
    user : localStorage.getItem("User") ? JSON.parse(localStorage.getItem("User"))
    : sessionStorage.getItem("User") ?  JSON.parse(sessionStorage.getItem("User")) : {} ,
    categories : [] ,
    chatRooms : {}
   
}

const store = createStore(Reducers,InitialValues,composeWithDevTools(applyMiddleware(...middleswares)))

export default store