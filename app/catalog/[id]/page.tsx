'use client';

import React from "react";
import {useEffect, useState} from 'react';
import { useParams } from "next/navigation";
import { useCampersStore } from "@/store/useCampersStore";
import { Camper } from "@/types/campers";
import styles from './page.module.css'
import Loader from "@/components/Loader/Loader";
import  Link from 'next/link';


export default function CamperDetails(){
    const params = useParams();
    const id = params.id as string;

    const {fetchCamperById, isLoading} = useCampersStore();
    const [camper, setCamper] = useState<Camper | null>(null);
    const [activeTab, setActiveTab] = useState<'features' | 'reviews'>('features');

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
            <nav className={styles.breadcrumbs}>
                <Link href="/">Home</Link>
                <span> / </span>
                <Link href="/catalog">Catalog</Link>
                <span> / </span>
                <span>{camper.name}</span>
            </nav>

            <div className={styles.content}>
                <div className={styles.leftColumn}>
                    <div className={styles.gallery}>
                        {camper.gallery && camper.gallery.length > 0 ? (
                            <div className={styles.galleryContainer}>
                                <div className={styles.mainImage}>
                                    <img src={camper.gallery[0].original} 
                                    alt={camper.name} />
                                </div>
                                {camper.gallery.length > 1 && (
                                    <div className={styles.thumbnails}>
                                        {camper.gallery.slice(1).map((image, index) => (
                                            <div key={index} className={styles.thumbnail}>
                                                <img src={image.original} 
                                                alt={`${camper.name} ${index} + 2`} />

                                            </div>
                                        ))}

                                    </div>
                                )}

                            </div>
                        ) : (
                            <div className={styles.noImage}>
                                <p>No images available</p>
                            </div>
                        )}
                    </div>

                    <div className={styles.tabs}>
                        <div className={styles.tabHeaders}>
                            <button
                            className={`${styles.tabHeader} ${activeTab} === 'reviews' ? styles.active : ''}`}
                            onClick={() => setActiveTab('reviews')}
                            >
                            Reviews
                            </button>
                        </div>

                        <div className={styles.tabContent}>
                        {activeTab === 'features' ? (
                            <div className={styles.features}>
                                <h3>Vehicle Details</h3>
                                <div className={styles.detailsGrid}>
                                    <div className={styles.detailsItem}>
                                        <span className={styles.detailLabel}>Form:</span>
                                        <span className={styles.detailValue}>{camper.form}</span>
                                    </div>
                                    <div className={styles.detailsItem}>
                                        <span className={styles.detailLabel}>Length:</span>
                                        <span className={styles.detailValue}>{camper.length}</span>
                                    </div>
                                    <div className={styles.detailsItem}>
                                        <span className={styles.detailLabel}>Width:</span>
                                        <span className={styles.detailValue}>{camper.width}</span>
                                    </div>
                                    <div className={styles.detailsItem}>
                                        <span className={styles.detailLabel}>Height:</span>
                                        <span className={styles.detailValue}>{camper.height}</span>
                                    </div>
                                    <div className={styles.detailsItem}>
                                        <span className={styles.detailLabel}>Tank:</span>
                                        <span className={styles.detailValue}>{camper.tank}</span>
                                    </div>
                                    <div className={styles.detailsItem}>
                                        <span className={styles.detailLabel}>Consumption:</span>
                                        <span className={styles.detailValue}>{camper.consumption}</span>
                                    </div>

                                </div>

                                <h3>Features</h3>
                                <div className={styles.featuresGrid}>
                                    {camper.AC && 
                                    <div className={styles.featureItem}>❄️ Air Conditioner</div>}
                                    {camper.bathroom && 
                                    <div className={styles.featureItem}>🚽 Bathroom</div>}
                                    {camper.kitchen && 
                                    <div className={styles.featureItem}>🍳 Kitchen</div>}
                                    {camper.TV && 
                                    <div className={styles.featureItem}>📺 TV</div>}
                                    {camper.radio && 
                                    <div className={styles.featureItem}>📻 Radio</div>}
                                    {camper.refrigerator && 
                                    <div className={styles.featureItem}>🧊 Refrigerator</div>}
                                    {camper.microwave && 
                                    <div className={styles.featureItem}>🔥 Microwave</div>}
                                    {camper.gas && 
                                    <div className={styles.featureItem}>⛽ Gas</div>}
                                    {camper.water && 
                                    <div className={styles.featureItem}>💧 Water</div>}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.reviews}>
                                <h3>Customer Reviews</h3>
                                {camper.reviews && camper.reviews.length > 0 ? (
                                    <div className={styles.reviewsList}>
                                        {camper.reviews.map((review, index) => (
                                            <div key={index} className={styles.review}>
                                                <div className={styles.reviewHeader}>
                                                    <span className={styles.reviewerName}>
                                                        {review.reviewer_name}
                                                    </span>
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
                            <div className={styles.bookingCard}>
                                <h2>Bool this camper</h2>
                                <div className={styles.price}>
                                    <span className={styles.priceValue}>€{camper.price.toFixed(2)}</span>
                                    <span className={styles.pricePeriod}>/ day</span>
                                </div>

                                <div className={styles.bookingGroup}>
                                    <form>
                                        <div className={styles.formGroup}>
                                            <label htmlFor="name">Name</label>
                                            <input type="text" id="name" required/>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="email">Email</label>
                                            <input type="email" id="email" required/>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="date">Booking Date</label>
                                            <input type="date" id="date" required/>
                                        </div>

                                        <div className={styles.formGroup}>
                                            <label htmlFor="comment">Comment</label>
                                            <textarea id="comment" rows={4}></textarea>
                                        </div>

                                        <button type="submit" className={styles.bookButton}>Book now</button>
                                    </form>
                                </div>
                            </div>
                        </div>
            </div>

        </div>
    )
}


