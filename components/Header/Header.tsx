'use client'

import React from "react";
import Link from 'next/link';
import styles from './Header.module.css';
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header: React.FC = () => {
    const pathname = usePathname();
    return (
        <header className={styles.header}> 
            <div className={styles.container}>
                
                <Link href="/" className={styles.logo}>
                    <Image 
                    src="/images/Logo.svg"
                    alt="TravelTrucks"
                    width={136} 
                    height={16}
                    priority/>
                </Link>

                <Link 
                  href="/" 
                  className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}
                >
                  Home
                </Link>
                <Link 
                  href="/catalog" 
                  className={`${styles.navLink} ${pathname === '/catalog' ? styles.active : ''}`}
                >
                  Catalog
                </Link>
            </div>
        </header>
    )
}

export default Header;