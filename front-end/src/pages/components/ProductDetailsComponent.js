import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
  FormGroup,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import { useDispatch, useSelector } from "react-redux";
import { AddToCartAction } from "../../redux/ReduxActions/CartActions";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";


const ProductDetailsComponent = ({ GetProductDetails , CheckLoggedIn ,AddReview,GetProductDetailsByName}) => {
  const [showAlert, setShow] = useState(false);
  const [productDetails, setProductDetails] = useState({});
  const [validated, setValidated] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [login,setLogin] = useState(false)
  const [reviewAdded,setReviewAdded] = useState(false)
  const [defaultRating,setDefaultRating]= useState(false)
  const user = useSelector((state)=>state.user)

  const dispatch = useDispatch();
  const { id ,productName} = useParams();


  const AddToCart = () => {
    dispatch(AddToCartAction(id, quantity));
    setShow(true)
  };

  useEffect(() => {
    if(id){
      GetProductDetails(id)
      .then((res) => setProductDetails(res))
      .catch((err) => console.log(err));
    }else if(productName){
      GetProductDetailsByName(productName)
      .then((res) => setProductDetails(res))
      .catch((err) => console.log(err));
    }
  }, [productDetails,reviewAdded]);


  useEffect(() => {
    setLogin(CheckLoggedIn())
  }, []);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();
    if (form.checkValidity() && form.rating.value!=="your rating" && user) {
      const review = {
        comment : form.comment.value,
        rating : form.rating.value ,
        user : {
          _id : user._id ,
          name : user.name,
          lastName : user.lastName
        }
      }

      AddReview(productDetails._id,review).then((res)=>setReviewAdded(true)).catch((err)=>console.log(err))
      document.getElementsByClassName("comment")[0].value =""
      setDefaultRating(true)
      setValidated(false)
    }else{
      setValidated(true);
    }
  };

  return (
    <Container style={{ maxWidth: "92%" }}>
      <Alert show={showAlert} variant="success" className="mt-2" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Added to cart</Alert.Heading>
      </Alert>
      <Row className="mt-5">
        <Col md={4}>
          {productDetails.images
            ? productDetails.images.map((image, idx) => (
                <Image fluid src={image.path} key={idx} className="mb-2" />
              ))
            : ""}
        </Col>
        <Col md={8}>
          <Row>
            <Col md={7} lg={8}>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h4>{productDetails.name}</h4>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    readonly
                    size={20}
                    initialValue={productDetails.rating}
                  />{" "}
                  ({productDetails.reviewsNumber})
                </ListGroup.Item>
                <ListGroup.Item>
                  Price : <b>Rs. {productDetails.price}</b>
                </ListGroup.Item>
                <ListGroup.Item>{productDetails.description}</ListGroup.Item>
              </ListGroup>
            </Col>
            <Col md={5} lg={4}>
              <ListGroup>
                <ListGroup.Item>
                  Status :{" "}
                  {productDetails.count > 0 ? "In Stock" : "Out of stock"}
                </ListGroup.Item>
                <ListGroup.Item>
                  Price :{" "}
                  <h6 className="d-inline">Rs. {productDetails.price}</h6>
                </ListGroup.Item>
                <ListGroup.Item>
                  <span className="d-inline">Quantity : </span>
                  <Form.Select
                    onChange={(e) => {
                        setQuantity(e.target.value)
                    }    
                    }
                    value={quantity > 0 ? quantity : 1}
                    size="md"
                    aria-label="Default select example"
                    className="d-inline w-75"
                  >
                    {Array.from({ length: productDetails.count }).map(
                      (_, idx) => (
                        <option key={idx} value={idx + 1}>
                          {idx + 1}
                        </option>
                      )
                    )}
                  </Form.Select>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Button variant="danger" onClick={() => { AddToCart()}}>
                    Add to cart
                  </Button>
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
          <Row>
            <Col className="mt-5">
              <h5>REVIEWS</h5>
              <ListGroup variant="flush">
                {productDetails.reviews
                  ? productDetails.reviews.map((review, idx) => (
                      <ListGroup.Item key={idx}>
                        <p>
                          <b>{review.user.name +" "+review.user.lastName}</b>
                        </p>
                        <p>
                          <Rating
                            readonly
                            size={20}
                            initialValue={review.rating}
                          />
                        </p>
                        <p>Date :{review.createdAt.substring(0, 10)}</p>
                        <h6 className="d-inline">Review :</h6>
                        <p className="d-inline">{review.comment}</p>
                      </ListGroup.Item>
                    ))
                  : ""}
              </ListGroup>
            </Col>
          </Row>
          <hr />
          <Alert variant="danger" show={!login}>Login first to write a review</Alert>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Example textarea</Form.Label>
              <Form.Control as="textarea" rows={3} required  name="comment" disabled={!login} className="comment"/>
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <FormGroup  controlId="validationCustom02" >
            <Form.Select aria-label="Default select example" required name="rating" disabled={!login}  className="rating">
              <option value="your rating">Your rating</option>
              <option value={5}>5 - Very good</option>
              <option value={4}>4 - Good</option>
              <option value={3}>3 - Average</option>
              <option value={2}>2 - Bad</option>
              <option value={1}>1 - Very bad</option>
            </Form.Select>
            </FormGroup>
            <Button variant="primary" className="mt-2" type="submit" disabled={!login}>
              Submit
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetailsComponent;
