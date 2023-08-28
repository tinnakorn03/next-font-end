"use client";
import Image from 'next/image'
import styles from './page.module.css'
import IconifyIcon from '@components/icon';
import CButton from '@components/button/Button'
import { useRouter } from 'next/navigation' 
import { useEffect, useState } from 'react';

export default function CheckOutSuccess() {
  const router = useRouter() 
  const transactionNo = localStorage.getItem('transactionNo'); 
  const [orderId,setOrderId] = useState<string>(transactionNo || "");

  useEffect(()=>{
    setOrderId(pre =>{
      if(pre == transactionNo) return pre; 
      return transactionNo || "";
    })

    localStorage.removeItem('transactionNo');

  },[transactionNo])

  const checkContinueToShopping = () => { 
    router.push('/') 
  }

  return (
    <> 
      <main className={styles.main}>  
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
      </main>
    </>
  )
}
