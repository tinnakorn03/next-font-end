"use client";
import Image from 'next/image'
import styles from './page.module.css'
import Ads from './ads/page';
import ProductList from './product-list/page'; 

export default function Home() { 
  const token = localStorage.getItem('userToken') || '';

  return (
    <> 
      <main className={styles.main}> 
        <article style={{flex:1, marginBottom: '2rem',height:300}}>
          <Ads heightAds={'25vw'}/>
        </article>
        <center style={{marginBottom: '2rem'}}>
          <h1>NEW ARRIVALS</h1> 
        </center>
        <article>
          <ProductList /> 
        </article>  
      </main>
    </>
  )
}
