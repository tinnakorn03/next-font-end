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
import { User, LogIn } from '@/common/types/Auth'
import { useRouter } from 'next/navigation'
import AuthenticatorForm from '@components/auth-form/AuthenticatorForm'
import { logIn, signUp } from '@/api/auth.service';  
import { Response } from '@/common/types/Response' 
 
 
 
export default function SignUp() { 
  const router = useRouter();   
  const [u, setUserInfo] = useState<User>({
    username: '',
    password: '',
    isPdpa: false 
});
  const handleSubmit = async (formData: User) => { 
    const result: Response = await signUp(formData);
    
    switch(result.status){
      case 200 :
        router.push('/auth/login')  
      break;
      case 202 :
        alert('Sign Up: '+ result.data.message)
      break;
      default :
        alert('Sign Up: '+result.message)
    } 
  };

  return (
    <> 
      <main className={styles.main}> 
        <AuthenticatorForm
          initialValues={u}
          onSubmit={handleSubmit}
          actionType={"signup"}
        /> 
      </main>
    </>
  )
}
