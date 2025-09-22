import React from 'react';
import styles from './page.module.css';

const OurMission: React.FC = () => {
    return (
        <section className={styles.container}>
            <div className={styles.imageContainer}>
                <div className={styles.phoneContainer}>
                    <div className={styles.phone}>
                        <div className={styles.phoneScreen}>
                            <div className={styles.crowdImage}></div>
                        </div>
                    </div>
                </div>
                <div className={styles.handContainer}>
                    <div className={styles.hand}></div>
                </div>
            </div>

            <div className={styles.content}>
                <h2 className={styles.title}>Our Mission</h2>
                <p className={styles.description}>
                    Empowering citizens through transparent, data-driven public investment decisions
                </p>
            </div>
        </section>
    );
};

export default OurMission;