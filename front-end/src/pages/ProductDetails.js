
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ProductDetailsComponent from "./components/ProductDetailsComponent";


const ProductDetailsPage = () => {
  const user = useSelector((state)=>state.user)
  const navigate = useNavigate()

  const GetProductDetails = async(id)=>{
    const {data} = await axios.get(`/api/products/${id}`)
    return data
  }

  const CheckLoggedIn = ()=>{
    return user.name ? user : false
  }

  const AddReview = async(id,review)=>{
    const {data} = await axios.post(`/api/users/addReview/${id}`,review)
    return data
  }

  const GetProductDetailsByName = async(name)=>{
    const {data} = await axios.get(`/api/products/GetProductByName/${name}`)
    return data[0]
  }

  return (<ProductDetailsComponent GetProductDetails={GetProductDetails} CheckLoggedIn={CheckLoggedIn} AddReview={AddReview} GetProductDetailsByName={GetProductDetailsByName}/>);
};



export default ProductDetailsPage;

