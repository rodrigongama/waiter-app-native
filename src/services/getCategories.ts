import { Category } from '../types/Category';
import { api } from './api';

export async function getCategories() {
  try {
    const { data } = await api.get<Category[]>('/categories');
    return data;
  } catch (error) {
    console.error(error);
    return [];
  }
}
