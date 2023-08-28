import axios from '@/common/axios'; 
import { AxiosResponse } from 'axios';
import { Response } from '@/common/types/Response' 
import { User, LogIn } from '@/common/types/Auth'


export const logIn = async (
  user: User,
): Promise<Response> => {
  try { 
    const response: AxiosResponse = await axios({ 
      method: "POST",
      url: `/user/login`,
      data: { user: user.username, password: user.password, isRememberMe: user.isRememberMe} as LogIn,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
}

export const signUp = async (
  user: User,
): Promise<Response> => {
  try {  
    const response: AxiosResponse = await axios({ 
      method: "POST",
      url: `/user/register`,
      data: {...user},
    });


    return response.data;
  } catch (error) {
    throw error;
  }
}
 