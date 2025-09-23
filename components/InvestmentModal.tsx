"use client"

import React, { useState, useEffect } from 'react';
import styles from './SuggestionModal.module.css';

interface InvestmentData {
    title: string;
    description: string;
    budget: number;
    type: string;
    completed: boolean;
    region: string;
    location: string;
    lat: number;
    lng: number;
    completedDate: string;
    contractor: string;
}

interface Location {
    address?: string;
    lat: number;
    lng: number;
}

interface InvestmentModalProps {
    onSubmit: (data: InvestmentData) => void;
    onCancel: () => void;
    prefilledLocation?: Location | null;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ onSubmit, onCancel, prefilledLocation }) => {
    const [formData, setFormData] = useState<InvestmentData>({
        title: '',
        description: '',
        budget: 0,
        type: '',
        completed: false,
        location: '',
        contractor: '',
        region: '',
        lat: 0,
        lng: 0,
        completedDate: ''
    });

    const investmentTypes = [
        'Bildung',
        'Forschung',
        'Digitale Infrastruktur',
        'Verkehrsinfrastruktur',
        'Soziale Infrastruktur',
        'Öffentliche Infrastruktur'
    ];

    // Update location field when prefilledLocation changes
    useEffect(() => {
        if (prefilledLocation) {
            setFormData(prev => ({
                ...prev,
                location: prefilledLocation?.address ?? '',
                lat: prefilledLocation?.lat ?? 0,
                lng: prefilledLocation?.lng ?? 0
            }));
        }
    }, [prefilledLocation]);

    const handleInputChange = (field: keyof InvestmentData, value: string | number | boolean) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit(formData);
        }
    };

    const isFormValid =
        formData.title.trim() &&
        formData.description.trim() &&
        formData.type &&
        formData.location.trim() &&
        formData.region.trim() &&
        formData.budget > 0 &&
        (!formData.completed || formData.completedDate.trim());

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
                        <label className={styles.label}>Budget (€)</label>
                        <input
                            type="number"
                            className={styles.input}
                            min={0}
                            step={1000}
                            placeholder="Budget in Euro"
                            value={formData.budget}
                            onChange={(e) => handleInputChange('budget', Number(e.target.value))}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Region</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Region eingeben"
                            value={formData.region}
                            onChange={(e) => handleInputChange('region', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Standort
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
                        <label className={styles.label}>Breitengrad (optional)</label>
                        <input
                            type="number"
                            className={styles.input}
                            step={0.000001}
                            placeholder="Breitengrad (z.B. 52.520008)"
                            value={formData.lat}
                            onChange={(e) => handleInputChange('lat', Number(e.target.value))}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Längengrad (optional)</label>
                        <input
                            type="number"
                            className={styles.input}
                            step={0.000001}
                            placeholder="Längengrad (z.B. 13.404954)"
                            value={formData.lng}
                            onChange={(e) => handleInputChange('lng', Number(e.target.value))}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Auftragnehmer (optional)</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Name des Auftragnehmers"
                            value={formData.contractor}
                            onChange={(e) => handleInputChange('contractor', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Abgeschlossen
                            <input
                                type="checkbox"
                                className={styles.checkbox}
                                checked={formData.completed}
                                onChange={(e) => handleInputChange('completed', e.target.checked)}
                                style={{marginLeft: '8px'}}
                            />
                        </label>
                    </div>

                    {formData.completed && (
                        <div className={styles.formGroup}>
                            <label className={styles.label}>Abschlussdatum</label>
                            <input
                                type="date"
                                className={styles.input}
                                value={formData.completedDate}
                                onChange={(e) => handleInputChange('completedDate', e.target.value)}
                            />
                        </div>
                    )}

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

export default InvestmentModal;