
import ProductListComponent from "./components/ProductListComponent";
import axios from "axios"
import { useParams } from "react-router-dom";



const ProductList = () => {

  const {category,productName} = useParams()

  const GetProducts = async(Category)=>{
      const {data} = await axios.get(`/api/products/getProductsByCategory/${Category}`)
      return data 
  }
  
  const GetFilteredProducts = async(Filter)=>{
    const {data} = await axios.get("/api/products",{ params: Filter })
    return data
  }

  const GetProductsForSearch = async(category,productName)=>{
    const {data} = await axios.get("/api/products/GetProductsForSearch",{params : {Category : category , productName : productName}})
    return data
  }

  return <ProductListComponent GetProducts={GetProducts} GetFilteredProducts={GetFilteredProducts} GetProductsForSearch={GetProductsForSearch}/>
};

export default ProductList;
