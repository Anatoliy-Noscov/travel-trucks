import React from 'react';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCard/CamperCard';

// Временные mock данные для стилизации
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
    form: 'van',
    reviews: [{}, {}] as any[]
  },
  {
    id: '2', 
    name: 'Kuga Camper',
    price: 8500,
    rating: 4.2,
    location: 'Kyiv, Ukraine',
    description: 'Embark on a comfortable and convenient road trip with the Kuga Camper panel truck. Designed for small groups or couples.',
    adults: 4,
    children: 2,
    transmission: 'automatic',
    engine: 'diesel',
    AC: true,
    kitchen: true,
    TV: true,
    bathroom: true,
    form: 'fullyIntegrated',
    reviews: [{}, {}, {}, {}, {}, {}, {}, {}, {}, {}] as any[]
  },
  {
    id: '3',
    name: 'Road Bear C 23-25',
    price: 10000,
    rating: 4.5,
    location: 'Kyiv, Ukraine', 
    description: 'Embadventures, promising comfort, style, and the freedom to explore at your own pace.',
    adults: 6,
    children: 3,
    transmission: 'automatic',
    engine: 'diesel',
    AC: true,
    kitchen: false,
    TV: true,
    bathroom: true,
    form: 'alcove',
    reviews: [{}] as any[]
  }
];

export default function Catalog() {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {/* Блок фильтров */}
        <aside className={styles.filters}>
          <Filters />
        </aside>
        
        {/* Блок карточек */}
        <main className={styles.campers}>
          {mockCampers.map(camper => (
            <CamperCard key={camper.id} camper={camper} />
          ))}
          
          {/* Кнопка Load More */}
          <button className={styles.loadMore}>
            Load more
          </button>
        </main>
      </div>
    </div>
  );
}