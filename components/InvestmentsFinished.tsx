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

    // Switch map view
    const switchMapView = useCallback(() => {
        if (!mapInstanceRef.current) return;
        const map = mapInstanceRef.current;
        const newView = mapView === 'streets' ? 'satellite' : 'streets';

        if (mapView === 'streets' && map._streetsLayer && map._satelliteLayer) {
            map.removeLayer(map._streetsLayer);
            map._satelliteLayer.addTo(map);
        } else if (mapView === 'satellite' && map._streetsLayer && map._satelliteLayer) {
            map.removeLayer(map._satelliteLayer);
            map._streetsLayer.addTo(map);
        }

        setMapView(newView);
    }, [mapView]);

    // Create custom marker for finished investments
    const createFinishedIcon = () => {
        if (!window.L) return null;
        return window.L.divIcon({
            html: `<div style="
                background: #22c55e;
                width: 28px;
                height: 28px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 3px solid #fff;
                box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    color: white;
                    font-size: 14px;
                    font-weight: bold;
                    transform: rotate(45deg);
                ">✓</div>
            </div>`,
            className: 'finished-marker', // This remains a string for Leaflet
            iconSize: [28, 28],
            iconAnchor: [14, 28],
            popupAnchor: [0, -28]
        });
    };

    // Add markers to map
    const addMarkersToMap = useCallback(() => {
        if (!mapInstanceRef.current || !window.L) return;

        markersRef.current.forEach(marker => {
            if (marker.remove) {
                marker.remove();
            } else {
                mapInstanceRef.current.removeLayer(marker);
            }
        });
        markersRef.current = [];

        const finishedIcon = createFinishedIcon();

        investments.forEach((investment) => {
            if (investment.lat && investment.lng) {
                const marker = window.L.marker(
                    [investment.lat, investment.lng],
                    finishedIcon ? { icon: finishedIcon } : {}
                ).addTo(mapInstanceRef.current);

                const popupContent = `
                    <div style="max-width: 280px; font-family: Calibri, sans-serif; padding: 4px; line-height: 1.5;">
                        <h3 style="margin: 0 0 12px 0; color: #2d3748; font-size: 16px; font-weight: 600; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px;">
                            ${investment.title} <span style="color: #22c55e;">✓</span>
                        </h3>
                        <div style="margin-bottom: 10px;">
                            <p style="margin: 0 0 6px 0; color: #22c55e; font-size: 13px; font-weight: 500;">
                                <strong>Typ:</strong> ${investment.type}
                            </p>
                            <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
                                <strong>Region:</strong> ${investment.region}
                            </p>
                            <p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
                                <strong>Budget:</strong> ${formatCurrency(investment.budget)}
                            </p>
                            ${investment.completedDate ?
                    `<p style="margin: 0 0 6px 0; color: #666; font-size: 13px;">
                                    <strong>Abgeschlossen:</strong> ${new Date(investment.completedDate).toLocaleDateString('de-DE')}
                                </p>` : ''
                }
                        </div>
                        <p style="margin: 0 0 12px 0; color: #4a5568; font-size: 13px; line-height: 1.4; background: #f0fdf4; padding: 8px; border-radius: 6px; border-left: 3px solid #22c55e;">
                            ${investment.description}
                        </p>
                        <div style="text-align: center; padding-top: 10px; border-top: 1px solid #e2e8f0;">
                            <span style="background: #22c55e; color: white; padding: 4px 12px; border-radius: 12px; font-size: 12px; font-weight: 600;">
                                ABGESCHLOSSEN
                            </span>
                        </div>
                    </div>
                `;

                marker.bindPopup(popupContent, {
                    maxWidth: 320,
                    className: 'finished-popup', // This remains a string for Leaflet
                    closeButton: true,
                });

                marker.on('click', () => {
                    setSelectedInvestment(investment);
                    marker.openPopup();
                });

                markersRef.current.push(marker);
            }
        });
    }, [investments]);

    useEffect(() => {
        if (isMapLoaded) {
            addMarkersToMap();
        }
    }, [investments, isMapLoaded, addMarkersToMap]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    const closeModal = () => {
        setSelectedInvestment(null);
        setIsEditMode(false);
        setEditingInvestment(null);
    };

    const handleEdit = (investment: FinishedInvestment) => {
        setEditingInvestment(investment);
        setIsEditMode(true);
        setSelectedInvestment(null);
    };

    const handleDelete = async (id: number) => {
        if (!isAdmin() || !confirm('Sind Sie sicher, dass Sie diese Investition löschen möchten?')) {
            return;
        }

        try {
            const response = await fetch(`/api/finished-investments/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete investment');
            }

            setInvestments(investments.filter(inv => inv.id !== id));
            setSelectedInvestment(null);
        } catch (err) {
            console.error('Error deleting investment:', err);
            setError('Fehler beim Löschen der Investition');
        }
    };

    if (isLoading) {
        return (
            <div className={styles.loadingContainer}>
                <div className={styles.loadingContent}>
                    <div className={styles.loadingSpinner}></div>
                    <p className={styles.loadingText}>Abgeschlossene Investitionen werden geladen...</p>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <div className={styles.headerContent}>
                    <h1 className={styles.title}>
                        Radar: Abgeschlossene Investitionen
                    </h1>
                    {isAdmin() && (
                        <button
                            onClick={() => setIsAddModalOpen(true)}
                            className={styles.addButton}
                        >
                            <span className={styles.addIcon}>+</span> Investition hinzufügen
                        </button>
                    )}
                </div>
            </div>

            {error && (
                <div className={styles.errorMessage}>
                    <div className={styles.errorContent}>
                        <span>Fehler: {error}</span>
                        <button
                            onClick={fetchFinishedInvestments}
                            className={styles.retryButton}
                        >
                            Erneut versuchen
                        </button>
                    </div>
                </div>
            )}

            <div className={styles.mainContent}>
                <div className={styles.mapSection}>
                    <div className={styles.mapHeader}>
                        <p className={styles.mapInstructions}>
                            📍 Interaktive Karte der abgeschlossenen Investitionen
                        </p>
                    </div>

                    <div ref={mapRef} className={styles.mapContainer}>
                        <div className={styles.mapControls}>
                            <button
                                onClick={() => mapView !== 'streets' && switchMapView()}
                                className={`${styles.mapControl} ${mapView === 'streets' ? styles.mapControlActive : ''}`}
                            >
                                🗺️ Straßen
                            </button>
                            <button
                                onClick={() => mapView !== 'satellite' && switchMapView()}
                                className={`${styles.mapControl} ${mapView === 'satellite' ? styles.mapControlActive : ''}`}
                            >
                                🛰️ Satellit
                            </button>
                        </div>

                        {!isMapLoaded && (
                            <div className={styles.mapPlaceholder}>
                                <p>Karte wird geladen...</p>
                            </div>
                        )}
                    </div>
                </div>

                <div className={styles.investmentsList}>
                    {investments.map((investment) => (
                        <div
                            key={investment.id}
                            className={styles.investmentCard}
                            onClick={() => setSelectedInvestment(investment)}
                        >
                            <div className={styles.cardContent}>
                                <div className={styles.cardHeader}>
                                    <h3 className={styles.cardTitle}>
                                        {investment.title}
                                    </h3>
                                    <span className={styles.statusBadge}>
                                        ✓ Abgeschlossen
                                    </span>
                                </div>
                                <p className={styles.cardDescription}>
                                    {investment.description}
                                </p>
                                <div className={styles.cardDetails}>
                                    <div className={styles.cardDetail}>
                                        <span className={styles.cardLabel}>Budget:</span>
                                        <span className={`${styles.cardValue} ${styles.budgetValue}`}>
                                            {formatCurrency(investment.budget)}
                                        </span>
                                    </div>
                                    <div className={styles.cardDetail}>
                                        <span className={styles.cardLabel}>Region:</span>
                                        <span className={styles.cardValue}>{investment.region}</span>
                                    </div>
                                    <div className={styles.cardDetail}>
                                        <span className={styles.cardLabel}>Typ:</span>
                                        <span className={styles.cardValue}>{investment.type}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {investments.length === 0 && (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>📋</div>
                        <p className={styles.emptyText}>
                            Noch keine abgeschlossenen Investitionen vorhanden.
                        </p>
                    </div>
                )}
            </div>

            {/* Investment Detail Modal */}
            {selectedInvestment && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modal}>
                        <div className={styles.modalHeader}>
                            <div className={styles.modalTitleRow}>
                                <h2 className={styles.modalTitle}>
                                    {selectedInvestment.title}
                                </h2>
                                <button
                                    onClick={closeModal}
                                    className={styles.closeButton}
                                >
                                    ×
                                </button>
                            </div>
                            <div className={styles.modalBadgeContainer}>
                                <span className={styles.modalBadge}>
                                    ✓ Abgeschlossen
                                </span>
                            </div>
                        </div>

                        <div className={styles.modalContent}>
                            <div className={styles.modalDescription}>
                                <h3 className={styles.descriptionLabel}>Beschreibung:</h3>
                                <p className={styles.descriptionText}>
                                    {selectedInvestment.description}
                                </p>
                            </div>

                            <div className={styles.modalGrid}>
                                <div className={`${styles.modalInfoCard} ${styles.budgetInfo}`}>
                                    <div className={styles.infoIcon}>💰</div>
                                    <div className={styles.infoLabel}>Budget</div>
                                    <div className={styles.infoValue}>
                                        {formatCurrency(selectedInvestment.budget)}
                                    </div>
                                </div>

                                <div className={styles.modalInfoCard}>
                                    <div className={styles.infoIcon}>📍</div>
                                    <div className={styles.infoLabel}>Region</div>
                                    <div className={styles.infoValue}>
                                        {selectedInvestment.region}
                                    </div>
                                </div>

                                <div className={styles.modalInfoCard}>
                                    <div className={styles.infoIcon}>🏗️</div>
                                    <div className={styles.infoLabel}>Typ</div>
                                    <div className={styles.infoValue}>
                                        {selectedInvestment.type}
                                    </div>
                                </div>

                                {selectedInvestment.completedDate && (
                                    <div className={styles.modalInfoCard}>
                                        <div className={styles.infoIcon}>📅</div>
                                        <div className={styles.infoLabel}>Abgeschlossen</div>
                                        <div className={styles.infoValue}>
                                            {new Date(selectedInvestment.completedDate).toLocaleDateString('de-DE')}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {selectedInvestment.contractor && (
                                <div className={styles.contractorSection}>
                                    <h3 className={styles.contractorLabel}>Auftragnehmer:</h3>
                                    <p className={styles.contractorText}>{selectedInvestment.contractor}</p>
                                </div>
                            )}
                        </div>

                        <div className={styles.modalFooter}>
                            <button
                                onClick={closeModal}
                                className={styles.closeModalButton}
                            >
                                Schließen
                            </button>
                            {isAdmin() && (
                                <div className={styles.actionButtons}>
                                    <button
                                        onClick={() => handleEdit(selectedInvestment)}
                                        className={styles.editButton}
                                    >
                                        Bearbeiten
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedInvestment.id)}
                                        className={styles.deleteButton}
                                    >
                                        Löschen
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InvestmentsFinished;