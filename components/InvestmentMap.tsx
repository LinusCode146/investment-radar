"use client"

import React, { useState, useEffect } from 'react';
import styles from './InvestmentMap.module.css';
import InvestmentCard from './InvestmentCard';
import SuggestionModal from './SuggestionModal';

interface Investment {
    id: number;
    title: string;
    description: string;
    type: string;
    location: string;
    likes: number;
    authorName: string;
    authorAddress: string;
}

interface NewInvestmentData {
    title: string;
    description: string;
    type: string;
    location: string;
    authorName: string;
    authorAddress: string;
}

const InvestmentMap: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch investments on component mount
    useEffect(() => {
        fetchInvestments();
    }, []);

    const fetchInvestments = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/investment');

            if (!response.ok) {
                throw new Error(`Failed to fetch investments: ${response.statusText}`);
            }

            const data = await response.json();
            setInvestments(data);
        } catch (err) {
            console.error('Error fetching investments:', err);
            setError(err instanceof Error ? err.message : 'Failed to load investments');
        } finally {
            setIsLoading(false);
        }
    };

    const handleAddSuggestion = async (newSuggestion: NewInvestmentData) => {
        try {
            setError(null);
            const response = await fetch('/api/investment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newSuggestion),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to create investment: ${response.statusText}`);
            }

            const createdInvestment = await response.json();
            setInvestments([...investments, createdInvestment]);
            setIsModalOpen(false);
        } catch (err) {
            console.error('Error creating investment:', err);
            setError(err instanceof Error ? err.message : 'Failed to create investment');
        }
    };

    const handleLike = async (id: number) => {
        try {
            const investment = investments.find(inv => inv.id === id);
            if (!investment) return;

            const updatedData = {
                likes: investment.likes + 1
            };

            const response = await fetch(`/api/investment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Failed to update investment: ${response.statusText}`);
            }

            const updatedInvestment = await response.json();

            // Update local state
            setInvestments(investments.map(inv =>
                inv.id === id ? updatedInvestment : inv
            ));
        } catch (err) {
            console.error('Error updating likes:', err);
            setError(err instanceof Error ? err.message : 'Failed to update likes');
        }
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingMessage}>Investitionen werden geladen...</div>
            </div>
        );
    }

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

            {error && (
                <div className={styles.errorMessage}>
                    <p>Fehler: {error}</p>
                    <button onClick={fetchInvestments} className={styles.retryButton}>
                        Erneut versuchen
                    </button>
                </div>
            )}

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
                {investments.length === 0 && !isLoading ? (
                    <div className={styles.emptyMessage}>
                        Noch keine Investitionsvorschläge vorhanden. Fügen Sie den ersten hinzu!
                    </div>
                ) : (
                    investments.map(investment => (
                        <InvestmentCard
                            key={investment.id}
                            investment={investment}
                            onLike={() => handleLike(investment.id)}
                        />
                    ))
                )}
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