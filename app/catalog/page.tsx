'use client'

import React, { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import styles from './page.module.css';
import Filters from '@/components/Filters/Filters';
import CamperCard from '@/components/CamperCard/CamperCard';
import Loader from '@/components/Loader/Loader';

export default function Catalog() {
  const { 
    filteredCampers, 
    isLoading, 
    hasMore, 
    loadMore, 
    fetchCampers 
  } = useCampersStore();

  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);
  
  useEffect(() => {
    if (filteredCampers.length > 0) {
      console.log('First camper data:', filteredCampers[0]);
      console.log('Gallery type:', typeof filteredCampers[0].gallery);
      console.log('Gallery value:', filteredCampers[0].gallery);
    }
  }, [filteredCampers]);

  const handleLoadMore = () => {
    loadMore();
  };

  if (isLoading && filteredCampers.length === 0) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <aside className={styles.filters}>
          <Filters />
        </aside>
        
        <main className={styles.campers}>
          {filteredCampers.length === 0 && !isLoading ? (
            <div className={styles.noResults}>
              <h3>No campers found</h3>
              <p>Try adjusting your filters</p>
            </div>
          ) : (
            <>
              {filteredCampers.map(camper => (
                <CamperCard key={camper.id} camper={camper} />
              ))}
              
              {hasMore && (
                <button 
                  className={styles.loadMore} 
                  onClick={handleLoadMore}
                  disabled={isLoading}
                >
                  {isLoading ? 'Loading...' : 'Load more'}
                </button>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}