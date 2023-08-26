"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './page.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { frmPrice } from '@/common/formatted/Price';
import { getUser, setUser ,IUser} from '@/redux/slices/userSlice'; 
import { addProductToCart } from '@/redux/slices/orderSlice'; 

import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import IconifyIcon from '@components/icon';
import { Product } from '@/common/types/Product'
 
 
export default function ProductList() {  
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState<number>(1);
  const user:IUser = useSelector(getUser); 
  const [p, setProductInfo] = useState<Product>(); 
  
  const formattedPrice = useMemo(() => {
    return frmPrice(p?.price || 0)
  }, [p?.product_id]);

  
  useEffect(() => {
    (async ()=>{ 
      const productData = localStorage.getItem('product'); 
      const product: Product = productData ? JSON.parse(productData) : {} as Product;
      setProductInfo(product)  
    })()
  }, []);
 
  const handleIncrement = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0) { 
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const handleInputChange = (e:any) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) { 
      setQuantity(value);
    }
  };

  const addToCart = () => {
    if (p?.product_id) { 
      dispatch(
        addProductToCart({
          ...p,
          addItem: quantity
        })
      ); 
    }
  };


  return (
    <>
      <main className={styles.main}> 
        <article className={styles.breadcrumb}> 
          <span><Link href="/" className={styles.Home}> Home </Link> {'>'} {p?.product_name}</span> 
        </article> 
        <article className={styles.container}>
          <div className={styles.cardImg}>
            <img 
              className={styles.image} 
              src={p?.image} 
              alt={p?.product_name} 
              title={p?.product_name}
            />
          </div> 
          <div className={styles.cardContent}>
            <div className={styles.title}>
              <h1>{p?.product_name}</h1>
            </div>
            <div className={styles.price}>
              <span>{formattedPrice}</span>
            </div>
            <div className={styles.description}>
              <h4>{p?.description}</h4>
            </div>
            <div className={styles.qty}>
              <span className={styles.qty_title}>Quantity</span>
              <div className={styles.qty_body}>
                <button className={styles.minus} onClick={handleDecrement}>
                  <IconifyIcon color="#fff" icon="heroicons:minus-20-solid"/> 
                </button>
                <input  
                  className={styles.count}
                  // type="number" 
                  value={quantity} 
                  onChange={handleInputChange} 
                  min="0" 
                  max="999"
                />
                <button className={styles.plus } onClick={handleIncrement}>
                  <IconifyIcon color="#fff" icon="icon-park:plus"/> 
                </button>
              </div>
            </div>
            <div className={styles.addCart}>
              <button  className={styles.btnAddCart} onClick={addToCart}>Add to cart</button>
            </div>
          </div>

        </article>
      </main>
    </>
);

}