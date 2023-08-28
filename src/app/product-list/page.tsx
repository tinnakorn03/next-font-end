"use client";
import { useState, useEffect } from 'react';
import CardProduct from '@components/card-product/CardProduct';
import styles from './page.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getUser, setUser ,IUser} from '@/redux/slices/userSlice';
import { FormControl, Select, MenuItem } from '@mui/material';
import { Product } from '@/common/types/Product'
import { getProducts } from '@/api/product.service';  
import { Response } from '@/common/types/Response' 


export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]); 
  const [sortOrder, setSortOrder] = useState<'HIGH_TO_LOW' | 'LOW_TO_HIGH' | null>(null); 
  const user:IUser = useSelector(getUser); 

  useEffect(() => { 
    if (user && user.token) {
      localStorage.setItem('userToken', user.token);
    }
  }, [user]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result:Response = await getProducts(1, 20); 
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    }

    fetchProducts();
  }, []);

  useEffect(() => {
    let sortedProducts = [...products];
    if (sortOrder === 'HIGH_TO_LOW') {
      sortedProducts.sort((a, b) => b.price - a.price);
    } else if (sortOrder === 'LOW_TO_HIGH') {
      sortedProducts.sort((a, b) => a.price - b.price);
    }
    setProducts(sortedProducts);
  }, [sortOrder]);

  return (
    <>
      <div className={styles.sortContainer}>
        {!products?.length ? null : 
        <select 
          style={{padding:'0.5rem'}}
          value={sortOrder || ''}
          onChange={(e) => setSortOrder(e.target.value as 'HIGH_TO_LOW' | 'LOW_TO_HIGH')}
          className={styles.sortDropdown} 
        >
          <option value=""><span>Sort by Price</span></option>
          <option value="HIGH_TO_LOW">High to Low</option>
          <option value="LOW_TO_HIGH">Low to High</option>
        </select>}
      </div>
      <div className={styles.productListContainer}>
        {products?.length ? 
          products.map((product:Product, index:number) => (
            <CardProduct
              key={index}
              product={product}
            />
          )) :
          <div>Loading...</div>
        }
      </div>
    </>
  );
}
