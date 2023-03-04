import axios from 'axios';
import { useEffect, useState } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { LinkContainer } from 'react-router-bootstrap';

function HomeSlider() {

  const [products,setProducts] = useState()
  const GetBestSellers = async()=>{
    const {data} = await axios.get("/api/products/GetBestSellers")
    return data
  }
  useEffect(()=>{
      GetBestSellers().then((res)=>setProducts(res)).catch((err)=>console.log(err))
  })
  return (
    <Carousel>
      {
        products ? products.map((product,idx)=>(
        <Carousel.Item key={idx}>
          <img
            style={{height: "300px", objectFit:"cover"}}
            className="d-block w-100"
            src={product.images[0].path}
            alt="First slide"
          />
          <Carousel.Caption>
              <LinkContainer to={"/product_details/"+product._id}  style={{cursor:"pointer"}}>
                   <h3>{product.name}</h3>
              </LinkContainer>
            <p>{product.description}</p>
          </Carousel.Caption>
        </Carousel.Item>)) : ""
      }
    </Carousel>
  );
}

export default HomeSlider;