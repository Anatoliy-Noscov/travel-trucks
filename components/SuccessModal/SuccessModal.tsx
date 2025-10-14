'use client';

import React from 'react';
import styles from './SuccessModal.module.css';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.modalContent}>
          <div className={styles.successIcon}>
            <svg width="64" height="64" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="32" cy="32" r="32" fill="#F2FAF7"/>
              <path d="M28 32L31 35L36 28" stroke="#4CAF50" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <h2 className={styles.title}>Booking Successful!</h2>
          <p className={styles.message}>
            Your booking has been successfully submitted. We will contact you soon to confirm your reservation.
          </p>
          <button className={styles.confirmButton} onClick={onClose}>
            Got it!
          </button>
        </div>
      </div>
    </div>
  );
};

export default SuccessModal;