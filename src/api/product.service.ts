import axios from '@/common/axios';
import  { useAuthHeader } from '@/common/auth/authHeader'
import { AxiosResponse } from 'axios';

interface Response {
  data?: any;
  message: string;
  status: number;
}

export const getProducts = async (
  page: number = 1,
  limit: number = 10,
  token: string | null 
): Promise<Response> => {
  try {
    const headers = useAuthHeader(token); 
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
 
