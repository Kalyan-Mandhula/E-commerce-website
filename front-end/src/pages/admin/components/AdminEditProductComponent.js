import {
  Row,
  Col,
  Container,
  Form,
  Button,
  CloseButton,
  Table,
  Alert,
} from "react-bootstrap";
import { useEffect, useState } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Image } from "react-bootstrap";
import { MDBBadge } from "mdb-react-ui-kit";
import axios from "axios";
import { CategoryFetch } from "../../../redux/ReduxActions/CategoryActions";
import { useDispatch } from "react-redux";



const AdminEditProductComponent = ({ GetProduct ,UpdateProduct  }) => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [Category, setCategory] = useState();
  const [AttrArray,setAttrArray] = useState([])
  const [validated, setValidated] = useState(false);
  const [Key, setKey] = useState();
  const [Images,setImages] = useState([])
  const [newKey,setNewKey] = useState()
  const [newValue ,setNewValue]= useState()
  const dispatch = useDispatch()

  const categories = useSelector((state) => state.categories);

  useEffect(() => {
    GetProduct(id)
      .then((res) => {
        setProduct(res);
        setAttrArray(res.attributes)
        setImages(res.images)
      })
      .catch((err) => console.log(err));
  }, []);

  const checkKeyDown = (e) => {
    if (e.code === "Enter") e.preventDefault();
}

