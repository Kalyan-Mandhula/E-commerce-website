import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap-icons/font/bootstrap-icons.css";
import { LinkContainer } from "react-router-bootstrap";
import { MDBBadge } from "mdb-react-ui-kit";
import { useDispatch } from "react-redux";
import { UserLogout } from "../redux/ReduxActions/UserActions";
import { useSelector } from "react-redux";

import {
  Button,
  Form,
  InputGroup,
  DropdownButton,
  Dropdown
} from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import { CategoryFetch } from "../redux/ReduxActions/CategoryActions";
import { useNavigate } from "react-router-dom";
import socketIo from "socket.io-client";
import { ChatRoom } from "../redux/ReduxActions/ChatActions";
import { socketAction } from "../redux/ReduxActions/ChatActions";
import { messageRecieved } from "../redux/ReduxActions/ChatActions";
import { RemoveChatRoom } from "../redux/ReduxActions/ChatActions";

function Header() {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState();
  const [productName, setproductName] = useState();

  const navigate = useNavigate();

  const User = useSelector((state) => state.user);
  const itemsCount = useSelector((state) => state.cart.itemsCount);
  const categories = useSelector((state) => state.categories);
  const messageAlert = useSelector((state)=>state.chatRooms.messageRecieved)

  const GetCategories = async () => {
    const { data } = await axios.get("/api/categories");
    return data;
  };

  useEffect(() => {
    if (User.isAdmin) {
      const socket = socketIo();
      socket.emit("admin is actve","Admin"+Math.floor(Math.random() * 1000000000000))
      socket.on("server sends client mssg to admin", ({clientId,mssg}) =>
        {
        dispatch(socketAction(socket));
        dispatch(ChatRoom(clientId, mssg))
        dispatch(messageRecieved(true))}
      );

      socket.on("disconnected",(clientId)=>{
        dispatch(RemoveChatRoom(clientId))
      })
    }
  }, [User.isAdmin]);

  useEffect(() => {
    GetCategories()
      .then((res) => {
        dispatch(CategoryFetch(res));
      })
      .catch((err) => console.log(err));
  }, [User]);

  const SearchProducts = () => {
    navigate(`/product_list/${categoryName}/${productName}`);
    document.getElementsByClassName("Search")[0].value=""
    setCategoryName(null);
    setproductName(null);
  };

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
      <Container>
        <LinkContainer to="/">
          <Navbar.Brand href="/" className="me-5">
            Supershop
          </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav>
              <InputGroup>
                <DropdownButton
                  id="dropdown-basic-button"
                  title={categoryName ? categoryName : "All"}
                  className="rounded-0"
                >
                  <Dropdown.Item onClick={(e) => setCategoryName("All")}>
                    All
                  </Dropdown.Item>
                  {categories
                    ? categories.map((category, idx) => (
                        <Dropdown.Item
                          onClick={(e) => setCategoryName(category.name)}
                          key={idx}
                        >
                          {category.name}
                        </Dropdown.Item>
                      ))
                    : ""}
                </DropdownButton>
                <Form.Group controlId="formBasicPassword">
                  <Form.Control
                    type="text"
                    className="rounded-0 h-100 border-0 Search"
                    placeholder="Search in shop..."
                    onChange={(e) => {
                      setproductName(e.target.value);
                    }}
                    onKeyUp={(e) => {
                      if (e.keyCode === 13) {
                        SearchProducts();
                      }
                    }}
                  />
                </Form.Group>
                <Button
                  variant="warning"
                  className="rounded-right"
                  onClick={(e) => SearchProducts()}
                >
                  <i className="bi bi-search"></i>
                </Button>
              </InputGroup>
            </Nav>
          </Nav>
          <Nav>
            {User.isAdmin ? (
              <>
                <LinkContainer to="/admin/orders" className="position-relative">
                  <Nav.Link href="/admin/orders"><span>
                  {User.name}
                  </span>
                  {
                    messageAlert &&   <MDBBadge color='danger' notification pill >1</MDBBadge>
                  }          
                    </Nav.Link>
                </LinkContainer>
              </>
            ) : User.name ? (
              <>
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={User.name}
                  menuVariant="dark"
                >
                  <LinkContainer to="/user">
                    <NavDropdown.Item href="/user">My Profile</NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/user/my_orders">
                    <NavDropdown.Item href="/user/my_orders">
                      My Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to="/login">
                    <NavDropdown.Item
                      href="/login"
                      onClick={() => dispatch(UserLogout())}
                    >
                      Logout
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              </>
            ) : (
              <>
                <LinkContainer to="/login">
                  <Nav.Link href="/login">Login</Nav.Link>
                </LinkContainer>
                <LinkContainer to="/register">
                  <Nav.Link href="/register">Register</Nav.Link>
                </LinkContainer>
              </>
            )}

            <LinkContainer to="/cart">
              <Nav.Link href="/cart">
                <i className="bi bi-cart3 me-1 "></i>
                <span>Cart</span>
                <MDBBadge color="danger" notification pill>
                  {itemsCount > 0 ? itemsCount : ""}
                </MDBBadge>
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Header;
