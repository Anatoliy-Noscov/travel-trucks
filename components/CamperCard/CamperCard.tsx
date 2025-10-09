import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camper } from '@/types/campers';
import styles from './CamperCard.module.css';

interface CamperCardProps {
  camper: Camper;
}

const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
  return (
    <div className={styles.card}>
      {/* Временное изображение - потом заменим на gallery[0] */}
      <div className={styles.imageContainer}>
        <Image
          src="/images/camper-placeholder.jpg"
          alt={camper.name}
          width={290}
          height={310}
          className={styles.image}
        />
      </div>
      
      <div className={styles.content}>
        {/* Заголовок и цена */}
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.price}>
            <span className={styles.priceValue}>€{camper.price.toFixed(2)}</span>
          </div>
        </div>
        
        {/* Рейтинг и локация */}
        <div className={styles.meta}>
          <div className={styles.rating}>
            <span className={styles.star}>⭐</span>
            <span>{camper.rating}</span>
            <span className={styles.reviews}>({camper.reviews?.length || 0} Reviews)</span>
          </div>
          <div className={styles.location}>
            📍 {camper.location}
          </div>
        </div>
        
        {/* Описание */}
        <p className={styles.description}>
          {camper.description.length > 100 
            ? `${camper.description.substring(0, 100)}...` 
            : camper.description
          }
        </p>
        
        {/* Особенности */}
        <div className={styles.features}>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>👥</span>
            <span>{camper.adults} adults</span>
          </div>
          {camper.children > 0 && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🧒</span>
              <span>{camper.children} children</span>
            </div>
          )}
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⚙️</span>
            <span>{camper.transmission}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>⛽</span>
            <span>{camper.engine}</span>
          </div>
          {camper.AC && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>❄️</span>
              <span>AC</span>
            </div>
          )}
          {camper.kitchen && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>🍳</span>
              <span>Kitchen</span>
            </div>
          )}
        </div>
        
        {/* Кнопка */}
        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;