const uploadImagesCloudinaryApiRequest = (images) => {
  const url = "https://api.cloudinary.com/v1_1/drmatj5jb/image/upload";
  const formData = new FormData();
  for (let i = 0; i < images.length; i++) {
      let file = images[i];
      formData.append("file", file);
      formData.append("upload_preset", "pokir1bx");
      fetch(url, {
          method: "POST",
          body: formData,
      })
      .then(response => {
          return response.json();
      })
      .then(data => {
          setImages([...Images,{path : data.url}])
      })
  }
} 

 const DeleteImage = (imagePath)=>{
    setImages(() =>Images.filter((image)=>image.path !==imagePath ))
 }

 const AddNewAttr = async(category,key,value)=>{
      await axios.post("/api/categories/attributes",{category : category.name , key ,value})
 }

 const AddCategory = async(category)=>{
      const {data} = await axios.post("/api/categories",{name : category})
      dispatch(CategoryFetch([...categories,data]))
 }



  const handleSubmit = (event) => {
    event.preventDefault();
    event.stopPropagation();
    const form = event.currentTarget;
    if (form.checkValidity() === true) { 
        const FinalProduct = {
            name : form.name.value ,
            description : form.description.value ,
            category : form.category.value ,
            count : form.count.value ,
            price : form.price.value ,
            attributes : AttrArray ,
            images : Images
        }

         UpdateProduct(product._id,FinalProduct).then((res)=>console.log(res)).catch((err)=>console.log(err))
         window.location.href= "/admin/admin_products"
      
    }
setValidated(true);
  };

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h1>Edit product</h1>
          <Form noValidate validated={validated} onSubmit={handleSubmit} onKeyDown={(e) => checkKeyDown(e)}>
            <Form.Group className="mb-3" controlId="formBasicName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                name="name"
                required
                type="text"
                defaultValue={product.name}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                required
                as="textarea"
                defaultValue={product.description}
                rows={3}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCount">
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                name="count"
                required
                type="number"
                defaultValue={product.count}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                name="price"
                required
                type="text"
                defaultValue={product.price}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                aria-label="De=fault select example"
                name="category"
                onChange={(e) =>
                    e.target.value === "Choose category" ? setCategory(null)
                   : 
                        categories.map((category) =>
                      category.name === e.target.value
                        ? setCategory(category)
                        : ""
                    )
                    }  
              >
                <option>Choose category</option>
                {categories.map((category, idx) => (
                  <option value={category.name} key={idx}>
                    {category.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicNewCategory">
              <Form.Label>
                Or create a new category (e.g. Computers/Laptops/Intel){" "}
              </Form.Label>
              <Form.Control name="newCategory" type="text" onKeyUp={(e)=>{
                if(e.keyCode === 13){
                  e.preventDefault()
                  e.stopPropagation()
                  AddCategory(e.target.value)
                  e.target.value=""
                }}}/>
            </Form.Group>

            {
                (Category) ? <>
                <Row className="mt-5">
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicAttributes">
                  <Form.Label>Choose atrribute and set value</Form.Label>
                  <Form.Select
                    name="atrrKey"
                    aria-label="Default select example"
                    onChange={(e) => setKey(e.target.value)}
                  >
                    <option>Choose attribute</option>
                    {Category
                      ? Category.attributes.map((attribute, idx) => (
                          <option key={idx} value={attribute.key}>
                            {attribute.key}
                          </option>
                        ))
                      : ""}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Select
                    name="atrrVal"
                    aria-label="Default select example"
                    onChange={(e)=>{
                        setAttrArray(()=>{
                            let keyExits = false
                            AttrArray.map((attr)=>{
                                if(attr.key === Key){
                                    keyExits = true
                                    attr.value = e.target.value
                                    return attr
                                }else{
                                    return attr
                                }
                            })

                            if(!keyExits){
                                return [...AttrArray,{key :Key , value : e.target.value}]
                            }else{
                                return [...AttrArray]
                            }
                        }
                        )
                    }}
                  >
                    <option>Choose attribute value</option>
                    {Category
                      ? Category.attributes.map((attribute, idx) =>
                          attribute.key === Key
                            ? attribute.value.map((value, idx) => (
                                <option value={value} key={idx}>
                                  {value}
                                </option>
                              ))
                            : ""
                        )
                      : ""}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>

            { AttrArray ? AttrArray.length > 0 ? (
              <Row>
                <Table hover>
                  <thead>
                    <tr>
                      <th>Attribute</th>
                      <th>Value</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {AttrArray.map((attribute, idx) => (
                      <tr key={idx}>
                        <td>{attribute.key}</td>
                        <td>{attribute.value}</td>
                        <td>
                          <CloseButton onClick={()=>{
                            setAttrArray(()=>AttrArray.filter((attr)=> attr.key !== attribute.key)) 
                        }}/>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Row>
            ) :  "" : ""}

            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formBasicNewAttribute">
                  <Form.Label>Create new attribute</Form.Label>
                  <Form.Control
                    disabled={false}
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    type="text"
                    className="keyPlaceholder"
                    required={newValue ? true : false}
                    onChange={(e)=>setNewKey(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicNewAttributeValue"
                >
                  <Form.Label>Attribute value</Form.Label>
                  <Form.Control
              
                    placeholder="first choose or create category"
                    name="newAttrValue"
                    required={newKey ? true : false}
                    type="text"
                    onChange={(e)=>setNewValue(e.target.value)}
                    onKeyUp={(e)=>{
                        if (e.keyCode === 13){
                        e.preventDefault()
                        e.stopPropagation()
                        if(newKey && newValue){
                            AddNewAttr(Category,newKey,newValue)
                            setAttrArray(()=>{
                                let keyExits = false
                                AttrArray.map((attr)=>{
                                    if(attr.key === newKey){
                                        keyExits = true
                                        attr.value = newValue
                                        return attr
                                    }else{
                                        return attr
                                    }
                                })
                                if(!keyExits){
                                    return [...AttrArray,{key :newKey , value : newValue}]
                                }else{
                                    return [...AttrArray]
                                }
                            }
                            ) 
                            e.target.value =""
                            document.getElementsByClassName("keyPlaceholder")[0].value=""
                        }
                        }
                    }}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Alert variant="primary">
              After typing attribute key and value press enterr on one of the
              field
            </Alert>
                </> : ""
            }

            

            <Form.Group controlId="formFileMultiple" className="mb-3 mt-3">
              <Form.Label>Images</Form.Label>
              <Row>
                {Images.length > 0  &&
                  Images.map((image, idx) => (
                    <Col key={idx} style={{ position: "relative" }} xs={3}>
                      <MDBBadge color="danger" style={{cursor:"pointer"}} notification pill onClick={() => DeleteImage(image.path)}>
                        X
                      </MDBBadge>
                      <Image
                        crossOrigin="anonymous"
                        src={image.path}
                        fluid
                        className="mb-2"
                      />
                    </Col>
                  ))}
              </Row>
              <Form.Control  type="file" multiple onChange={(e)=>{
                uploadImagesCloudinaryApiRequest(e.target.files)
                // uploadHandler(e.target.files,product._id).then((res)=>setImages(res)).catch((err)=>console.log(err))
              }} />
            </Form.Group>
            <Form.Group className="mb-3 mt-3 d-flex">
              <div style={{ width: "80%" }}>
                <Button variant="primary" type="submit">
                  Update
                </Button>
              </div>
              <div style={{ width: "20%" }}>
                <LinkContainer to="/admin/admin_products">
                  <Button variant="primary">Go back</Button>
                </LinkContainer>
              </div>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminEditProductComponent;
