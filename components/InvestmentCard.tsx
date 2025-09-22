import React from 'react';
import styles from './InvestmentCard.module.css';

interface Investment {
    id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    likes: number;
    author: string;
}

interface InvestmentCardProps {
    investment: Investment;
    onLike: () => void;
}

const InvestmentCard: React.FC<InvestmentCardProps> = ({ investment, onLike }) => {
    const isLongDescription = investment.description.length > 200;

    return (
        <div className={styles.card}>
            <div className={styles.cardHeader}>
                <h3 className={styles.title}>{investment.title}</h3>
                <div className={styles.location}>
                    <svg className={styles.locationIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                    {investment.location}
                </div>
            </div>

            <div className={styles.cardBody}>
                <p className={`${styles.description} ${isLongDescription ? styles.longDescription : ''}`}>
                    {investment.description}
                </p>

                <div className={styles.metadata}>
                    <span className={styles.type}>{investment.type}</span>
                    <span className={styles.author}>von {investment.author}</span>
                </div>
            </div>

            <div className={styles.cardFooter}>
                <div className={styles.userIcon}>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" stroke="currentColor" strokeWidth="2"/>
                        <circle cx="12" cy="7" r="4" stroke="currentColor" strokeWidth="2"/>
                    </svg>
                </div>

                <button className={styles.likeButton} onClick={onLike}>
                    <svg className={styles.heartIcon} width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"
                              stroke="#10b981"
                              strokeWidth="2"
                              fill={investment.likes > 0 ? "#10b981" : "none"}
                        />
                    </svg>
                    {investment.likes > 0 && <span className={styles.likeCount}>{investment.likes}</span>}
                </button>
            </div>
        </div>
    );
};

export default InvestmentCard;