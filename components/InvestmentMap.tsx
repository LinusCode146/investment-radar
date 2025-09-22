"use client"

import React, { useState } from 'react';
import styles from './InvestmentMap.module.css';
import InvestmentCard from './InvestmentCard';
import SuggestionModal from './SuggestionModal';

interface Investment {
    id: string;
    title: string;
    description: string;
    type: string;
    location: string;
    likes: number;
    author: string;
}

const InvestmentMap: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [investments, setInvestments] = useState<Investment[]>([
        {
            id: '1',
            title: 'Bushaltestelle Johannisberg',
            description: 'Die Bushaltestelle in Johannisberg an der Schloßheide macht leider keinen guten Eindruck mehr. Teile sind beschädigt, das Dach schützt kaum vor Regen und die Sitzmöglichkeit ist eigentlich nicht mehr nutzbar. Abends fühlt es sich dort sogar ein wenig unsicher an. Es wäre schön, wenn die Haltestelle modernisiert werden könnte. Eine funktionierende Überdachung, etwas Beleuchtung und eine intakte Sitzgelegenheit würden schon viel verändern und den Ort deutlich angenehmer machen.',
            type: 'Öffentliche Infrastruktur',
            location: 'Johannisberg',
            likes: 0,
            author: 'Bürger'
        },
        {
            id: '2',
            title: 'test1',
            description: 'Dieser Inhalt ist nicht leer',
            type: 'Test',
            location: 'Test Location',
            likes: 0,
            author: 'Test User'
        },
        {
            id: '3',
            title: 'TEST',
            description: 'Dieser Inhalt ist nicht leer',
            type: 'Test',
            location: 'Test Location',
            likes: 0,
            author: 'Test User'
        }
    ]);

    const handleAddSuggestion = (newSuggestion: Omit<Investment, 'id' | 'likes' | 'author'>) => {
        const investment: Investment = {
            ...newSuggestion,
            id: Date.now().toString(),
            likes: 0,
            author: 'Bürger'
        };
        setInvestments([...investments, investment]);
        setIsModalOpen(false);
    };

    const handleLike = (id: string) => {
        setInvestments(investments.map(inv =>
            inv.id === id ? { ...inv, likes: inv.likes + 1 } : inv
        ));
    };

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Radar: Benötigte Investitionen</h1>
                <button
                    className={styles.addButton}
                    onClick={() => setIsModalOpen(true)}
                >
                    <span className={styles.addIcon}>+</span>
                    Vorschlag hinzufügen
                </button>
            </header>

            <div className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    <div className={styles.mapControls}>
                        <button className={styles.mapControlActive}>Map</button>
                        <button className={styles.mapControl}>Satellite</button>
                    </div>

                    {/* Placeholder für Google Maps */}
                    <div className={styles.mapPlaceholder}>
                        <div className={styles.mapBackground}>
                            <div className={styles.mapPin} style={{top: '35%', left: '60%'}}>
                                📍
                            </div>
                            <div className={styles.mapPin} style={{top: '40%', left: '65%'}}>
                                📍
                            </div>
                            <div className={styles.mapLabels}>
                                <span className={styles.countryLabel} style={{top: '60%', left: '30%'}}>France</span>
                                <span className={styles.countryLabel} style={{top: '45%', left: '70%'}}>Germany</span>
                                <span className={styles.countryLabel} style={{top: '25%', left: '50%'}}>Belgium</span>
                                <span className={styles.countryLabel} style={{top: '70%', left: '65%'}}>Switzerland</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.investmentsList}>
                {investments.map(investment => (
                    <InvestmentCard
                        key={investment.id}
                        investment={investment}
                        onLike={() => handleLike(investment.id)}
                    />
                ))}
            </div>

            {isModalOpen && (
                <SuggestionModal
                    onSubmit={handleAddSuggestion}
                    onCancel={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
};

export default InvestmentMap;