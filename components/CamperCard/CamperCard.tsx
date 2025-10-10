"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Camper } from '@/types/campers';
import styles from './CamperCard.module.css';
import  { useFavoritesStore } from '@/store/useFavoritesStore';

interface CamperCardProps {
  camper: Camper;
}

const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
  const {toggleFavorite, isFavorite} = useFavoritesStore();
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(camper);
  }

  // Правильно обрабатываем gallery как массив объектов
  const getImageUrl = () => {
    if (camper.gallery && 
        Array.isArray(camper.gallery) && 
        camper.gallery.length > 0 && 
        camper.gallery[0].original) {
      return camper.gallery[0].original; // ← используем original
    }
    
    // Fallback изображение
    return '/images/hero.jpg';
  };

  const imageUrl = getImageUrl();
  const favorite = isFavorite(camper.id);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={camper.name}
          width={290}
          height={310}
          className={styles.image}
        />

      <button 
          className={`${styles.favoriteButton} ${favorite ? styles.favoriteActive : ""}`}
            onClick={handleFavoriteClick}
            aria-label={favorite ? 'Remove from favorites': "Add to favorites"}>

          <svg
            width="24"
            height="24"
            viewBox='0 0 24 24'
            fill={favorite ? '#E44848' : 'none'}
            stroke={favorite ? '#E44848' : '#ffffff'}
            strokeWidth="2" >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>

          </svg>

      </button>
      </div>

      
      
      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{camper.name}</h3>
          <div className={styles.price}>
            <span className={styles.priceValue}>€{camper.price.toFixed(2)}</span>
          </div>
        </div>
        
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
        
        <p className={styles.description}>
          {camper.description.length > 100 
            ? `${camper.description.substring(0, 100)}...` 
            : camper.description
          }
        </p>
        
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
        
        <Link href={`/catalog/${camper.id}`} className={styles.button}>
          Show more
        </Link>
      </div>
    </div>
  );
};

export default CamperCard;