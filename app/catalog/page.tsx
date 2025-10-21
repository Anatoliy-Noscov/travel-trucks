"use client";

import React, { useEffect, useState, useMemo } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';
import { Camper, FilterParams } from '@/types/campers'; // Добавьте FilterParams здесь

export default function Catalog() {
  const { 
    campers,
    isLoading, 
    fetchCampers, 
    error,
    filters
  } = useCampersStore();

  // Локальное состояние для пагинации
  const [visibleCount, setVisibleCount] = useState(4);
  
  // Функция фильтрации кемперов
  const filterCampers = (campers: Camper[], filters: FilterParams): Camper[] => {
    let filtered = [...campers];

    // Фильтр по локации
    if (filters.location && filters.location.trim() !== '') {
      filtered = filtered.filter(camper => 
        camper.location.toLowerCase().includes(filters.location!.toLowerCase())
      );
    }

    // Фильтр по типу транспортного средства
    if (filters.form && filters.form.trim() !== '') {
      filtered = filtered.filter(camper => camper.form === filters.form);
    }

    // Фильтр по трансмиссии
    if (filters.transmission && filters.transmission.trim() !== '') {
      filtered = filtered.filter(camper => camper.transmission === filters.transmission);
    }

    // Фильтр по оборудованию
    if (filters.AC) {
      filtered = filtered.filter(camper => camper.AC);
    }
    if (filters.kitchen) {
      filtered = filtered.filter(camper => camper.kitchen);
    }
    if (filters.TV) {
      filtered = filtered.filter(camper => camper.TV);
    }
    if (filters.bathroom) {
      filtered = filtered.filter(camper => camper.bathroom);
    }

    return filtered;
  };

  // Мемоизированные отфильтрованные кемперы
  const filteredCampers = useMemo(() => {
    return filterCampers(campers, filters);
  }, [campers, filters]);

  // Отображаемые кемперы (с пагинацией)
  const displayedCampers = useMemo(() => {
    return filteredCampers.slice(0, visibleCount);
  }, [filteredCampers, visibleCount]);

  // Есть ли еще кемперы для загрузки
  const hasMore = visibleCount < filteredCampers.length;

  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);

  // Сбрасываем пагинацию при изменении фильтров
  useEffect(() => {
    setVisibleCount(4);
  }, [filters]);

  const handleLoadMore = () => {
    if (hasMore) {
      const newCount = visibleCount + 4;
      setVisibleCount(newCount);
      console.log(`🔄 Load more: showing ${newCount} of ${filteredCampers.length}`);
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
            <strong>Debug:</strong> Showing {displayedCampers.length} of {filteredCampers.length} campers | 
            Total: {campers.length} | Has more: {hasMore ? 'YES' : 'NO'}
          </div>

          {filteredCampers.length === 0 && !isLoading ? (
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