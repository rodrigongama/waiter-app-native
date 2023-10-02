import { CartItem } from '../types/CartItem';
import { api } from './api';

export async function createOrder(
  selectedTable: string,
  cartItems: CartItem[]
) {
  try {
    await api.post('/orders', {
      table: selectedTable,
      products: cartItems.map((cartItem) => ({
        product: cartItem.product._id,
        quantity: cartItem.quantity,
      })),
    });
  } catch (error) {
    console.log(error);
  }
}
