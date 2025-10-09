import React from "react";
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCard/CamperCard';

const mockCampers = [
    {
        id: '1',
        name: 'Mavericks',
        price: 8000,
        rating: 4.4,
        location: 'Kyiv, Ukraine',
        description: 'Embrace simplicity and freedom with the Mavericks panel truck...',
        adults: 2,
        children: 1,
        transmission: 'automatic',
        engine: 'petrol',
        AC: true, 
        kitchen: true,
        TV: false,
        bathroom: false,
        form: 'van'
    }
];

export default function Catalog() {
    return (
        <div className={styles.container}>
            <div className={styles.content}>
            {/* block filters */}
            <aside className={styles.filters}>
                <Filters />
            </aside>

            {/*block cards*/}
            <main className={styles.campers}>
                {mockCampers.map(camper => (
                    <CamperCard key={camper.id} camper={camper} />
                ))}

                {/* button load more */}
                <button className={styles.loadMore}>
                    Load more
                </button>

            </main>
            </div>
        </div>
    )
}
 