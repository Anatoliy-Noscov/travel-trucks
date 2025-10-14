"use client";

import React, { useEffect } from 'react';
import { useCampersStore } from '@/store/useCampersStore';
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
    fetchCampers, 
  } = useCampersStore();

  useEffect(() => {
    fetchCampers();
  }, [fetchCampers]);

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
          
              <ul className={styles.campersGrid}>
                {filteredCampers.map(camper => (
                  <li key={camper.id}>
                       <CamperCard  camper={camper} />
                  </li>
                 
                ))}
              </ul>

              {hasMore && (
                <div className={styles.loadMoreContainer}>
                  <button 
                    className={styles.loadMore} 
                    onClick={handleLoadMore}
                    disabled={isLoading}
                  >
                    {isLoading ? 'Loading...' : 'Load more'}
                  </button>
                </div>
              )}

              {!hasMore && filteredCampers.length > 0 && (
                <div className={styles.endMessage}>
                  <p>You reached the end of the list</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}