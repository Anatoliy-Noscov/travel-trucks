import React from "react";
import Link from 'next/link';
import styles from './Header.module.css';

const Header: React.FC = () => {
    return (
        <header className={styles.header}> 
            <div className={styles.container}>
                {/* Логотип - временно текст, потом заменим на изображение */}
                <Link href="/" className={styles.logo}>
                TravelTrucks
                </Link>

                <nav className={styles.nav}>
                    <Link href="/" className={styles.navLink}>Home</Link>
                    <Link href="/" className={styles.navLink}>Catalog</Link>

                </nav>

            </div>
        </header>
    )
}

export default Header;