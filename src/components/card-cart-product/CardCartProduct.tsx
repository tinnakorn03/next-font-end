import React, { useState, useEffect, useMemo } from 'react'; 
import styles from './style.module.css';
import { frmPrice } from '@/common/formatted/Price';
import { Product } from '@/common/types/Product';
import IconifyIcon from '@components/icon';

type CardCartProductProps = {
  product: Product;
  onUpdate: (updatedProduct: Product) => void; 
  onRemove: (product_id: string) => void; 
};

const CardCartProduct: React.FC<CardCartProductProps> = ({ product, onUpdate, onRemove}) => {
  const { product_id, image, product_name, price, quantity } = product; 

  const [localQuantity, setLocalQuantity] = useState(product.quantity || 0);

  const formattedPrice = useMemo(() => {
    return frmPrice(localQuantity * price);
  }, [product_id, localQuantity]);

  const handleDecrement = () => {
    if (localQuantity > 0) {
      const newQty = (localQuantity - 1)
      setLocalQuantity(newQty);
      const updatedProduct = { ...product, quantity: newQty};
      onUpdate(updatedProduct); 
    }
  };

  const handleIncrement = () => { 
    const newQty = (localQuantity + 1)
    setLocalQuantity(newQty);
    const updatedProduct = { ...product, quantity: newQty };
    onUpdate(updatedProduct); 
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value >= 0) { 
      setLocalQuantity(value);
      const updatedProduct = { ...product, quantity: value};
      onUpdate(updatedProduct); 
    }
  };

  const handleRemove = () =>{
    onRemove(product_id)
  }


  return (
    <div className={styles.card}>
      <div className={styles.imgCol}>
        <img src={image} alt={product_name} title={product_name} className={styles.productImage} />
      </div>
      <div className={styles.detailCol}> 
        <span className={styles.title}>{product_name}</span>
        <div className={styles.qty}>
          <span className={styles.qty_title}>Quantity</span>
          <div className={styles.qty_body}>
            <button className={styles.minus} onClick={handleDecrement}>
              <IconifyIcon color="#fff" icon="heroicons:minus-20-solid"/> 
            </button>
            <input  
              className={styles.count} 
              value={quantity} 
              onChange={handleInputChange} 
              min="0" 
              max="999"
            />
            <button className={styles.plus} onClick={handleIncrement}>
              <IconifyIcon color="#fff" icon="icon-park:plus"/> 
            </button>
          </div>
        </div>
      </div>
      <div className={styles.priceCol}>
        <span className={styles.titlePrice}><h3>{formattedPrice}</h3></span>
        <div onClick={handleRemove}>
          <IconifyIcon color="red" width="24" height="24"  icon="pajamas:remove"/> {/* Replace this with your bin icon */}
        </div>
      </div>
    </div>
  );
}

export default CardCartProduct;
