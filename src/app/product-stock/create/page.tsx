"use client";
import { useState, useEffect, useMemo} from 'react'; 
import styles from './page.module.css'; 
import { useDispatch, useSelector } from 'react-redux';
import { frmPrice } from '@/common/formatted/Price';
import { getUser, setUser ,IUser} from '@/redux/slices/userSlice'; 
import { addProductToCart } from '@/redux/slices/orderSlice'; 
import CButton from '@components/button/Button' 
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import Link from 'next/link';
import IconifyIcon from '@components/icon';
import { Product } from '@/common/types/Product'
import { useRouter } from 'next/navigation'
import ProductForm from '@components/product-form/ProductForm'
import { getProductById, createProduct, updateProduct } from '@/api/product.service';  
import { Response } from '@/common/types/Response' 
import WithAuth  from '@/app/withAuth'; 
 
 
export default function CreateProduct() { 
  const router = useRouter();  
  const [p, setProductInfo] = useState<Product>({
    product_id: 'create-from',
    product_name: '',
    description: '',
    quantity: 0,
    price: 0,
    image: ''
  });  

  const handleSubmit = async (formData: Product) => { 
    const result: Response = await createProduct(formData);
    if (result.status === 200) {  
      router.push('/product-stock') 
    }else{
      alert('createProduct :'+result.message)
    } 
  };

  return (
    <> 
      <main className={styles.main}> 
        <WithAuth>
          <ProductForm
            initialValues={p}
            onSubmit={handleSubmit}
            actionType={"create"}
          /> 
        </WithAuth>
      </main>
    </>
  )
}
