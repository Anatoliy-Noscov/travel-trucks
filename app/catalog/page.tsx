"use client";

import React, { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';

export default function Catalog() {
  const { 
    campers,
    isLoading, 
    hasMore, 
    loadMore, 
    fetchCampers, 
    error,
    totalCampers,
    currentPage
  } = useCampersStore();

  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);

  const handleLoadMore = () => {
    console.log('🔄 Load more clicked');
    if (!isLoading && hasMore) {
      loadMore();
    }
  };

  console.log('📊 Catalog State:', {
    campers: campers.length,
    totalCampers,
    currentPage,
    hasMore,
    isLoading
  });

  // Проверяем дублирующиеся ID для отладки
  const duplicateIds = campers.map(camper => camper.id).filter((id, index, array) => array.indexOf(id) !== index);
  if (duplicateIds.length > 0) {
    console.warn('⚠️ Duplicate camper IDs found:', duplicateIds);
  }

  if (isLoading && campers.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <aside className={styles.filters}>
          <Filters />
        </aside>
        
        <main className={styles.campers}>
          {error && (
            <div className={styles.error}>
              <h3>Error loading campers</h3>
              <p>{error}</p>
            </div>
          )}

          {campers.length === 0 && !isLoading ? (
            <div className={styles.noResults}>
              <h3>No campers found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className={styles.campersGrid}>
                {campers.map((camper, index) => (
                  <CamperCard 
                    key={`${camper.id}-${index}-${camper.name}`} // Уникальный ключ
                    camper={camper} 
                  />
                ))}
              </div>

              {hasMore && (
                <div className={styles.loadMoreContainer}>
                  <button 
                    className={styles.loadMore} 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : `Load more`}
                  </button>
                </div>
              )}

              {!hasMore && campers.length > 0 && (
                <div className={styles.endMessage}>
                  <p>Youve seen all {campers.length} available campers</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}