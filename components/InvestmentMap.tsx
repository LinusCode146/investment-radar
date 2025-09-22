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

                    {/* Google Maps IFrame Embed für Rüdesheim am Rhein mit Zoom 10 */}
                    <div className={styles.mapPlaceholder}>
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d13101.042000708707!2d7.9253!3d49.9787!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sde!2sde!4v1695490400000!5m2!1sde!2sde"
                            width="100%"
                            height="450"
                            style={{ border: 0 }}
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
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