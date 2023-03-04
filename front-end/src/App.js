import { BrowserRouter, Routes, Route } from "react-router-dom";

//bootstrap

import "bootstrap/dist/css/bootstrap.min.css";

// user validation components
import CheckLoggedIn from "./components/CheckLogin";

// Header and Footer
import Footer from "./components/Footer";
import Header from "./components/Header";

// Admin accessible pages
import AdminProducts from "./pages/admin/AdminProducts";
import CreateProduct from "./pages/admin/CreateProduct";
import EditProduct from "./pages/admin/EditProduct";

// user and admin accessible pages
import CartDetails from "./pages/user/CartDetails";
import OrderDetails from "./pages/user/OrderDetails";
import UserProfile from "./pages/user/UserProfile";

// accessible to all
import Cart from "./pages/Cart";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import ProductDetails from "./pages/ProductDetails";
import ProductList from "./pages/ProductList";
import Register from "./pages/Register";
import ScrollToTop from "./utils/ScrollToTop";
import MyOrders from "./pages/user/MyOrders";
import AdminChats from "./pages/admin/AdminChats";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderProductDetails from "./pages/admin/AdminOrderDetails"

import DisplayChat from "./components/Admin/DisplayChat";
import AdminAnalyticsPage from "./pages/admin/Analysis";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminEditUser from "./pages/admin/AdminEditUser";

function App() {
  return (
    <div style={{ marginBottom: "60px", fontFamily: "Roboto" }}>
      <BrowserRouter>
        <ScrollToTop />
        <Header />
        <Routes>
          <Route element={<DisplayChat />}>
            <Route path="/" element={<Homepage />}></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route path="/product_list/:category" element={<ProductList />}></Route>
            <Route path="/product_list/:category/:productName" element={<ProductList />}></Route>
            <Route path="/product_details/:id" element={<ProductDetails />}></Route>
            <Route path="/product_details/GetProductByName/:productName" element={<ProductDetails />}></Route>

            <Route element={<CheckLoggedIn  admin={false}/>}>
              <Route path="/user" element={<UserProfile />}></Route>
              <Route path="/user/my_orders" element={<MyOrders />}></Route>
              <Route
                path="/user/ordered_Product_details/:id"
                element={<OrderDetails />}
              ></Route>
              <Route
                path="/user/cart_details"
                element={<CartDetails />}
              ></Route>
            </Route>
          </Route>

          <Route element={<CheckLoggedIn admin={true}/>}>
            <Route
              path="/admin/create_product"
              element={<CreateProduct />}
            ></Route>
            <Route path="/admin/edit_product/:id" element={<EditProduct />}></Route>
            <Route
              path="/admin/admin_products"
              element={<AdminProducts />}
            ></Route>
            <Route path="/admin/orders" element={<AdminOrders />}></Route>
            <Route path="/admin/chats" element={<AdminChats />}></Route>
            <Route path="/admin/users" element={<AdminUsers/>}></Route>
            <Route path="/admin/editUsers/:id" element={<AdminEditUser/>}></Route>
            <Route path="/admin/analysis" element={<AdminAnalyticsPage/>}></Route>
            <Route path="/admin/order_Product_details/:id" element={<AdminOrderProductDetails />}></Route>
          </Route>

          <Route path="*" element="page doesnot exist"></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;

//node node_modules/react-scripts/scripts/start.js
