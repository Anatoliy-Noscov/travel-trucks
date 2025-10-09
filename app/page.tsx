import  styles from "./page.module.css";
import React from 'react';
import Link from 'next/link';

export default async function Home() {


  return (

      <div className={styles.container}>
        {/*background*/}
        <section className={styles.hero}>
          <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Campers of your dreams</h1>
          <p className={styles.textHome}>You can find everything you want in our catalog</p>

          <Link href="/catalog" className={styles.heroButton}><span className={styles.textButton}>View now</span></Link>
          </div>
        </section>
      </div>


  )
}
