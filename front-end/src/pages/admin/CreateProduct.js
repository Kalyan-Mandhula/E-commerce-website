import axios from "axios";
import AdminCreateProductComponent from "./components/CreateProductComponent";

  
  const AdminEditProductPage = () => {

   const CreateProduct = async(FinalProduct)=>{
    const {data} = await axios.post(`/api/products`,FinalProduct)
    return data
   }   
    return (<AdminCreateProductComponent  CreateProduct={CreateProduct} />);
  };
  
  export default AdminEditProductPage;
  
  