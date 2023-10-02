import { Product } from '../types/Product';
import { api } from './api';

export async function getProductsByCategory(categoryId: string) {
  try {
    const { data } = await api.get<Product[]>(
      `/categories/${categoryId}/products`
    );

    return data;
  } catch (error) {
    return [];
  }
}
