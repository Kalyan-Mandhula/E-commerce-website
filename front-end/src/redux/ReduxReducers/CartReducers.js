const CART_INITIAL_STATE = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

const CartReducer = (state = CART_INITIAL_STATE, action) => {
  switch (action.type) {
    case "Add_To_Cart":
      {let productToAdd = action.payload.productToAdd;
      let quantity = Number(action.payload.quantity);
      let cartItems = state.cartItems || [];
      let cartSubTotal = state.cartSubTotal || 0;
      let itemsCount = state.itemsCount || 0;

      let ProductAlreadyInCart = false;
      cartItems.map((item) =>
        item._id === productToAdd._id ? (ProductAlreadyInCart = true) : ""
      );

      if (ProductAlreadyInCart) {
        cartItems.map((item) => {
          if (item._id === productToAdd._id) {
            cartSubTotal += quantity * productToAdd.price;
            itemsCount += quantity;
            item.quantity += quantity;
            return { ...item };
          } else {
            return item;
          }
        });
      } else {
        cartItems.push({ ...productToAdd, quantity: quantity });
        itemsCount += quantity;
        cartSubTotal += quantity * productToAdd.price;
      }
      return {
        cartItems: cartItems,
        itemsCount: itemsCount,
        cartSubTotal: cartSubTotal,
      }; }
    case "Remove_From_Cart":
      return { value: state.value - 1 };
    case "Modify_Cart":
     let productToModify= action.payload.productToModify;
     let quantityToModify = Number(action.payload.quantity);
     let cartItemsAll = state.cartItems || [];
     let cartSubTotalPrice = state.cartSubTotal || 0;
     let itemsCountALl = state.itemsCount || 0;

      cartItemsAll.map((item) => {
        if (item._id === productToModify._id) {
          cartSubTotalPrice = cartSubTotalPrice-(item.quantity*(productToModify.price))+(quantityToModify*(productToModify.price))
          itemsCountALl = itemsCountALl-item.quantity+quantityToModify;
          item.quantity = quantityToModify;
          return { ...item };
        } else {
          return item;
        }
      });

      return {
        cartItems: cartItemsAll,
        itemsCount: itemsCountALl,
        cartSubTotal: cartSubTotalPrice,
      };

    case "Delete_From_Cart" : 

    {let productToDelete = action.payload.productToDelete;
    let cartItems = state.cartItems || [];
    let cartSubTotal = state.cartSubTotal || 0;
    let itemsCount = state.itemsCount || 0;
    // console.log(cartSubTotal , itemsCount)
      
     let ModifiedCart = []
      cartItems.map((item) => {
        if (item._id === productToDelete._id) {
          cartSubTotal -= item.quantity * productToDelete.price;
          itemsCount -= item.quantity;
          return item
        } else {
          ModifiedCart.push(item)
          return item
        }
      });
    return {
      cartItems: ModifiedCart,
      itemsCount: itemsCount,
      cartSubTotal: cartSubTotal,
    };}


    default:
      return state;
  }
};

export default CartReducer;
