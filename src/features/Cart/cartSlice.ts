import { createSlice } from "@reduxjs/toolkit";
import { CartState } from "../../interfaces";

/*interface CartState {
  value: number,
  showMiniCart: boolean,
  cartItems: {
    id?: string,
    product?: {},
    quantity?: number
  }[]
}*/

const initialState: CartState = {
  value: 0,
  showMiniCart: false,
  cartItems: []
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    showMiniCart: state => {
      state.showMiniCart = true
    },
    hideMiniCart: state => {
      state.showMiniCart = false
    },
    addToCart: (state, action) => {
      // newItem = { id, product, quantity}
      const newItem = action.payload;
      const index = state.cartItems.findIndex( x => x.id === newItem.id);
      if (index >= 0) {
        //increase quantity
        state.cartItems[index].quantity += newItem.quantity
      } else {
        //add newItem to state
        state.cartItems.push(newItem)
      }

    },
    setQuantity: (state, action) => {
      const { id, quantity} = action.payload
      //check if the product is available in the cart
      const index = state.cartItems.findIndex( x => x.id === id)
      if (index >= 0) {
        state.cartItems[index].quantity = quantity
      }
    },
    removeFromCart: (state, action) => {
      const idToRemove = action.payload;
      state.cartItems = state.cartItems.filter( x => x.id !== idToRemove)
    },
  }
})

const { actions, reducer} = cartSlice;
export const { showMiniCart, hideMiniCart, addToCart, setQuantity } = actions;
export default reducer
