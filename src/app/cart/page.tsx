"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './page.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { frmPrice } from '@/common/formatted/Price';
import { getUser, setUser ,IUser} from '@/redux/slices/userSlice'; 
import { getOrder, updateOrderToCart,resetCart, IPropsOrder} from '@/redux/slices/orderSlice'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation' 
import IconifyIcon from '@components/icon';
import { Product } from '@/common/types/Product'
import CardCartProduct from '@components/card-cart-product/CardCartProduct';
import CButton from '@components/button/Button'
import { Response } from '@/common/types/Response' 
import WithAuth  from '@/app/withAuth'; 

// API 
import { createOrder } from '@/api/order.service';  

 
export default function Cart() {  
  const router = useRouter() 
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const user:IUser = useSelector(getUser); 
  const order:IPropsOrder = useSelector(getOrder); 
 
  const updateOrderData = (updatedProduct: Product): void => {
     
      const updatedOrders = order.orders.map(product => 
          product.product_id === updatedProduct.product_id ? updatedProduct : product
      );

      // Calculate total_qty and total_price
      const total_qty = updatedOrders.reduce((sum, product) => sum + (product.quantity || 0), 0);
      const total_price = updatedOrders.reduce((sum, product) => sum + (product.quantity || 0) * (product.price || 0), 0);
      const upData ={
        ...order,
        orders: updatedOrders,
        total_qty,
        total_price
      } 
      dispatch(updateOrderToCart(upData)); 
  };

  const removeOrderData = (removedProductId: string): void => {
    // Filter out the product that needs to be removed
    const updatedOrders = order.orders.filter(product => product.product_id !== removedProductId);
  
    // Calculate total_qty and total_price
    const total_qty = updatedOrders.reduce((sum, product) => sum + (product.quantity || 0), 0);
    const total_price = updatedOrders.reduce((sum, product) => sum + (product.quantity || 0) * (product.price || 0), 0);
  
    const updatedData = {
      ...order,
      orders: updatedOrders,
      total_qty,
      total_price
    };
    
    dispatch(updateOrderToCart(updatedData));
  };
    
  const checkOut = async () => {
    if (order) {  
      const sendOrder:IPropsOrder = {
        ...order,
        userId:  user?.userId
      };  

      if(sendOrder?.orders?.length){ 
        const result:Response = await createOrder(sendOrder);  
        if(result.status === 200){
          const {message, transactionNo}:{message:string, transactionNo:string} = result?.data;
          localStorage.setItem('transactionNo', JSON.stringify(transactionNo));
          router.push('/check-out-success') 
        }else{
          const {message}:{message:string} = result?.data;
          alert('API error is '+message)
        } 
      }
    }
  };
 
  return (
    <>
      <main className={styles.main}>  
        <WithAuth>
          <article className={styles.container}>
            <div className={styles.itemList}>
              <div className={styles.title}>
                <h1>Cart</h1>
              </div>
              {order?.orders?.length ? 
                order?.orders.map((product:Product, index:number) => (
                  <CardCartProduct key={index} product={product} onUpdate={updateOrderData} onRemove={removeOrderData}/>
                )) :
                <div className={styles.boxdiv}>
                  <img src="/empty-box.png" alt="EmptyBox" className={styles.emptybox} />
                </div>
              } 
            </div> 
            <div className={styles.summary}>
              <div className={styles.title}>
                <h1>Summary</h1>
              </div>
              <div className={styles.detail}>
                <div className={styles.detail_item}>
                  <h4>Subtotal</h4>
                  <h4>{frmPrice((order?.total_price || 0),true)}</h4>
                </div>
                <div className={styles.detail_item}>
                  <h4>Estimated Deliverry</h4>
                  <h4>{frmPrice((order?.deliverry_price|| 0),true)}</h4>
                </div>
              </div>
              <div className={styles.total}>
                  <h2>Total</h2>
                  <h2>{frmPrice(((order?.total_price || 0) + (200|| 0)),true)}</h2>
              </div>
              <div className={styles.checkout}>
                <CButton name={'Checkout'} onClick={checkOut}/>
              </div>
            </div> 
          </article>
        </WithAuth>
      </main>
    </>
);

}
