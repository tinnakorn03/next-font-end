"use client";
import React, { useState, useEffect } from 'react';
import Link from 'next/link'; 
import IconifyIcon from '@components/icon';
import styles from './navber.module.css' 
import { useDispatch, useSelector } from 'react-redux';  
import { getOrder, IPropsOrder } from '@/redux/slices/orderSlice'; 

import {  AppBar, Toolbar, Typography, Badge, IconButton, Modal, Box, Card, Container} from '@mui/material'; 
 

const NavBar: React.FC = () => {
  const [orderCount, setOrderCount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const order:IPropsOrder = useSelector(getOrder); 
  
  useEffect(() => {
    setOrderCount(order?.total_qty ?? 0); 
  }, [order]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 300) {
        setIsMobile(true);
        setScale(0.8);  // Adjust this value based on your preference
      } else if (window.innerWidth <= 768) {
        setIsMobile(true);
        setScale(1);
      } else {
        setIsMobile(false);
        setScale(1);
      }
    };
    handleResize(); // Call once to set the state initially
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <>
      <AppBar position="static" className={styles.appBar}>
        <Toolbar > 
          <Box 
            display="flex" 
            flexGrow={1} 
            justifyContent={isMobile ? "flex-start" : "center"}
            style={{ transform: `scale(${scale})`, transformOrigin: 'left' }}
          >          
            <img src="/shopIcon.png" alt="Logo" className={styles.logo} />
            <Typography variant="h6">  
              <span className={styles.colorOnline}>Online</span>
              <span className={styles.colorShop}>Shop</span>
            </Typography>
          </Box>
          <div className={styles.iconContainer} style={{ transform: `scale(${scale})`, transformOrigin: 'left' }}>
            <Link href={'/cart'}>
              <span className={styles.iconLinkCheckout}>
                <Badge badgeContent={orderCount} color="warning">  
                  <IconifyIcon color="#000" icon="streamline:shopping-cart-3-shopping-cart-checkout" />
                </Badge>
              </span>
            </Link>
            <Link href={'/auth/login'}> 
              <span className={styles.iconLinkUser}>
                <Badge>
                  <IconifyIcon color="#000" icon="ep:user"/> 
                </Badge>
              </span>
            </Link>
          </div>
        </Toolbar> 
      </AppBar> 
    </>
  );
}

export default NavBar;
