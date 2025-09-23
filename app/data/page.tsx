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
            title: 'Investitionsvorschläge',
            description: 'Exportiere alle Vorschläge aus der Community inklusive Standort, Beschreibung, Investitionstyp und Anzahl der Stimmen.',
            buttonText: 'Investitionsvorschläge exportieren',
            iconType: 'location'
        },
        {
            id: 'accomplished',
            title: 'Abgeschlossene Investitionen',
            description: 'Exportiere Daten zu abgeschlossenen öffentlichen Investitionen inklusive Budget, Abschlussdatum und regionalen Informationen.',
            buttonText: 'Abgeschlossene Investitionen exportieren',
            iconType: 'check'
        }
    ];

    const features: Feature[] = [
        {
            id: 'secure',
            title: 'Sichere Datenübertragung',
            iconType: 'shield'
        },
        {
            id: 'realtime',
            title: 'Echtzeit-Synchronisierung',
            iconType: 'clock'
        },
        {
            id: 'collaborative',
            title: 'Gemeinsamer Zugriff',
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
            <div className={styles.banner}>
                Erst nach der Testphase werden Daten bereitgestellt
            </div>
            <div className={styles.header}>
                <h2 className={styles.title}>Daten</h2>
                <div className={styles.subtitle}>
                    <p>Exportiere Plattformdaten zur Analyse und Verwaltung nach Google Sheets.</p>
                    <p>Lade umfassende Berichte zu Investitionsvorschlägen und abgeschlossenen Investitionen herunter.</p>
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
                    <h3 className={styles.integrationTitle}>Daten in Tabellenform extrahieren</h3>
                </div>

                <p className={styles.integrationDescription}>
                    Alle exportierten Daten werden automatisch mit deinem Google Sheets-Arbeitsbereich synchronisiert. Diese Integration ermöglicht Echtzeit-Analyse, gemeinsames Reporting und eine effiziente Verwaltung für mehr Transparenz.
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