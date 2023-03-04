import axios from "axios";
import AdminEditProductComponent from "./components/AdminEditProductComponent";

  
  const AdminEditProductPage = () => {

    const GetProduct = async(id)=>{
      const {data} =await axios.get(`/api/products/${id}`)
      return data
    }

   const UpdateProduct = async(id,FinalProduct)=>{
    const {data} = await axios.put(`/api/products/${id}`,FinalProduct)
    console.log(data)
    return data
   }



    return (<AdminEditProductComponent GetProduct={GetProduct} UpdateProduct={UpdateProduct} />);
  };
  
  export default AdminEditProductPage;
  
  