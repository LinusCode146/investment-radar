"use client"

import React, { useState, useEffect } from 'react';
import styles from './SuggestionModal.module.css';

interface SuggestionData {
    title: string;
    description: string;
    type: string;
    location: string;
    authorName: string;
    authorAddress: string;
}

interface SuggestionModalProps {
    onSubmit: (data: SuggestionData) => void;
    onCancel: () => void;
    prefilledLocation?: string;
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ onSubmit, onCancel, prefilledLocation }) => {
    const [formData, setFormData] = useState<SuggestionData>({
        title: '',
        description: '',
        type: '',
        location: '',
        authorName: '',
        authorAddress: ''
    });

    const investmentTypes = [
        'Öffentliche Infrastruktur',
        'Bildung',
        'Gesundheitswesen',
        'Verkehr',
        'Umwelt & Nachhaltigkeit',
        'Digitalisierung',
        'Sport & Freizeit',
        'Kultur',
        'Sicherheit',
        'Sonstiges'
    ];

    // Update location field when prefilledLocation changes
    useEffect(() => {
        if (prefilledLocation) {
            setFormData(prev => ({
                ...prev,
                location: prefilledLocation
            }));
        }
    }, [prefilledLocation]);

    const handleInputChange = (field: keyof SuggestionData, value: string) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.title.trim() && formData.description.trim() && formData.type && formData.location.trim()) {
            onSubmit(formData);
        }
    };

    const isFormValid = formData.title.trim() && formData.description.trim() && formData.type && formData.location.trim();

    return (
        <div className={styles.overlay} onClick={onCancel}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <h2 className={styles.modalTitle}>Mache einen Vorschlag!</h2>
                    <button className={styles.closeButton} onClick={onCancel}>
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2"/>
                            <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className={styles.form}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Titel</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Titel des Investitionsvorschlags eingeben"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Beschreibung</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Beschreiben Sie den Investitionsbedarf..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Art der Investition</label>
                        <select
                            className={styles.select}
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                        >
                            <option value="">Investitionstyp auswählen</option>
                            {investmentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Standort
                            {prefilledLocation && (
                                <span className={styles.locationHint}>
                                    📍 Automatisch von Kartenauswahl übernommen
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            className={`${styles.input} ${prefilledLocation ? styles.prefilledInput : ''}`}
                            placeholder="Standort eingeben oder auf Karte auswählen"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                        {prefilledLocation && (
                            <div className={styles.locationNote}>
                                Sie können den automatisch erkannten Standort bei Bedarf bearbeiten.
                            </div>
                        )}
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ihr Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ihr Name"
                            value={formData.authorName}
                            onChange={(e) => handleInputChange('authorName', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ihre Adresse</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Ihre Adresse"
                            value={formData.authorAddress}
                            onChange={(e) => handleInputChange('authorAddress', e.target.value)}
                        />
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
                            className={`${styles.submitButton} ${!isFormValid ? styles.submitButtonDisabled : ''}`}
                            disabled={!isFormValid}
                        >
                            Vorschlag einreichen
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onCancel}
                        >
                            Abbrechen
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SuggestionModal;