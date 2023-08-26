import Image from 'next/image'
import styles from './page.module.css'
import Ads from './ads/page';
import ProductList from './product-list/page'; 

export default function Home() {
  return (
    <> 
      <main className={styles.main}> 
        <article style={{height:'40vh', paddingLeft:20,paddingRight:20}}>
          <Ads />
        </article>
        <center style={{height:'10vh'}}>
          <h1>NEW ARRIVALS</h1> 
        </center>
        <article>
          <ProductList /> 
        </article>  
      </main>
    </>
  )
}
