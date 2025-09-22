"use client"

import React, { useState } from 'react';
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
}

const SuggestionModal: React.FC<SuggestionModalProps> = ({ onSubmit, onCancel }) => {
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
                        <label className={styles.label}>Title</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Enter suggestion title"
                            value={formData.title}
                            onChange={(e) => handleInputChange('title', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Description</label>
                        <textarea
                            className={styles.textarea}
                            placeholder="Describe the investment need"
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
                            <option value="">Select investment type</option>
                            {investmentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Automatische Standortauswahl</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Standort"
                            value={formData.location}
                            onChange={(e) => handleInputChange('location', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Name</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Name"
                            value={formData.authorName}
                            onChange={(e) => handleInputChange('authorName', e.target.value)}
                        />
                    </div>

                    <div className={styles.formGroup}>
                        <label className={styles.label}>Adresse</label>
                        <input
                            type="text"
                            className={styles.input}
                            placeholder="Adresse"
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
                            Submit Suggestion
                        </button>
                        <button
                            type="button"
                            className={styles.cancelButton}
                            onClick={onCancel}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SuggestionModal;