import axios from "axios"
import store from "../store"



export const AddToCartAction =  (id,quantity)=>async (dispatch)=>{
    let productToAdd = await axios.get(`/api/products/${id}`).then((res)=>res.data).catch((err)=>console.log(err))
    dispatch({
        type : "Add_To_Cart",
        payload : {
            productToAdd : {
                name : productToAdd.name ,
                price : productToAdd.price,
                images : productToAdd.images,
                _id : productToAdd._id,
                count : productToAdd.count
            } ,
            quantity : quantity
        }
    })

    localStorage.setItem("cart",JSON.stringify(store.getState().cart))
}

export const RemoveFromCartAction = ()=>(dispatch)=>{
    dispatch({
        type : "Remove_From_Cart",
        someValues : 0
    })
}

export const ModifyCastItems =  (id,quantity)=>async (dispatch)=>{
    let productToModify = await axios.get(`/api/products/${id}`).then((res)=>res.data).catch((err)=>console.log(err))
    dispatch({
        type : "Modify_Cart",
        payload : {
            productToModify : {
                name : productToModify.name ,
                price : productToModify.price,
                images : productToModify.images,
                _id : productToModify._id,
                count : productToModify.count
            } ,
            quantity : quantity
        }
    })

    localStorage.setItem("cart",JSON.stringify(store.getState().cart))
}

export const DeleteFromCart =  (id)=>async (dispatch)=>{
    let productToDelete = await axios.get(`/api/products/${id}`).then((res)=>res.data).catch((err)=>console.log(err))
    dispatch({
        type : "Delete_From_Cart",
        payload : {
            productToDelete : {
                name : productToDelete.name ,
                price : productToDelete.price,
                images : productToDelete.images,
                _id : productToDelete._id,
                count : productToDelete.count
            } 
        }
    })

    localStorage.setItem("cart",JSON.stringify(store.getState().cart))
}



