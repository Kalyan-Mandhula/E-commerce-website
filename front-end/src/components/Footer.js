import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

function Footer() {
  return (
    <>
      <Navbar bg="dark" variant="dark" className='fixed-bottom '>
        <Container className='justify-content-center'>
          <Navbar.Brand >
          &copy; Supershop
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

export default Footer;