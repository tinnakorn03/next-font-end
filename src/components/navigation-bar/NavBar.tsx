"use client";
import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link'; 
import IconifyIcon from '@components/icon';
import styles from './navber.module.css' 
import { useDispatch, useSelector } from 'react-redux';  
import { getOrder, IPropsOrder } from '@/redux/slices/orderSlice'; 
import { getUser, IUser} from '@/redux/slices/userSlice'; 
import { Menu, MenuItem } from '@mui/material';

import {  AppBar, Toolbar, Typography, Badge, IconButton, Modal, Box, Card, Container} from '@mui/material'; 
 

const NavBar: React.FC = () => { 
  const [orderCount, setOrderCount] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [scale, setScale] = useState<number>(1);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userActive, setUserActive] = useState<boolean>(true);
  const order:IPropsOrder = useSelector(getOrder); 
  const user:IUser = useSelector(getUser); 

  useEffect(() => { 
    if (user && user.token) {
      !userActive && setUserActive(true)
    }else{
      userActive && setUserActive(false)
    }
  }, [user]);
  
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
 
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => { 
    localStorage.removeItem('userToken'); 
    // handleMenuClose();
  };

  const LinkCart = useMemo(()=>{
    return orderCount > 0 ?
          <Link href={'/cart'}>
            <span className={styles.iconLinkCheckout}>
              <Badge badgeContent={orderCount} color="warning">  
                <IconifyIcon color={ orderCount>0 ? "var(--primary-color)" : 'var(--nav-icon)'} icon="streamline:shopping-cart-3-shopping-cart-checkout" />
              </Badge>
            </span>
          </Link>:
           <span className={styles.iconLinkCheckout}>
            <Badge badgeContent={orderCount} color="warning">  
              <IconifyIcon color={ orderCount>0 ? "var(--primary-color)" : 'var(--nav-icon)'} icon="streamline:shopping-cart-3-shopping-cart-checkout" />
            </Badge>
          </span>
  },[orderCount])
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
          <Link href={'/'}>
            <img src="/Logo.png" alt="Logo" className={styles.logo} />
          </Link>
           
          </Box>
          <div className={styles.iconContainer} style={{ transform: `scale(${scale})`, transformOrigin: 'left' }}>
            {LinkCart}
            <span className={styles.iconLinkUser} onClick={handleMenuOpen}>
              <Badge>
                <IconifyIcon color={userActive ? "var(--primary-color)" : "var(--nav-icon)"} icon="ep:user"/>
              </Badge>
            </span>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleLogout}>Log out</MenuItem>
              {/* You can add more menu items here if needed */}
            </Menu>
          </div>
        </Toolbar> 
      </AppBar> 
    </>
  );
}

export default NavBar;
