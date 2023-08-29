"use client";

import { useEffect,useState, ReactNode } from 'react';
import { validateToken, validateTokenAndRole } from '@/common/auth/validateToken';
import { useRouter } from 'next/navigation'

interface WithAuthProps {
  children: ReactNode;
}

const WithAuth: React.FC<WithAuthProps> = ({ children }) => {
  const router = useRouter() 
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const userRole = validateTokenAndRole();

    if (userRole) {
      // Do something with the role
      // console.log("Router :", router);
      // if(userRole==='admin' || userRole==='dev'){
      //   router.push('/product-stock');
      // }
      // else{ 
      //   router.push('/');
      // }
      setIsLoading(false);
    } else {
      //Token is invalid or expired
      router.push('/auth/login');
      setTimeout(()=>{ 
        setIsLoading(false); 
      },1000)
    } 
  }, []);
 
  if (isLoading) {
    return <div style={{flex:1,flexDirection:'column', alignItems:'center',justifyContent:'center'}}>Loading...</div>
  }
  
  return <>{children}</>;
};

export default WithAuth;
