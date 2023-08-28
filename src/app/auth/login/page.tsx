"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './page.module.css'; 
import jwt from 'jsonwebtoken';
import { useDispatch, useSelector } from 'react-redux'; 
import { frmPrice } from '@/common/formatted/Price';
import { getUser, setUser ,IUser} from '@/redux/slices/userSlice'; 
import { addProductToCart } from '@/redux/slices/orderSlice'; 
import CButton from '@components/button/Button'  
import Link from 'next/link';
import IconifyIcon from '@components/icon';
import { User, LogIn, DataTokenDecode} from '@/common/types/Auth'
import { useRouter } from 'next/navigation'
import AuthenticatorForm from '@components/auth-form/AuthenticatorForm'
import { logIn, signUp } from '@/api/auth.service';  
import { Response } from '@/common/types/Response' 
  
export default function LogIn() { 
  const router = useRouter();  
  const dispatch = useDispatch();

  const [u, setUserInfo] = useState<User>({
    username: '',
    password: '',
    isPdpa: false 
  });
  const handleSubmit = async (formData: User) => { 
    const result: Response = await logIn(formData);
    
    if (result.status === 200) {  
      const { token } = result.data; 
      const decodedUserData = jwt.decode(token) as User;
      const { data, iat, exp } = decodedUserData as DataTokenDecode;
      
      // check for token expiry here if needed
      // const isTokenExpired = Date.now() / 1000 > exp;

      dispatch(setUser(data as User));  
      localStorage.setItem('userToken', token); 

      if(data?.role === 'admin'){
        router.push('/product-stock'); 
      } else {
        router.push('/'); 
      }
      
    } else {
      alert('Log In: ' + result.message);
    } 
  };

  return (
    <> 
      <main className={styles.main}> 
        <AuthenticatorForm
          initialValues={u}
          onSubmit={handleSubmit}
          actionType={"login"}
        /> 
      </main>
    </>
  )
}
