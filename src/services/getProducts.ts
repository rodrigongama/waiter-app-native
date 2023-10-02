import { Product } from '../types/Product';
import { api } from './api';

export async function getProducts() {
  try {
    const { data } = await api.get<Product[]>('/products');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
