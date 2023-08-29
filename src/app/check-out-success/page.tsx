"use client";
import Image from 'next/image'
import styles from './page.module.css'
import IconifyIcon from '@components/icon';
import CButton from '@components/button/Button'
import { useRouter } from 'next/navigation' 
import { useEffect, useState } from 'react';
import WithAuth  from '@/app/withAuth'; 
import { getOrder, updateOrderToCart,resetCart, IPropsOrder} from '@/redux/slices/orderSlice'; 
import { useDispatch, useSelector } from 'react-redux';

export default function CheckOutSuccess() {
  const router = useRouter() 
  const transactionNo = localStorage.getItem('transactionNo'); 
  const [orderId,setOrderId] = useState<string>(transactionNo || "");
  const dispatch = useDispatch();

  useEffect(()=>{
    setOrderId(pre =>{
      if(pre == transactionNo) return pre; 
      return transactionNo || "";
    })
    dispatch(resetCart())
    localStorage.removeItem('transactionNo');

  },[transactionNo])

  const checkContinueToShopping = () => { 
    router.push('/') 
  }

  return (
    <> 
      <main className={styles.main}>  
        <WithAuth>
          <div className={styles.container}>
            <IconifyIcon icon="clarity:success-standard-line" color="green" width="15vw" height="15vw" /> 
            <div className={styles.title}>
              <h1>Thank you for your purchase</h1>
            </div> 
            <div className={styles.detail}>
              <h3>your order number is {orderId}</h3>
            </div> 
            <div className={styles.checkout}>
              <CButton name={'Continue shopping'} onClick={checkContinueToShopping}/>
            </div>
          </div>
        </WithAuth>
      </main>
    </>
  )
}
