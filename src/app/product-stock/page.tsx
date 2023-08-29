"use client";
import { useState,useCallback, useEffect } from 'react'; 
import styles from './page.module.css'; 
import { Product } from '@/common/types/Product'
import { getProducts ,deleteProductById} from '@/api/product.service';  
import { Response } from '@/common/types/Response' 
import { frmPrice } from '@/common/formatted/Price';
import { useRouter } from 'next/navigation'  
import WithAuth  from '@/app/withAuth'; 

import CButton from '@components/button/Button'  
import IconifyIcon from '@components/icon'; 

const StockProduct = () => {
  const [products, setProducts] = useState<Product[]>([]); 
  const router = useRouter()  
      
  useEffect(() => {
    (async () => { 
      try {  const result:Response = await getProducts(1, 20); 
        setProducts(result.data);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } 
    })();
  }, []);

  const handleCreate = async () => {
    router.push('/product-stock/create') 
  };

  const handleEdit = async (product: Product) => { 
    localStorage.setItem('product_edit', JSON.stringify(product));
    router.push('/product-stock/edit?product_id=' + product?.product_id) 
  };

  const handleDelete = useCallback( async (product_id?:string) => {
    if (!product_id) { 
      return; 
    }

    const result: Response = await deleteProductById(product_id);
    if (result.status === 200) {  
      const updatedProducts = products.filter(product => product.product_id !== product_id); 
      setProducts(updatedProducts);
    }
    
  },[products]);

  
  return (
    <>  
      <main className={styles.main}> 
        <WithAuth>
          <div className={styles.header}>
            <h1>Stock</h1>
            <div className={styles.btnCreate}>
              <CButton name={'+ Add'} style={{fontSize:18}} onClick={handleCreate}/>
            </div> 
          </div>
          {products?.length ? 
          <>
            {/* Card view */}
            <div className={styles.maincard}> 
              {products.map(product => (
                <div className={styles.card} key={product.product_id}>
                    <div className={styles.imageContainer}>
                      <img src={product?.image || ''} alt={product.product_name} style={{borderRadius:5}} width="100%"/>
                    </div>
                    <div className={styles.cardDetails}>
                      <h2 style={{paddingBottom:'0.5rem'}}>{product.product_name}</h2>
                      <h4 className={styles.descriptionClamp}>{product.description}</h4>
                      <h2 style={{paddingBottom:'0.5rem'}}>Quantity : {product.quantity}</h2>
                      <h2 style={{paddingBottom:'0.5rem'}}>Price : { frmPrice(product.price) }</h2>
                      <div className={styles.cardActions}>
                        <IconifyIcon onClick={() => handleEdit(product)} color={'var(--font-color)'} icon="iconamoon:edit-thin" />
                        <IconifyIcon onClick={() => handleDelete(product?.product_id || '')} color={'red'} icon="pajamas:remove" />
                      </div>
                    </div>
                </div> 
              ))}
            </div>

            {/* Table view */}
            <div className={styles.tableResponsive}> 
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Image</th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Quantity</th>
                    <th>Price</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.product_id}>
                      <td><img src={product.image} alt={product.product_name} style={{borderRadius:5}} width="100%"/></td>
                      <td>{product.product_name}</td>
                      <td>
                        <div className={styles.descriptionTdClamp}>
                          {product.description}
                        </div>
                      </td>
                      <td>{product.quantity}</td>
                      <td>{ frmPrice(product.price) }</td>
                      <td>
                        <div className={styles.actionIcon}>
                        <IconifyIcon onClick={() => handleEdit(product)} color={'var(--font-color)'} icon="iconamoon:edit-thin" />
                        <IconifyIcon onClick={() => handleDelete(product.product_id)} color={'red'} icon="pajamas:remove" />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table> 
            </div> 

          </>:
            <div className={styles.tableloading}>Loading...</div>
          } 
        </WithAuth>
      </main>
    </>
  );
}

export default  StockProduct
