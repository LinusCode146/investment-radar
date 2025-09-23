"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './InvestmentsFinished.module.css';

interface FinishedInvestment {
    id: number;
    title: string;
    description: string;
    budget: number;
    completed: boolean;
    region: string;
    location: string;
    type: string;
    lat?: number;
    lng?: number;
    completedDate?: string;
    contractor?: string;
}

interface NewFinishedInvestmentData {
    title: string;
    description: string;
    budget: number;
    region: string;
    location: string;
    type: string;
    lat?: number;
    lng?: number;
    completedDate: string;
    contractor?: string;
}

declare global {
    interface Window {
        L: any;
    }
}

const InvestmentsFinished: React.FC = () => {
    const { isAdmin } = useAuth();
    const [selectedInvestment, setSelectedInvestment] = useState<FinishedInvestment | null>(null);
    const [investments, setInvestments] = useState<FinishedInvestment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [mapView, setMapView] = useState<'streets' | 'satellite'>('streets');
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingInvestment, setEditingInvestment] = useState<FinishedInvestment | null>(null);

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);

    // Fetch finished investments
    useEffect(() => {
        fetchFinishedInvestments();
    }, []);

    const fetchFinishedInvestments = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch('/api/finished-investments');

            if (!response.ok) {
                throw new Error(`Failed to fetch finished investments: ${response.statusText}`);
            }

            const data = await response.json();
            setInvestments(data);
        } catch (err) {
            console.error('Error fetching finished investments:', err);
            setError(err instanceof Error ? err.message : 'Failed to load finished investments');
        } finally {
            setIsLoading(false);
        }
    };

    // Initialize Leaflet Map
    const initializeMap = useCallback(() => {
        if (!window.L || !mapRef.current) return;

        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        const map = window.L.map(mapRef.current, {
            center: [49.9787, 7.9253],
            zoom: 12,
            zoomControl: true,
            scrollWheelZoom: true,
            dragging: true,
            tap: true,
            touchZoom: true,
            doubleClickZoom: true,
        });

        const streetsLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors',
            maxZoom: 19,
        });

        const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© Esri',
            maxZoom: 19,
        });

        if (mapView === 'streets') {
            streetsLayer.addTo(map);
        } else {
            satelliteLayer.addTo(map);
        }

        map._streetsLayer = streetsLayer;
        map._satelliteLayer = satelliteLayer;
        mapInstanceRef.current = map;
        setIsMapLoaded(true);
    }, [mapView]);

    // Load Leaflet
    useEffect(() => {
        if (window.L) {
            initializeMap();
            return;
        }

        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        document.head.appendChild(link);

        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.async = true;
        script.onload = () => {
            setTimeout(() => {
                initializeMap();
            }, 100);
        };

        document.head.appendChild(script);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
            }
        };
    }, [initializeMap]);

    const openModal = (investment: FinishedInvestment) => {
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
        <div className={styles.contaxiner}>
            <div className={styles.header}>
                <h1 className={styles.title}>Radar: Getätigte Investitionen</h1>
            </div>

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