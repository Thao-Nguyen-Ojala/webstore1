import {createSelector} from '@reduxjs/toolkit'

interface ItemType {
 
    id: string,
    product: string,
    salePrice: number,
    quantity: number
  
}

const cartItemsSelector = (state : any) => state.cart.cartItems;

//Count number of products in cart
export const cartItemsCountSelector = createSelector(
  cartItemsSelector, 
  cartItems => cartItems.reduce((count: number, item: ItemType) => count + item.quantity, 0)
)

//Count total of cart
export const cartTotalSelector = createSelector(
  cartItemsSelector,
  cartItems => cartItems.reduce((total: number, item: ItemType) => total + item.salePrice * item.quantity, 0)
)