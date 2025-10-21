"use client";

import React, { useEffect, useState } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';

export default function Catalog() {
  const { 
    campers,
    isLoading, 
    fetchCampers, 
    error,
    getFilteredCampers
  } = useCampersStore();

  // Локальное состояние для пагинации
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Получаем отфильтрованные кемперы
  const filteredCampers = getFilteredCampers();
  
  // Отображаемые кемперы (с пагинацией)
  const displayedCampers = filteredCampers.slice(0, visibleCount);
  
  // Есть ли еще кемперы для загрузки
  const hasMore = visibleCount < filteredCampers.length;

  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);

  // Сбрасываем пагинацию при изменении фильтров
  useEffect(() => {
    setVisibleCount(4);
  }, [filteredCampers.length]);

  const handleLoadMore = () => {
    if (hasMore) {
      setVisibleCount(prev => prev + 4);
    }
  };

  console.log('📊 Catalog State:', {
    totalCampers: campers.length,
    filteredCampers: filteredCampers.length,
    displayedCampers: displayedCampers.length,
    visibleCount,
    hasMore
  });

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

          {/* Отладочная информация */}
          <div style={{ 
            marginBottom: '10px', 
            padding: '8px 12px', 
            backgroundColor: '#f8f9fa', 
            borderRadius: '4px',
            fontSize: '12px', 
            color: '#6c757d',
            border: '1px solid #dee2e6'
          }}>
            <strong>Showing:</strong> {displayedCampers.length} of {filteredCampers.length} campers | 
            <strong> Total:</strong> {campers.length} | 
            <strong> Has more:</strong> {hasMore ? 'YES' : 'NO'}
          </div>

          {displayedCampers.length === 0 && !isLoading ? (
            <div className={styles.noResults}>
              <h3>No campers found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <>
              <div className={styles.campersGrid}>
                {displayedCampers.map(camper => (
                  <CamperCard key={camper.id} camper={camper} />
                ))}
              </div>

              {hasMore && (
                <div className={styles.loadMoreContainer}>
                  <button 
                    className={styles.loadMore} 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : `Load more (${filteredCampers.length - displayedCampers.length} remaining)`}
                  </button>
                </div>
              )}

              {!hasMore && displayedCampers.length > 0 && (
                <div className={styles.endMessage}>
                  <p>Youve seen all {displayedCampers.length} available campers</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}