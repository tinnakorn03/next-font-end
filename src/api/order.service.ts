import axios from '@/common/axios';
import  { useAuthHeader } from '@/common/auth/authHeader'
import { AxiosResponse } from 'axios';
import { IPropsOrder} from '@/redux/slices/orderSlice'; 
import { Response } from '@/common/types/Response' 

export const createOrder = async (
  order: IPropsOrder
): Promise<Response> => {
  try {
    const headers = useAuthHeader(); 
    const response: AxiosResponse = await axios({
      headers: headers,
      method: "POST",
      url: `/orders`,
      data: order,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}
 
