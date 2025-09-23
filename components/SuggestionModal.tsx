"use client"

import React, { useState, useEffect } from 'react';
import styles from './SuggestionModal.module.css';

interface SuggestionData {
    title: string;
    description: string;
    type: string;
    location: string;
    authorAge: string;
    authorPlz: string;
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
        authorAge: '',
        authorPlz: ''
    });
    const [privacyChecked, setPrivacyChecked] = useState(false);
    const [touched, setTouched] = useState<{ [K in keyof SuggestionData | 'privacy']: boolean }>({
        title: false,
        description: false,
        type: false,
        location: false,
        authorAge: false,
        authorPlz: false,
        privacy: false
    });

    const investmentTypes = [
        'Verkehrsinfrastruktur'
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

    const validateField = (field: keyof SuggestionData | 'privacy') => {
        if (field === 'privacy') return privacyChecked;
        if (field === 'title' || field === 'description' || field === 'location') return formData[field].trim().length > 0;
        if (field === 'type') return !!formData.type;
        if (field === 'authorPlz') return formData.authorPlz.trim().length > 0;
        if (field === 'authorAge') return formData.authorAge.trim().length > 0;
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const requiredFields: (keyof SuggestionData | 'privacy')[] = ['title', 'description', 'type', 'location', 'authorPlz', 'authorAge', 'privacy'];
        const newTouched = { ...touched };
        let allValid = true;
        requiredFields.forEach(field => {
            if (!validateField(field)) {
                newTouched[field] = true;
                allValid = false;
            }
        });
        setTouched(newTouched);
        if (allValid) {
            onSubmit(formData);
        }
    };

    const isFormValid = formData.title.trim() && formData.description.trim() && formData.type && formData.location.trim() && privacyChecked;

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
                            className={`${styles.input} ${touched.title && !validateField('title') ? styles.invalid : ''}`}
                            placeholder="Titel des Investitionsvorschlags eingeben"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                        {touched.title && !validateField('title') && (
                            <span className={styles.error}>Titel ist erforderlich.</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Beschreibung</label>
                        <textarea
                            className={`${styles.textarea} ${touched.description && !validateField('description') ? styles.invalid : ''}`}
                            placeholder="Beschreiben Sie den Investitionsbedarf..."
                            rows={4}
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        {touched.description && !validateField('description') && (
                            <span className={styles.error}>Beschreibung ist erforderlich.</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Art der Investition</label>
                        <select
                            className={`${styles.select} ${touched.type && !validateField('type') ? styles.invalid : ''}`}
                            value={formData.type}
                            onChange={(e) => handleInputChange('type', e.target.value)}
                        >
                            <option value="">Investitionstyp auswählen</option>
                            {investmentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                        {touched.type && !validateField('type') && (
                            <span className={styles.error}>Typ ist erforderlich.</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>
                            Standort der Investition
                            {prefilledLocation && (
                                <span className={styles.locationHint}>
                                    📍 Automatisch von Kartenauswahl übernommen
                                </span>
                            )}
                        </label>
                        <input
                            type="text"
                            className={`${styles.input} ${prefilledLocation ? styles.prefilledInput : ''} ${touched.location && !validateField('location') ? styles.invalid : ''}`}
                            placeholder="Standort eingeben oder auf Karte auswählen"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                        {touched.location && !validateField('location') && (
                            <span className={styles.error}>Standort ist erforderlich.</span>
                        )}
                        {prefilledLocation && (
                            <div className={styles.locationNote}>
                                Sie können den automatisch erkannten Standort bei Bedarf bearbeiten.
                            </div>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ihre Postleitzahl</label>
                        <input
                            type="text"
                            className={`${styles.input} ${touched.authorPlz && !validateField('authorPlz') ? styles.invalid : ''}`}
                            placeholder="Ihre Postleitzahl"
                            value={formData.authorPlz}
                            onChange={(e) => handleInputChange('authorPlz', e.target.value)}
                        />
                        {touched.authorPlz && !validateField('authorPlz') && (
                            <span className={styles.error}>Postleitzahl ist erforderlich.</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Ihr Alter</label>
                        <input
                            type="number"
                            className={`${styles.input} ${touched.authorAge && !validateField('authorAge') ? styles.invalid : ''}`}
                            placeholder="Ihr Alter"
                            value={formData.authorAge}
                            onChange={(e) => handleInputChange('authorAge', e.target.value)}
                        />
                        {touched.authorAge && !validateField('authorAge') && (
                            <span className={styles.error}>Alter ist erforderlich.</span>
                        )}
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.checkboxLabel}>
                            <input
                                type="checkbox"
                                checked={privacyChecked}
                                onChange={e => setPrivacyChecked(e.target.checked)}
                                className={`${styles.checkbox} ${touched.privacy && !validateField('privacy') ? styles.invalidCheckbox : ''}`}
                            />
                            {' '}Ich habe die <a href={'/datenschutz'}>Datenschutzvereinbarun sowie die Netiquette</a> gelesen, verstanden und willige hiermit ein.
                        </label>
                        {touched.privacy && !validateField('privacy') && (
                            <span className={styles.error}>Bitte stimmen Sie der Datenschutzerklärung zu.</span>
                        )}
                    </div>

                    <div className={styles.buttonGroup}>
                        <button
                            type="submit"
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