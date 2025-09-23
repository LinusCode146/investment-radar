"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import styles from './InvestmentsFinished.module.css';
import SuggestionModal from './SuggestionModal';
import InvestmentModal from "@/components/InvestmentModal";

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

interface NewInvestmentData {
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
    const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, address?: string} | null>(null);

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const currentPopupRef = useRef<any>(null);

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

    // Reverse geocoding using Nominatim (free)
    const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
        try {
            const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}&accept-language=de,en`
            );
            const data = await response.json();
            return data.display_name || `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        } catch (error) {
            console.warn('Geocoding failed:', error);
            return `${lat.toFixed(4)}, ${lng.toFixed(4)}`;
        }
    };

    // Initialize Leaflet Map
    const initializeMap = useCallback(() => {
        if (!window.L || !mapRef.current) return;

        // Clear any existing map instance
        if (mapInstanceRef.current) {
            mapInstanceRef.current.remove();
            mapInstanceRef.current = null;
        }

        // Create map centered on Rüdesheim am Rhein
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

        // Create tile layers
        const streetsLayer = window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
        });

        const satelliteLayer = window.L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            attribution: '© <a href="https://www.esri.com/">Esri</a>, DigitalGlobe, GeoEye, Earthstar Geographics, CNES/Airbus DS, USDA, USGS, AeroGRID, IGN, and the GIS User Community',
            maxZoom: 19,
        });

        // Set initial layer based on current view
        if (mapView === 'streets') {
            streetsLayer.addTo(map);
        } else {
            satelliteLayer.addTo(map);
        }

        // Store layers on the map instance for switching
        map._streetsLayer = streetsLayer;
        map._satelliteLayer = satelliteLayer;

        mapInstanceRef.current = map;

        // Add click listener for placing pins
        map.on('click', async (event: any) => {
            const { lat, lng } = event.latlng;

            try {
                const address = await reverseGeocode(lat, lng);
                setSelectedLocation({ lat, lng, address });
                setIsAddModalOpen(true);
            } catch (error) {
                console.error('Error getting location details:', error);
                setSelectedLocation({ lat, lng });
                setIsAddModalOpen(true);
            }
        });

        setIsMapLoaded(true);
    }, [mapView]);

    // Switch map view
    const switchMapView = useCallback(() => {
        if (!mapInstanceRef.current) return;

        const map = mapInstanceRef.current;
        const newView = mapView === 'streets' ? 'satellite' : 'streets';

        // Remove current layer and add new one
        if (mapView === 'streets' && map._streetsLayer && map._satelliteLayer) {
            map.removeLayer(map._streetsLayer);
            map._satelliteLayer.addTo(map);
        } else if (mapView === 'satellite' && map._streetsLayer && map._satelliteLayer) {
            map.removeLayer(map._satelliteLayer);
            map._streetsLayer.addTo(map);
        }

        setMapView(newView);
    }, [mapView]);

    // Load Leaflet library
    useEffect(() => {
        if (window.L) {
            initializeMap();
            return;
        }

        // Load Leaflet CSS
        const link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.integrity = 'sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY=';
        link.crossOrigin = '';
        document.head.appendChild(link);

        // Load Leaflet JavaScript
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.integrity = 'sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo=';
        script.crossOrigin = '';
        script.async = true;
        script.onload = () => {
            // Small delay to ensure DOM is ready
            setTimeout(() => {
                initializeMap();
            }, 100);
        };

        document.head.appendChild(script);

        return () => {
            // Cleanup
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
            if (script.parentNode) {
                script.parentNode.removeChild(script);
            }
            if (link.parentNode) {
                link.parentNode.removeChild(link);
            }
        };
    }, [initializeMap]);

    // Custom marker icon for finished investments (different style)
    const createCustomIcon = () => {
        if (!window.L) return null;

        return window.L.divIcon({
            html: `<div style="
                background: #38a169;
                width: 24px;
                height: 24px;
                border-radius: 50% 50% 50% 0;
                transform: rotate(-45deg);
                border: 2px solid #fff;
                box-shadow: 0 3px 6px rgba(0,0,0,0.3);
                display: flex;
                align-items: center;
                justify-content: center;
            ">
                <div style="
                    width: 8px;
                    height: 8px;
                    background: white;
                    border-radius: 50%;
                    transform: rotate(45deg);
                "></div>
            </div>`,
            className: 'custom-marker-finished',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });
    };

    // Format currency helper
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('de-DE', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    // Create enhanced popup content for finished investments
    const createPopupContent = (investment: FinishedInvestment) => {
        return `
            <div style="
                max-width: 300px; 
                font-family: Calibri, sans-serif; 
                padding: 4px;
                line-height: 1.5;
            ">
                <h3 style="
                    margin: 0 0 12px 0; 
                    color: #2d3748; 
                    font-size: 16px; 
                    font-weight: 600;
                    border-bottom: 1px solid #e2e8f0;
                    padding-bottom: 8px;
                ">${investment.title}</h3>
                
                <div style="margin-bottom: 10px;">
                    <p style="
                        margin: 0 0 6px 0; 
                        color: #38a169; 
                        font-size: 13px; 
                        font-weight: 500;
                    "><strong>Typ:</strong> ${investment.type}</p>
                    
                    <p style="
                        margin: 0 0 6px 0; 
                        color: #666; 
                        font-size: 13px;
                    "><strong>Standort:</strong> ${investment.location}</p>
                    
                    <p style="
                        margin: 0 0 6px 0; 
                        color: #666; 
                        font-size: 13px;
                    "><strong>Budget:</strong> ${formatCurrency(investment.budget)}</p>
                </div>
                
                <p style="
                    margin: 0 0 12px 0; 
                    color: #4a5568; 
                    font-size: 13px; 
                    line-height: 1.4;
                    background: #f0fff4;
                    padding: 8px;
                    border-radius: 6px;
                    border-left: 3px solid #38a169;
                ">${investment.description}</p>
                
                <div style="
                    display: flex; 
                    justify-content: space-between; 
                    align-items: center; 
                    padding-top: 10px; 
                    border-top: 1px solid #e2e8f0;
                ">
                    <span style="
                        color: #718096; 
                        font-size: 12px;
                        font-style: italic;
                    ">${investment.region}</span>
                    
                    ${investment.completed ? `
                    <div style="
                        display: flex; 
                        align-items: center; 
                        gap: 4px;
                        background: #f0fff4;
                        padding: 4px 8px;
                        border-radius: 12px;
                        border: 1px solid #c6f6d5;
                    ">
                        <span style="color: #38a169; font-size: 14px;">✓</span>
                        <span style="
                            color: #38a169; 
                            font-size: 13px; 
                            font-weight: 600;
                        ">Abgeschlossen</span>
                    </div>
                </div>
                ` : ''}
                
                ${investment.completedDate ? `
                <div style="
                    margin-top: 8px;
                    padding-top: 8px;
                    border-top: 1px solid #e2e8f0;
                    font-size: 12px;
                    color: #666;
                ">
                    <strong>Abgeschlossen am:</strong> ${new Date(investment.completedDate).toLocaleDateString('de-DE')}
                </div>
                ` : ''}
                
                ${investment.contractor ? `
                <div style="
                    margin-top: 4px;
                    font-size: 12px;
                    color: #666;
                ">
                    <strong>Auftragnehmer:</strong> ${investment.contractor}
                </div>
                ` : ''}
            </div>
        `;
    };

    // Add markers to map with improved hover functionality
    const addMarkersToMap = useCallback(() => {
        if (!mapInstanceRef.current || !window.L) return;

        // Clear existing markers
        markersRef.current.forEach(marker => {
            if (marker.remove) {
                marker.remove();
            } else {
                mapInstanceRef.current.removeLayer(marker);
            }
        });
        markersRef.current = [];

        const customIcon = createCustomIcon();

        investments.forEach((investment) => {
            if (investment.lat && investment.lng) {
                const marker = window.L.marker(
                    [investment.lat, investment.lng],
                    customIcon ? { icon: customIcon } : {}
                ).addTo(mapInstanceRef.current);

                const popupContent = createPopupContent(investment);

                marker.bindPopup(popupContent, {
                    maxWidth: 350,
                    className: 'custom-popup-finished',
                    closeButton: true,
                    autoPan: true,
                    autoPanPadding: [10, 10],
                    closeOnClick: false,
                    autoClose: false
                });

                let isHovering = false;
                let hoverTimeout: NodeJS.Timeout | null = null;

                // Enhanced hover functionality with proper cleanup
                marker.on('mouseover', (e: any) => {
                    isHovering = true;

                    // Clear any existing timeout
                    if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                    }

                    // Set timeout to show popup after 600ms
                    hoverTimeout = setTimeout(() => {
                        if (isHovering) {
                            marker.openPopup();
                            currentPopupRef.current = marker;
                        }
                    }, 600);
                });

                marker.on('mouseout', (e: any) => {
                    isHovering = false;

                    // Clear timeout if mouse leaves before popup shows
                    if (hoverTimeout) {
                        clearTimeout(hoverTimeout);
                        hoverTimeout = null;
                    }

                    // Close popup after a short delay to allow moving to popup
                    setTimeout(() => {
                        if (!isHovering && currentPopupRef.current === marker) {
                            marker.closePopup();
                            currentPopupRef.current = null;
                        }
                    }, 200);
                });

                // Handle popup hover to keep it open
                marker.on('popupopen', () => {
                    const popup = marker.getPopup();
                    const popupElement = popup.getElement();

                    if (popupElement) {
                        popupElement.addEventListener('mouseenter', () => {
                            isHovering = true;
                        });

                        popupElement.addEventListener('mouseleave', () => {
                            isHovering = false;
                            setTimeout(() => {
                                if (!isHovering) {
                                    marker.closePopup();
                                    currentPopupRef.current = null;
                                }
                            }, 200);
                        });
                    }
                });

                // Click event
                marker.on('click', () => {
                    setSelectedInvestment(investment);
                    marker.openPopup();
                    currentPopupRef.current = marker;
                });

                markersRef.current.push(marker);
            }
        });
    }, [investments]);

    // Update markers when investments change
    useEffect(() => {
        if (isMapLoaded) {
            addMarkersToMap();
        }
    }, [investments, isMapLoaded, addMarkersToMap]);

    const openModal = (investment: FinishedInvestment) => {
        setSelectedInvestment(investment);
    };

    const closeModal = () => {
        setSelectedInvestment(null);
    };

    const handleAddSuggestion = async (newSuggestion: NewInvestmentData) => {
        try {
            setError(null);

            // Add coordinates if a location was selected
            const suggestionWithCoords = {
                ...newSuggestion,
                ...(selectedLocation && {
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                    location: selectedLocation.address || newSuggestion.location
                })
            };

            console.log(suggestionWithCoords)

            const response = await fetch('/api/finished-investments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(suggestionWithCoords),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || `Failed to create investment: ${response.statusText}`);
            }

            setIsAddModalOpen(false);
            setSelectedLocation(null);

            // Optionally show success message or refresh data
            // For now, we'll just close the modal since this adds to regular investments, not finished ones
        } catch (err) {
            console.error('Error creating investment:', err);
            setError(err instanceof Error ? err.message : 'Failed to create investment');
        }
    };

    const handleModalCancel = () => {
        setIsAddModalOpen(false);
        setSelectedLocation(null);
    };

    if (isLoading) {
        return (
            <div className={styles.container}>
                <div className={styles.loadingMessage}>Fertige Investitionen werden geladen...</div>
            </div>
        );
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Radar: Getätigte Investitionen</h1>
                <button
                    className={styles.addButton}
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <span className={styles.addIcon}>+</span>
                    Investment hinzufügen
                </button>
            </header>

            {error && (
                <div className={styles.errorMessage}>
                    <p>Fehler: {error}</p>
                    <button onClick={fetchFinishedInvestments} className={styles.retryButton}>
                        Erneut versuchen
                    </button>
                </div>
            )}

            <div className={styles.mapSection}>
                <div className={styles.mapContainer}>
                    {/* Map View Toggle */}
                    <div className={styles.mapControls}>
                        <button
                            className={mapView === 'streets' ? styles.mapControlActive : styles.mapControl}
                            onClick={() => mapView !== 'streets' && switchMapView()}
                        >
                            🗺️ Straßen
                        </button>
                        <button
                            className={mapView === 'satellite' ? styles.mapControlActive : styles.mapControl}
                            onClick={() => mapView !== 'satellite' && switchMapView()}
                        >
                            🛰️ Satellit
                        </button>
                    </div>

                    <div
                        ref={mapRef}
                        className={styles.mapPlaceholder}
                        style={{ height: '450px', width: '100%' }}
                    >
                        {!isMapLoaded && (
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                height: '100%',
                                backgroundColor: '#f5f5f5',
                                color: '#666',
                                fontFamily: 'Calibri, sans-serif'
                            }}>
                                Karte wird geladen...
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className={styles.investmentsList}>
                {investments.length === 0 && !isLoading ? (
                    <div className={styles.emptyMessage}>
                        Noch keine abgeschlossenen Investitionen vorhanden.
                    </div>
                ) : (
                    investments.map((investment) => (
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
                    ))
                )}
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
                                <label className={styles.modalLabel}>Art der Investition:</label>
                                <span className={styles.modalValue}>{selectedInvestment.type}</span>
                            </div>

                            <div className={styles.modalField}>
                                <label className={styles.modalLabel}>Beschreibung:</label>
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
                                        <strong>Status:</strong> {selectedInvestment.completed ? 'Abgeschlossen' : 'Im Prozess'}
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
                                        <strong>Standort:</strong> {selectedInvestment.location}
                                    </div>
                                </div>

                                {selectedInvestment.completedDate && (
                                    <div className={styles.modalInfoItem}>
                                        <span className={styles.modalIcon}>📅</span>
                                        <div>
                                            <strong>Completed Date:</strong> {new Date(selectedInvestment.completedDate).toLocaleDateString('de-DE')}
                                        </div>
                                    </div>
                                )}

                                {selectedInvestment.contractor && (
                                    <div className={styles.modalInfoItem}>
                                        <span className={styles.modalIcon}>🏗️</span>
                                        <div>
                                            <strong>Contractor:</strong> {selectedInvestment.contractor}
                                        </div>
                                    </div>
                                )}
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

            {isAddModalOpen && (
                <InvestmentModal
                    onSubmit={handleAddSuggestion}
                    onCancel={handleModalCancel}
                    prefilledLocation={selectedLocation}
                />
            )}
        </div>
    );
};

export default InvestmentsFinished;