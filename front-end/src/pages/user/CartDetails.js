import CartDetailsComponent from "./components/CartDetailsComponent";
import axios from "axios";
const CartDetails = () => {
  let user ;
  const GetUser = async (userId) => {
    const { data } = await axios.get(`/api/users/${userId}`);
    user = data
    return data;
  };

  const PlaceOrder = async (cart, paymentMethod) => {
    const { data } = await axios.post("/api/orders", {
      orderTotal: {
        cartSubtotal: cart.cartSubTotal,
        itemsCount: cart.itemsCount,
      },
      cartItems: cart.cartItems,  
      paymentMethod: paymentMethod,
      user : user._id 
    });
    window.location.href=`/user/ordered_Product_details/${data._id}`
  };

  return <CartDetailsComponent GetUser={GetUser} PlaceOrder={PlaceOrder} />;
};

export default CartDetails;
