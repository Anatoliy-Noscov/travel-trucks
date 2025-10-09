import React from "react";
import styles from '@/components/Filters/Filters.module.css';

const Filters: React.FC = () => {
    return (
        <div className={styles.filters}>
            
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Location</h3>
                <div className={styles.inputGroup}>
                    <input type="text"
                    placeholder="Kyiv, Ukraine"
                    className={styles.input} />
                </div>
            </div>


            {/*section Filter*/}
            <div className={styles.section}>
                <h3 className={styles.sectionTitle}>Filters</h3>

                {/* Vehicle equipment */}
                <div className={styles.subsection}>
                    <h4 className={styles.subsectionTitle}>Vehicle equipment</h4>
                    <div className={styles.checkboxGroup}>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>AC</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>Automatic</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>Kitchen</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>TV</span>
                        </label>

                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" className={styles.checkbox} />
                            <span className={styles.checkboxText}>Bathroom</span>
                        </label>
                    </div>
                </div>

                {/* subsection Vehicle type */}
                <div className={styles.subsection}>
                    <h4 className={styles.subsectionTitle}>Vehicle type</h4>
                    <div className={styles.radioGroup}>

                        <label className={styles.radioLabel}>
                            <input type="radio" name="vehicleType" className={styles.radio}/>
                            <span className={styles.radioText}>Van</span>
                        </label>

                        <label className={styles.radioLabel}>
                            <input type="radio" name="vehicleType" className={styles.radio}/>
                            <span className={styles.radioText}>Fully Integrated</span>
                        </label>

                        <label className={styles.radioLabel}>
                            <input type="radio" name="vehicleType" className={styles.radio}/>
                            <span className={styles.radioText}>Alcove</span>
                        </label>
                    </div>
                </div>
            </div>

            {/* button */}

            <button className={styles.searchButton}>
                Search
            </button>
        </div>
    );
};

export default Filters;