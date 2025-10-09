import React from "react";
import Link from 'next/link';
import styles from './Header.module.css';
import Image from "next/image";

const Header: React.FC = () => {
    return (
        <header className={styles.header}> 
            <div className={styles.container}>
                
                <Link href="/" className={styles.logo}>
                <Image 
                    src="/images/Logo.svg"
                    alt="TravelTrucks"
                    width={136} 
                    height={16}
                    priority

                />
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}><span className={styles.textNav}>Home</span></Link>
                    <Link href="/" className={styles.navLink}><span className={styles.textNav}>Catalog</span></Link>

                </nav>

            </div>
        </header>
    )
}

export default Header;