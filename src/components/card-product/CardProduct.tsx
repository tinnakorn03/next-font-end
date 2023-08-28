"use client";
import React, { useState, useEffect, useMemo} from 'react'; 
import styles from './style.module.css';
import { Card, CardContent, CardMedia, Typography } from '@mui/material';
import { frmPrice } from '@/common/formatted/Price';
import { useRouter } from 'next/navigation'
import { Product } from '@/common/types/Product'

type CardProductProps = {
  product: Product;
};

const CardProduct: React.FC<CardProductProps> = ({product}) => {
  const router = useRouter()
  const { product_id, image, product_name, price } = product;
  const [unhover, setUnhover] = useState(false);

  const handleMouseLeave = () => {
    setUnhover(true);
    setTimeout(() => setUnhover(false), 300); // 300ms is the duration of the transition
  };
  
  const formattedPrice = useMemo(() => {
    return frmPrice(price)
  }, [product_id]);

  const onProductClick = () =>{ 
    localStorage.setItem('product', JSON.stringify(product));
    router.push('/product-detail?product_id=' + product_id)  
  }

  return (
    <Card onClick={onProductClick} 
      className={`${styles.card} ${unhover ? styles.unhover : ''}`}
      onMouseLeave={handleMouseLeave} 
    >
      <CardMedia
        component="img"
        alt={product_name}
        height="250" 
        image={image}
        title={product_name}
      />
      <CardContent>
        <Typography variant="h6" color="textPrimary" component="div">
          <span>{product_name}</span>
        </Typography>
        <Typography variant="body1" color="textSecondary" component="div"> 
          <span>{formattedPrice}</span>
        </Typography>
      </CardContent>
    </Card>
  );
}

export default React.memo(CardProduct);
