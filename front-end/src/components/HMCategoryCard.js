import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { LinkContainer } from 'react-router-bootstrap';

function HomeCategory({category}) {

  return (
    <Card  className='px-0 mt-2'>
      <Card.Img variant="top" src="images\games-category.png" />
      <Card.Body>
        <Card.Title>{category.name}</Card.Title>
        <Card.Text>
          {category.description}
        </Card.Text>
        <br></br>
        <LinkContainer to={`/product_list/${category.name}`}>
        <Button variant="primary">View {category.name}</Button>
        </LinkContainer>
        
      </Card.Body>
    </Card>
  );
}

export default HomeCategory;