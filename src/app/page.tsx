"use client";
import React, { useState, useEffect } from 'react';
import styles from './page.module.css'
import Ads from './ads/page'; 
import ProductList from './product-list/page'; 
import WithAuth  from '@/app/withAuth'; 

export default function Home() {  
  const PrivatePage = () => {
    return (
      <>
        <article style={{ flex: 1, marginBottom: '2rem', height: 300 }}>
          <Ads heightAds={'25vw'} />
        </article>
        <center style={{ marginBottom: '2rem' }}>
          <h1>NEW ARRIVALS</h1> 
        </center>
        <article>
          <ProductList /> 
        </article>  
      </>
    );
  }
  
  return (
    <> 
      <main className={styles.main}> 
        <WithAuth>
          <PrivatePage/>
        </WithAuth>
      </main>
    </>
  );
}
