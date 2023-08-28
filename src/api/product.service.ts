import axios from '@/common/axios';
import  { useAuthHeader } from '@/common/auth/authHeader'
import { AxiosResponse } from 'axios';
import { Response } from '@/common/types/Response' 
import { Product } from '@/common/types/Product'


export const getProducts = async (
  page: number = 1,
  limit: number = 10 
): Promise<Response> => {
  try {
    const headers = useAuthHeader(); 
    const response: AxiosResponse = await axios({
      headers: headers,
      method: "GET",
      url: `/product`,
      params: { page, size:limit},
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const getProductById = async (
  product_id: string 
): Promise<Response> => {
  try {
    const headers = useAuthHeader(); 
    const response: AxiosResponse = await axios({
      headers: headers,
      method: "GET",
      url: `/product/${product_id}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}


export const createProduct = async (
  product: Product 
): Promise<Response> => {
  try {
    delete product.isDelete;
    delete product.product_id;
    console.log({ product }) 
    const headers = useAuthHeader(); 
    const response: AxiosResponse = await axios({
      headers: headers,
      method: "POST",
      url: `/product`,
      data: {...product}
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const updateProduct = async (
  product: Product 
): Promise<Response> => {
  try {
    delete product.isDelete;
    console.log({ product })
    const headers = useAuthHeader(); 
    const response: AxiosResponse = await axios({
      headers: headers,
      method: "PUT",
      url: `/product`,
      data: {...product}
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}


export const deleteProductById = async (
  product_id: string 
): Promise<Response> => {
  try {
    const headers = useAuthHeader(); 
    const response: AxiosResponse = await axios({
      headers: headers,
      method: "DELETE",
      url: `/product/${product_id}`,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

