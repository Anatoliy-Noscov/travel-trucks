'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useCampersStore } from '@/store/useCampersStore';
import { useFavoritesStore } from '@/store/useFavoritesStore';
import { Camper } from '@/types/campers';
import styles from './page.module.css';
import Loader from '@/components/Loader/Loader';
import SuccessModal from '@/components/SuccessModal/SuccessModal';

export default function CamperDetails() {
  const params = useParams();
  const id = params.id as string;

  const { fetchCamperById, isLoading } = useCampersStore();
  const { favorites, toggleFavorite } = useFavoritesStore();
  const [camper, setCamper] = useState<Camper | null>(null);
  const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    comment: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  const isFavorite = camper ? favorites.some(fav => fav.id === camper.id) : false;

  const handleFavoriteClick = () => {
    if (camper) {
      toggleFavorite(camper);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Имитация отправки данных
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccessModalOpen(true);
      setFormData({
        name: '',
        email: '',
        date: '',
        comment: ''
      });
    }, 1000);
  };

  const handleCloseModal = () => {
    setIsSuccessModalOpen(false);
  };

  useEffect(() => {
    const loadCamper = async () => {
      const camperData = await fetchCamperById(id);
      setCamper(camperData);
    };

    if (id) {
      loadCamper();
    }
  }, [id, fetchCamperById]);

  if (isLoading || !camper) {
    return <Loader />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.camperHeader}>
        <h1 className={styles.camperTitle}>{camper.name}</h1>
        
        <div className={styles.camperMeta}>
          <div className={styles.rating}>
            <img src="/images/StarActive.svg" alt="Rating" className={styles.ratingIcon} />
            <span>{camper.rating}</span>
            <span 
              className={styles.reviewsCount}
              onClick={() => setActiveTab('reviews')}
            >
              ({camper.reviews?.length || 0} Reviews)
            </span>
          </div>
          
          <div className={styles.location}>
            <img src="/images/Map.svg" alt="Location" className={styles.locationIcon} />
            <span>{camper.location}</span>
          </div>
        </div>

        <div className={styles.priceSection}>
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

      <div className={styles.gallery}>
        {camper.gallery && camper.gallery.length > 0 ? (
          <div className={styles.galleryContainer}>
            {camper.gallery.slice(0, 4).map((image, index) => (
              <div key={index} className={styles.galleryImage}>
                <img 
                  src={image.original} 
                  alt={`${camper.name} ${index + 1}`} 
                />
              </div>
            ))}
          </div>
        ) : (
          <div className={styles.noImage}>
            <p>No images available</p>
          </div>
        )}
      </div>

      <p className={styles.description}>
        {camper.description}
      </p>

      <div className={styles.tabHeaders}>
        <button
          className={`${styles.tabHeader} ${activeTab === 'features' ? styles.active : ''}`}
          onClick={() => setActiveTab('features')}
        >
          Features
        </button>
        <button
          className={`${styles.tabHeader} ${activeTab === 'reviews' ? styles.active : ''}`}
          onClick={() => setActiveTab('reviews')}
        >
          Reviews
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.leftColumn}>
          <div className={styles.tabs}>
            <div className={styles.tabContent}>
              {activeTab === 'features' ? (
                <div className={styles.features}>
                  <div className={styles.containerFeaturesGrid}>
                    <div className={styles.featuresGrid}>
                      {camper.transmission && <div className={styles.featureItem}>
                        <img src="/images/Automatic.svg" alt="icon" width="20" height="20"/>
                        {camper.transmission}
                      </div>}
                      {camper.engine && <div className={styles.featureItem}>
                        <img src="/images/Petrol.svg" alt="icon" width="20" height="20"/>
                        {camper.engine}
                      </div>}
                      {camper.AC && <div className={styles.featureItem}>
                        <img src="/images/AC.svg" alt="icon" width="20" height="20"/>
                        AC
                      </div>}
                      {camper.bathroom && <div className={styles.featureItem}>
                        <img src="/icons/bathrom.svg" alt="icon" width="20" height="20"/>
                        Bathroom
                      </div>}
                      {camper.kitchen && <div className={styles.featureItem}>
                        <img src="/images/Kitchen.svg" alt="icon" width="20" height="20"/>
                        Kitchen
                      </div>}
                      {camper.TV && <div className={styles.featureItem}>
                        <img src="/icons/tv.svg" alt="icon" width="20" height="20"/>
                        TV
                      </div>}
                      {camper.radio && <div className={styles.featureItem}>
                        <img src="/images/Radio.svg" alt="icon" width="20" height="20"/>
                        Radio
                      </div>}
                      {camper.refrigerator && <div className={styles.featureItem}>
                        <img src="/images/Refrigerator.svg" alt="icon" width="20" height="20"/>
                        Refrigerator
                      </div>}
                      {camper.microwave && <div className={styles.featureItem}>
                        <img src="/images/Microwave.svg" alt="icon" width="20" height="20"/>
                        Microwave
                      </div>}
                      {camper.gas && <div className={styles.featureItem}>
                        <img src="/images/Gas.svg" alt="icon" width="20" height="20"/>
                        Gas
                      </div>}
                      {camper.water && <div className={styles.featureItem}>
                        <img src="/images/Water.svg" alt="icon" width="20" height="20"/>
                        Water
                      </div>}
                    </div>
                  </div>

                  <h3 className={styles.titleBook}>Vehicle Details</h3>
                  <svg key="divider" width="527" height="2" viewBox="0 0 527 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0 1H527" stroke="#DADDE1" className={styles.linearDetails}/>
                  </svg>
                  <div className={styles.detailsGrid}>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Form:</span>
                      <span className={styles.detailValue}>{camper.form}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Length:</span>
                      <span className={styles.detailValue}>{camper.length}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Width:</span>
                      <span className={styles.detailValue}>{camper.width}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Height:</span>
                      <span className={styles.detailValue}>{camper.height}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Tank:</span>
                      <span className={styles.detailValue}>{camper.tank}</span>
                    </div>
                    <div className={styles.detailItem}>
                      <span className={styles.detailLabel}>Consumption:</span>
                      <span className={styles.detailValue}>{camper.consumption}</span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className={styles.reviews}>
                  {camper.reviews && camper.reviews.length > 0 ? (
                    <div className={styles.reviewsList}>
                      {camper.reviews.map((review, index) => (
                        <div key={index} className={styles.review}>
                          <div className={styles.reviewHeader}>
                            <span className={styles.reviewerName}>{review.reviewer_name}</span>
                            <div className={styles.reviewRating}>
                              {'⭐'.repeat(review.reviewer_rating)}
                              <span>({review.reviewer_rating}/5)</span>
                            </div>
                          </div>
                          <p className={styles.reviewComment}>{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No reviews yet</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.rightColumn}>
          <h2 className={styles.titleBook}>Book your campervan now</h2>
          <p className={styles.textBook}>Stay connected! We are always ready to help you.</p>
          
          <div className={styles.bookingForm}>
            <form onSubmit={handleSubmit}>
              <div className={styles.formGroup}>
                <input 
                  type="text" 
                  id="name" 
                  placeholder="Name*"
                  value={formData.name}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
                <input 
                  type="email" 
                  id="email" 
                  placeholder="Email*"
                  value={formData.email}
                  onChange={handleInputChange}
                  required 
                />
              </div>

              <div className={styles.formGroup}>
        <div className={styles.dateInputWrapper}>
          <input 
            type="text" 
            id="date" 
            placeholder="Booking date*"
            value={formData.date}
            onChange={handleInputChange}
            onFocus={(e) => {
              e.target.type = 'date';
              // Показываем иконку при фокусе
              const icon = e.target.nextElementSibling as HTMLElement;
              if (icon) {
                icon.style.display = 'flex';
              }
            }}
            onBlur={(e) => {
              if (!e.target.value) {
                e.target.type = 'text';
              }
              // Скрываем иконку при потере фокуса, если дата не выбрана
              if (!e.target.value) {
                const icon = e.target.nextElementSibling as HTMLElement;
                if (icon) {
                  icon.style.display = 'none';
                }
              }
            }}
            required 
            className={styles.dateInput}
            min={new Date().toISOString().split('T')[0]}
          />
          <div className={styles.dateIcon}>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.66667 1.66667V4.16667M13.3333 1.66667V4.16667M2.91667 7.575H17.0833M17.5 7.08333V14.1667C17.5 16.6667 16.25 18.3333 13.3333 18.3333H6.66667C3.75 18.3333 2.5 16.6667 2.5 14.1667V7.08333C2.5 4.58333 3.75 2.91667 6.66667 2.91667H13.3333C16.25 2.91667 17.5 4.58333 17.5 7.08333Z" stroke="currentColor" strokeWidth="1.5" strokeMiterlimit="10" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>
      </div>

              <div className={styles.formGroup}>
                <textarea 
                  id="comment"
                  placeholder="Comment" 
                  rows={4}
                  value={formData.comment}
                  onChange={handleInputChange}
                ></textarea>
              </div>

              <div className={styles.buttonContainer}>
                <button 
                  type="submit" 
                  className={styles.bookButton}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Booking...' : 'Send'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <SuccessModal 
        isOpen={isSuccessModalOpen} 
        onClose={handleCloseModal} 
      />
    </div>
  );
}