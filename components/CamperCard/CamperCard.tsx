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

const formatLocation = (location: string) => {
  if (location.includes(',')) {
    const [country, city] = location.split(',').map(part=> part.trim());
    return `${city}, ${country}`;
  }
  return location;
}

const CamperCard: React.FC<CamperCardProps> = ({ camper }) => {
  const {favorites, toggleFavorite} = useFavoritesStore();
  const isFavorite = favorites.some(fav => fav.id === camper.id);

  // const {toggleFavorite, isFavorite} = useFavoritesStore();
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
  // const favorite = isFavorite(camper.id);

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageUrl}
          alt={camper.name}
          width={292}
          height={320}
          className={styles.image}
        />
      </div>

      
      <div className={styles.content}>
        <div className={styles.header}>
          
          <h3 className={styles.title}>{camper.name}</h3>

          <div className={styles.headerHeart}>
          <div className={styles.price}>
            <span className={styles.priceValue}>€{camper.price.toFixed(2)}</span>
            <button 
            className={`${styles.favoriteButton} ${isFavorite ? styles.favoriteActive : ""}`}
            onClick={handleFavoriteClick}
            aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
          >
            {isFavorite ? (
              <img src="/images/HeartActive.svg" alt="Active heart" width="24" height="21"/>
            ) : (
              <img src="/images/Heart.svg" alt="Heart" width="24" height="21"/>
            )}
          </button>
          </div>
        
          </div>
          
        </div>
        
        <div className={styles.meta}>
          <div className={styles.rating}>
            <span className={styles.star}>
            <img src="/images/StarActive.svg" alt="icon" width="16" height="16"/>
            </span>
            <span>{camper.rating}</span>
            <span className={styles.reviews}>({camper.reviews?.length || 0} Reviews)</span>
          </div>
          <div className={styles.location}>
          <img src="/images/Map.svg" alt="icon" width="16" height="16"/>
             {formatLocation(camper.location)}
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
            <span className={styles.featureIcon}>
            <img src="/images/Automatic.svg" alt="icon" width="20" height="20"/>
            </span>
            <span>{camper.transmission}</span>
          </div>
          <div className={styles.feature}>
            <span className={styles.featureIcon}>
            <img src="/images/Petrol.svg" alt="icon" width="20" height="20"/>
            </span>
            <span>{camper.engine}</span>
          </div>
          {camper.AC && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/AC.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>AC</span>
            </div>
          )}
          {camper.kitchen && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Kitchen.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Kitchen</span>
            </div>
          )}
          {camper.radio && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Radio.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Radio</span>
            </div>
          )}
          {camper.bathroom && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Bathroom.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Bathroom</span>
            </div>
          )}
          {camper.refrigerator && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Refrigerator.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Refrigerator</span>
            </div>
          )}
          {camper.microwave && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Microwave.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Microwave</span>
            </div>
          )}
          {camper.gas && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Gas.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Gas</span>
            </div>
          )}
          {camper.water && (
            <div className={styles.feature}>
              <span className={styles.featureIcon}>
              <img src="/images/Water.svg" alt="icon" width="20" height="20"/>
              </span>
              <span>Water</span>
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