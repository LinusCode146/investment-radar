"use client"

import React, { useState } from 'react';
import styles from './InvestmentsFinished.module.css';

interface Investment {
    id: string;
    title: string;
    description: string;
    budget: number;
    completed: boolean;
    region: string;
    location: string;
    type: string;
    position: { x: number; y: number };
}

const InvestmentsFinished: React.FC = () => {
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
    const [mapView, setMapView] = useState<'map' | 'satellite'>('map');

    const investments: Investment[] = [
        {
            id: '1',
            title: 'Sanierung Altes Rathaus Johannisberg',
            description: 'Wir haben im Ortsteil Johannisberg das Alte Rathaus energetisch saniert. Hierzu wurde die Fassade\nMaßnahme: Sanierung des Dachreiters incl. Turm, energetische Sanierung Fassade und Fenster',
            budget: 1000000,
            completed: true,
            region: 'Johannisberg',
            location: 'Ortsteil Johannisberg',
            type: 'Sanierung',
            position: { x: 15, y: 35 }
        },
        {
            id: '2',
            title: 'Neubau Sportplatzgebäude Johannisberg',
            description: 'Neubau eines Sportplatzgebäudes (Umkleiden, Sanitärräume, Büros, Küche und Aufenthaltsraum)',
            budget: 2500000,
            completed: false,
            region: 'Johannisberg',
            location: 'Sportplatz Johannisberg',
            type: 'Neubau',
            position: { x: 25, y: 75 }
        },
        {
            id: '3',
            title: 'Ersatzneubau Feuerwehrgerätehaus Geisenheim',
            description: 'Ersatzneubau der Fahrzeughalle mit Atemschutzwerkstatt, Schlauchpflege, Lager und Schulungsraum',
            budget: 6000000,
            completed: false,
            region: 'Geisenheim',
            location: 'Geisenheim',
            type: 'Ersatzneubau',
            position: { x: 75, y: 25 }
        },
        {
            id: '4',
            title: 'Neubau Kindertagesstätte in Johannisberg',
            description: 'Kompletter Neubau einer Kindertagesstätte in Johannisberg (4 Gruppen)',
            budget: 3500000,
            completed: false,
            region: 'Johannisberg',
            location: 'Johannisberg',
            type: 'Neubau',
            position: { x: 85, y: 65 }
        }
    ];

    const openModal = (investment: Investment) => {
        setSelectedInvestment(investment);
    };

    const closeModal = () => {
        setSelectedInvestment(null);
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h1 className={styles.title}>Radar: Getätigte Investitionen</h1>
            </div>

            <div className={styles.mapContainer}>
                <div className={styles.mapControls}>
                    <button
                        className={`${styles.controlButton} ${mapView === 'map' ? styles.active : ''}`}
                        onClick={() => setMapView('map')}
                    >
                        Map
                    </button>
                    <button
                        className={`${styles.controlButton} ${mapView === 'satellite' ? styles.active : ''}`}
                        onClick={() => setMapView('satellite')}
                    >
                        Satellite
                    </button>
                </div>

                <div className={`${styles.map} ${mapView === 'satellite' ? styles.satelliteView : ''}`}>
                    {investments.map((investment) => (
                        <button
                            key={investment.id}
                            className={styles.investmentMarker}
                            style={{
                                left: `${investment.position.x}%`,
                                top: `${investment.position.y}%`,
                            }}
                            onClick={() => openModal(investment)}
                            title={investment.title}
                        >
                            <span className={styles.markerIcon}>📍</span>
                        </button>
                    ))}

                    <div className={styles.mapAttribution}>
                        <span>© Google</span>
                    </div>
                </div>
            </div>

            <div className={styles.investmentsList}>
                {investments.map((investment) => (
                    <div
                        key={investment.id}
                        className={styles.investmentCard}
                        onClick={() => openModal(investment)}
                    >
                        <div className={styles.cardHeader}>
                            <h3 className={styles.cardTitle}>{investment.title}</h3>
                            <span className={styles.cardBudget}>
                {formatCurrency(investment.budget)}
              </span>
                        </div>
                        <p className={styles.cardDescription}>
                            {investment.description.split('\n')[0]}
                        </p>
                        <div className={styles.cardFooter}>
                            <div className={styles.cardIcons}>
                <span className={styles.statusIcon}>
                  {investment.completed ? '✓' : '🕒'}
                </span>
                                <span className={styles.locationIcon}>📍</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {selectedInvestment && (
                <div className={styles.modalOverlay} onClick={closeModal}>
                    <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                        <div className={styles.modalHeader}>
                            <h2 className={styles.modalTitle}>
                                {selectedInvestment.title}
                            </h2>
                        </div>

                        <div className={styles.modalContent}>
                            <div className={styles.modalField}>
                                <label className={styles.modalLabel}>Type:</label>
                                <span className={styles.modalValue}>{selectedInvestment.type}</span>
                            </div>

                            <div className={styles.modalField}>
                                <label className={styles.modalLabel}>Description:</label>
                            </div>

                            <div className={styles.modalDescription}>
                                {selectedInvestment.description.split('\n').map((line, index) => (
                                    <p key={index}>{line}</p>
                                ))}
                            </div>

                            <div className={styles.modalInfo}>
                                <div className={styles.modalInfoItem}>
                                    <span className={styles.modalIcon}>💰</span>
                                    <div>
                                        <strong>Budget:</strong> {formatCurrency(selectedInvestment.budget)}
                                    </div>
                                </div>

                                <div className={styles.modalInfoItem}>
                                    <span className={styles.modalIcon}>📅</span>
                                    <div>
                                        <strong>Completed:</strong> {selectedInvestment.completed ? 'Yes' : 'In Progress'}
                                    </div>
                                </div>

                                <div className={styles.modalInfoItem}>
                                    <span className={styles.modalIcon}>🌍</span>
                                    <div>
                                        <strong>Region:</strong> {selectedInvestment.region}
                                    </div>
                                </div>

                                <div className={styles.modalInfoItem}>
                                    <span className={styles.modalIcon}>📍</span>
                                    <div>
                                        <strong>Location:</strong> {selectedInvestment.location}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className={styles.modalFooter}>
                            <button className={styles.closeButton} onClick={closeModal}>
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestmentsFinished;