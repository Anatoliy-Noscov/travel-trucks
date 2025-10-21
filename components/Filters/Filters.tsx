"use client"

import React from "react";
import styles from '@/components/Filters/Filters.module.css';
import {useCampersStore} from '@/store/useCampersStore';

const Filters: React.FC = () => {
    const {filters, setFilters, fetchCampers} = useCampersStore();

    const handleInputChange = (field: string, value: string | boolean) => {
        const newFilters = {...filters, [field]: value};
        setFilters(newFilters);
    };

    const handleSearch = () => {
        console.log('🔍 Applying filters:', filters);
        fetchCampers(true);
    };

    const handleRadioChange = (form: string) => {
        const newFilters = { ...filters, form};
        setFilters(newFilters);
    };

    return (
        <div className={styles.filters}>
            
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Location</h3>
                <div className={styles.inputGroup}>
                    <input 
                    type="text"
                    placeholder="Kyiv, Ukraine"
                    className={styles.input} 
                    value={filters.location || ''}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    />
                </div>
            </div>

            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Filters</h3>

                {/* Vehicle equipment */}
                <div className={styles.subsection}>
                    <h4 className={styles.subsectionTitle}>Vehicle equipment</h4>
                    <svg width="360" height="2" viewBox="0 0 360 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H360" stroke="#DADDE1" />
                    </svg>
                    <div className={styles.checkboxGroup}>
                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox} 
                            checked={filters.AC || false} 
                            onChange={(e) => handleInputChange('AC', e.target.checked)}/>
                            <img src="/icons/conditioner.svg" alt="AC" width="32" height="32"/>
                            <span className={styles.checkboxText}>AC</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox} 
                            checked={filters.transmission === 'automatic'}
                            onChange={(e) => handleInputChange('transmission', e.target.checked ? 'automatic' : '')}/>
                            <img src="/icons/APP.svg" alt="Automatic" width="32" height="32"/>
                            <span className={styles.checkboxText}>Automatic</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox} 
                            checked={filters.kitchen || false}
                            onChange={(e) => handleInputChange('kitchen', e.target.checked)}
                            />
                            <img src="/icons/Cip.svg" alt="Kitchen" width="32" height="32"/>
                            <span className={styles.checkboxText}>Kitchen</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox} 
                            checked={filters.TV || false}
                            onChange={(e) => handleInputChange('TV', e.target.checked)}
                            />
                            <img src="/icons/tv.svg" alt="TV" width="32" height="32"/>
                            <span className={styles.checkboxText}>TV</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input 
                            type="checkbox" 
                            className={styles.checkbox} 
                            checked={filters.bathroom || false}
                            onChange={(e) => handleInputChange('bathroom', e.target.checked)}
                            />
                            <img src="/icons/bathrom.svg" alt="Bathroom" width="32" height="32"/>
                            <span className={styles.checkboxText}>Bathroom</span>
                        </label>
                    </div>
                </div>

                {/* subsection Vehicle type */}
                <div className={styles.subsection}>
                    <h4 className={styles.subsectionTitle}>Vehicle type</h4>
                    <svg width="360" height="2" viewBox="0 0 360 2" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0 1H360" stroke="#DADDE1" />
                    </svg>
                    <div className={styles.radioGroup}>
                        {/* Изменяем значения на реальные из данных */}
                        <label className={styles.radioLabel}>
                            <input 
                            type="radio" 
                            name="vehicleType" 
                            className={styles.radio}
                            checked={filters.form === "panelTruck"} // было "van"
                            onChange={() => handleRadioChange('panelTruck')}/>
                            <img src="/icons/bi_grid-1x2.svg" alt="Van" width="32" height="32"/>
                            <span className={styles.radioText}>Van</span>
                        </label>

                        <label className={styles.radioLabel}>
                            <input 
                            type="radio" 
                            name="vehicleType" 
                            className={styles.radio}
                            checked={filters.form === 'fullyIntegrated'} 
                            onChange={() => handleRadioChange('fullyIntegrated')}/>
                            <img src="/icons/bi_grid1x4.svg" alt="Fully Integrated" width="32" height="32"/>
                            <span className={styles.radioText}>Fully Integrated</span>
                        </label>

                        <label className={styles.radioLabel}>
                            <input 
                            type="radio" 
                            name="vehicleType" 
                            className={styles.radio}
                            checked={filters.form === 'alcove'}
                            onChange={() => handleRadioChange('alcove')}/>
                            <img src="/icons/APP.svg" alt="Alcove" width="32" height="32"/>
                            <span className={styles.radioText}>Alcove</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* button */}
            <button className={styles.searchButton} onClick={handleSearch}>
                Search
            </button>
        </div>
    );
};

export default Filters;