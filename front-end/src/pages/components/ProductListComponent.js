import { Alert, Container, Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import { Rating } from "react-simple-star-rating";
import Button from "react-bootstrap/Button";
import ProductCard from "../../components/ProductCard";
import { Fragment } from 'react';

//css
import "../../ProductList.css";
import { LinkContainer } from "react-router-bootstrap";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

const ProductListComponent = ({GetProducts,GetFilteredProducts,GetProductsForSearch}) => {

    const categories = useSelector((state)=>state.categories.filter((category)=>!category.name.includes("/")))
    const [products ,setProducts] = useState([])
    const {category , productName} = useParams()
    const [CategoryOfProduct , setCategoryOfProduct] = useState()
    const [price,setPrice] = useState(1000)
    const [RatingFilter,setRatingFilter] = useState([])
    const [AttributesFilter,setAttributesFilter] = useState([])
    const [filtered , setFiltered] = useState(false)
    const navigate = useNavigate()

    useEffect(()=>{
       if(productName && productName !== "null" && productName !== "undefined"){
           navigate(`/product_details/GetProductByName/${productName}`)
       }else{
        GetProducts(category).then((res)=>{
          setProducts(res)
        }
       ).catch((err)=>console.log(err))
       }     
    },[productName,category])
    
    useEffect(()=>{
        setCategoryOfProduct(()=> categories.find((Category)=>Category.name === category)) 
    },[products,category,productName])

    const RatingArray = (rating ,event)=>{
      setRatingFilter((RatingFilter)=>{
        if(event.target.checked){
         RatingFilter.push(Number(rating))
         return RatingFilter
       }else{
         return RatingFilter.filter((Rating)=>Rating !== rating)
       }
      })
    }

    const AttributesArray = (attribute ,event)=>{
      setAttributesFilter((AttributesFilter)=>{
        if(event.target.checked){ 
          AttributesFilter.push(attribute)
         return AttributesFilter
       }else{ 
         return AttributesFilter.filter((Attribute)=> (Attribute.key !==attribute.key || Attribute.value !== attribute.value))
       }
      })
    }
   
    const FinalFilter = (SortCondition)=>{
      
      const Filter = {
        price : Number(price) ,
        attributes : AttributesFilter,
        rating : RatingFilter,
        category : category,
        sort :SortCondition
      }

      GetFilteredProducts(Filter).then((res)=>setProducts(res)).catch((err)=>console.log(err))
    }



    {
      if(products.length > 0){
        return (
    
          <Container className="mx-0" style={{ maxWidth: "92%" }}>
            <Row>
              <Col md={3} style={{ paddingRight: "0" }}>
                <Card style={{ border: "none" }}>
                  <Card.Body>
                    <select className="form-select w-50" name="sort" onChange={(e)=>{
                      FinalFilter(e.target.value)
                      }}>
                      <option value="">Sort By</option>
                      <option value="price_1">Low to high price</option>
                      <option value="price_-1">High to low price</option>
                      <option value="rating_1">By rating</option>
                      <option value="name_1">Name A-Z</option>
                      <option value="name_-1">Name Z-A</option>
                    </select>
                    <br />
      
                    <Card.Title>FILTER</Card.Title>
                    <Card.Title>Price</Card.Title>
                    <Form.Label>
              <h6 className="d-inline">Price no greater than:</h6> Rs. {price}
            </Form.Label>
            <Form.Range min={10} max={1000} step={10} defaultValue={1000}  onChange={(e) => setPrice(Number(e.target.value))} />
      
                    <Card.Title className="mt-3">Rating</Card.Title>
                    <Form>
                      {Array.from({ length: 5 }).map((_, idx) => {
                        return (
                          <div className="align-items-baseline" key={idx}>
                            <input
                              aria-label="option 1"
                              type="checkbox"
                              id={"RatingCheckbox" + idx}
                              className="form-check-input"
                              style={{ marginTop: "0.4rem", cursor: "pointer" }}
                              onChange={(event)=>RatingArray(5-idx,event)}
                            />
                            <label htmlFor={"RatingCheckbox" + idx}>
                              <Rating
                                readonly
                                initialValue={5 - idx}
                                size={20}
                                className="ms-1"
                                style={{ cursor: "pointer" }}
                              />
                            </label>
                          </div>
                        );
                      })}
                    </Form>
                    {
                     CategoryOfProduct ? CategoryOfProduct.attributes.map((attribute,idx)=>(
                      <Fragment key={idx}>
                      <Card.Title className="mt-3">{attribute.key}</Card.Title>
                      {
                        attribute.value.map((value,idx)=>(
                        <Form key={idx}>
                          <div className="mb-1">
                            <input
                              aria-label="option 1"
                              type="checkbox"
                              id="CategoryCheckbox"
                              className="form-check-input me-1"
                              onChange={(event)=>AttributesArray({key :attribute.key , value : value},event)}
                              style={{ cursor: "pointer" }}
                            />
                            <label
                              htmlFor="CategoryCheckbox"
                              style={{ cursor: "pointer" }}
                            >
                              {value}
                            </label>
                          </div>
                        </Form>))
                      }
                    </Fragment>
                     )) : ""
                    }
      
                    <Button variant="primary" className="mt-2" onClick={(e)=>{
                      setFiltered(true)
                      FinalFilter()
                      }}>
                      Filter
                    </Button>{" "}
                    {
                      filtered && <Button variant="secondary" className="mt-2"  onClick={(e)=>{
                        setFiltered(false)
                        window.location.href = `/product_list/${category}`
                        }}>
                      Reset filters
                    </Button>
                    }   
                  </Card.Body>
                </Card>
              </Col>
              <Col className="flex-1" style={{ paddingLeft: "0" }}>
                <Container className="px-0">
                  <Row xs={2} s={2} md={2} lg={3} xl={4} className="mt-2">
                    {products.map((product, idx) => (
                      <ProductCard product={product} key={idx} />
                    ))}
                  </Row>
                </Container>
              </Col>
            </Row>
          </Container>
        );

      }else{
        return <Alert variant="danger">No {category} products available currently</Alert>
      }
    }

  
};

export default ProductListComponent;
