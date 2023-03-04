import AdminProductsComponent from "./components/AdminProductsComponent";
import axios from "axios"


function AdminProducts() {

  const FetchProducts = async(abrtctrl)=>{
    const {data} = await axios.get("/api/products/getAdminProducts",{signal:abrtctrl.signal})
    // console.log("a",data)
    return data
  }

  const DeleteProduct = async(id)=>{
    const {data} = await axios.delete(`/api/products/${id}`)
    return data
  }

  return (<AdminProductsComponent FetchProducts={FetchProducts} DeleteProduct={DeleteProduct}/> );
}

export default AdminProducts;