import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { LinkContainer } from "react-router-bootstrap";
import { Rating } from "react-simple-star-rating";

function ProductCard({product}) {
  return (
    <Card className="px-0 mt-2">
      <Card.Img variant="top" src={product.images ? product.images[0].path : ""} />
      <Card.Body>
        <Card.Title>{product.name}</Card.Title>
        <Card.Text>
          {product.description}
        </Card.Text>
        <div className="mb-2">
          <Rating initialValue={product.rating} readonly size={20} />{" "}({product.reviewsNumber})
        </div>
        <div>
          <h6 className="me-2 d-inline">Rs.{product.price}</h6>
          <LinkContainer to={"/product_details/"+product._id}>
            <Button variant="primary">View details</Button>
          </LinkContainer>
        </div>
      </Card.Body>
    </Card>
  );
}

export default ProductCard;
