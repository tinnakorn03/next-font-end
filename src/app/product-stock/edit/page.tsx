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

 
 
export default function EditProduct(props:any) {
  const { searchParams } = props;
  const { product_id } = searchParams;
  const router = useRouter(); 
  const obj:Product = {
    product_id: 'create-from',
    product_name: '',
    description: '',
    quantity: 0,
    price: 0,
    image: ''
  }
  const [loading, setLoading] = useState<Boolean>(true); 
  const [p, setProductInfo] = useState<Product>(); 
  const isEditMode = useMemo(() => Boolean(p), [p]);

   
  useEffect(() => {
    (async () => {
      const productData = localStorage.getItem('product_edit'); 
      if (!productData) { 

        if (!product_id) {
          alert('Check product_id is '+product_id)
        }

        const result: Response = await getProductById(product_id);
        if (result.status === 200) { 
          setProductInfo(result.data);
        }
        setLoading(false)
      } else { 
        const product: Product = JSON.parse(productData);
        setProductInfo(product); 
        localStorage.removeItem('product_edit');
        setLoading(false)
      }
    })();
  }, []);

  const handleSubmit = async (formData: Product) => {
    if(isEditMode){
      const result: Response = await updateProduct(formData);
      if (result.status === 200) { 
        router.push('/product-stock') 
      }else{
        alert('updateProduct :'+result.message)
      }
    }else{
      const result: Response = await createProduct(formData);
      if (result.status === 200) {  
        router.push('/product-stock') 
      }else{
        alert('createProduct :'+result.message)
      }
    } 
  };

  return (
    <>  
      <main className={styles.main}> 
        <WithAuth>
          {!loading ? (
              <ProductForm
                initialValues={isEditMode ? p : obj}
                onSubmit={handleSubmit}
                actionType={isEditMode ? "edit" : "create"}
              />
            ) : (
              <div>Loading...</div>
            )} 
        </WithAuth>
      </main> 
    </>
  )
}
