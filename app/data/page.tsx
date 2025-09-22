import React from 'react';
import styles from './page.module.css';

interface ExportCard {
    id: string;
    title: string;
    description: string;
    buttonText: string;
    iconType: 'location' | 'message' | 'check';
}

interface Feature {
    id: string;
    title: string;
    iconType: 'shield' | 'clock' | 'users';
}

const DataManagement: React.FC = () => {
    const exportCards: ExportCard[] = [
        {
            id: 'suggestions',
            title: 'Investment Suggestions',
            description: 'Export all community investment suggestions including location data, descriptions, investment types, and upvote counts.',
            buttonText: 'Export Investment Suggestions',
            iconType: 'location'
        },
        {
            id: 'messages',
            title: 'Community Messages',
            description: 'Export all messages sent to local authorities including sender information, regions, subjects, and message content.',
            buttonText: 'Export Messages',
            iconType: 'message'
        },
        {
            id: 'accomplished',
            title: 'Accomplished Investments',
            description: 'Export data on completed public investments including budgets, completion dates, and regional information.',
            buttonText: 'Export Accomplished Investments',
            iconType: 'check'
        }
    ];

    const features: Feature[] = [
        {
            id: 'secure',
            title: 'Secure Data Transfer',
            iconType: 'shield'
        },
        {
            id: 'realtime',
            title: 'Real-time Sync',
            iconType: 'clock'
        },
        {
            id: 'collaborative',
            title: 'Collaborative Access',
            iconType: 'users'
        }
    ];

    const renderIcon = (iconType: string, isLarge: boolean = true) => {
        const iconClass = isLarge ? styles.cardIcon : styles.featureIcon;
        const baseClass = `${iconClass} ${styles[iconType]}`;

        return <div className={baseClass}></div>;
    };

    return (
        <section className={styles.container}>
            <div className={styles.header}>
                <h2 className={styles.title}>Data Management</h2>
                <div className={styles.subtitle}>
                    <p>Export platform data to Google Sheets for analysis and management.</p>
                    <p>Download comprehensive reports of investment suggestions, community messages, and accomplished investments.</p>
                </div>
            </div>

            <div className={styles.cardsGrid}>
                {exportCards.map((card) => (
                    <div key={card.id} className={styles.card}>
                        {renderIcon(card.iconType)}
                        <h3 className={styles.cardTitle}>{card.title}</h3>
                        <p className={styles.cardDescription}>{card.description}</p>
                        <button className={styles.exportButton}>{card.buttonText}</button>
                    </div>
                ))}
            </div>

            <div className={styles.integrationSection}>
                <div className={styles.integrationHeader}>
                    <div className={styles.infoIcon}></div>
                    <h3 className={styles.integrationTitle}>Google Sheets Integration</h3>
                </div>

                <p className={styles.integrationDescription}>
                    All exported data will be automatically synchronized with your Google Sheets workspace. This integration
                    enables real-time data analysis, collaborative reporting, and streamlined data management for transparency
                    initiatives.
                </p>

                <div className={styles.featuresGrid}>
                    {features.map((feature) => (
                        <div key={feature.id} className={styles.featureCard}>
                            {renderIcon(feature.iconType, false)}
                            <span className={styles.featureTitle}>{feature.title}</span>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default DataManagement;