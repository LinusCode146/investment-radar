"use client"

import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './InvestmentMap.module.css';
import InvestmentCard from './InvestmentCard';
import SuggestionModal from './SuggestionModal';
import {useAuth} from "@/contexts/AuthContext";

interface Investment {
    id: number;
    title: string;
    description: string;
    type: string;
    location: string;
    lat?: number;
    lng?: number;
    likes: number;
    authorAge: string;
    authorPlz: string;
    approved: boolean;
}

interface NewInvestmentData {
    title: string;
    description: string;
    type: string;
    location: string;
    lat?: number;
    lng?: number;
    authorAge: string;
    authorPlz: string;
}

// Declare global Leaflet types
declare global {
    interface Window {
        L: any;
    }
}

const InvestmentMap: React.FC = () => {
    const { isAdmin } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [investments, setInvestments] = useState<Investment[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, address?: string} | null>(null);
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | null>(null);
    const [mapView, setMapView] = useState<'streets' | 'satellite'>('streets');
    const [likedInvestments, setLikedInvestments] = useState<Set<number>>(new Set());

    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<any>(null);
    const markersRef = useRef<any[]>([]);
    const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const currentPopupRef = useRef<any>(null);

    // Load liked investments from localStorage on mount
    useEffect(() => {
        const savedLikes = localStorage.getItem('investment-likes');
        if (savedLikes) {
            try {
                const likedIds = JSON.parse(savedLikes);
                setLikedInvestments(new Set(likedIds));
            } catch (error) {
                console.warn('Failed to load liked investments from localStorage:', error);
            }
        }
    }, []);

    // Save liked investments to localStorage
    const saveLikedInvestments = (likedIds: Set<number>) => {
        try {
            localStorage.setItem('investment-likes', JSON.stringify(Array.from(likedIds)));
        } catch (error) {
            console.warn('Failed to save liked investments to localStorage:', error);
        }
    };

    // Check if user has already liked an investment
    const hasUserLiked = (investmentId: number): boolean => {
        return likedInvestments.has(investmentId);
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
                setIsModalOpen(true);
            } catch (error) {
                console.error('Error getting location details:', error);
                setSelectedLocation({ lat, lng });
                setIsModalOpen(true);
            }
        });

        setIsMapLoaded(true);
    }, []);

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

    // Custom marker icon
    const createCustomIcon = () => {
        if (!window.L) return null;

        return window.L.divIcon({
            html: `<div style="
                background: #4a6fa5;
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
            className: 'custom-marker',
            iconSize: [24, 24],
            iconAnchor: [12, 24],
            popupAnchor: [0, -24]
        });
    };

    // Create enhanced popup content with like status
    const createPopupContent = (investment: Investment) => {
        const hasLiked = hasUserLiked(investment.id);

        return `
            <div style="
                max-width: 280px; 
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
                        color: #4a6fa5; 
                        font-size: 13px; 
                        font-weight: 500;
                    "><strong>Typ:</strong> ${investment.type}</p>
                    
                    <p style="
                        margin: 0 0 6px 0; 
                        color: #666; 
                        font-size: 13px;
                    "><strong>Standort:</strong> ${investment.location}</p>
                </div>
                
                <p style="
                    margin: 0 0 12px 0; 
                    color: #4a5568; 
                    font-size: 13px; 
                    line-height: 1.4;
                    background: #f7fafc;
                    padding: 8px;
                    border-radius: 6px;
                    border-left: 3px solid #4a6fa5;
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
                    ">von ${investment.authorAge}</span>
                    
                    <div style="
                        display: flex; 
                        align-items: center; 
                        gap: 4px;
                        background: ${hasLiked ? '#f0f9ff' : '#f0fff4'};
                        padding: 4px 8px;
                        border-radius: 12px;
                        border: 1px solid ${hasLiked ? '#bae6fd' : '#c6f6d5'};
                        ${hasLiked ? 'opacity: 0.7;' : ''}
                    ">
                        <span style="color: ${hasLiked ? '#0284c7' : '#38a169'}; font-size: 14px;">${hasLiked ? '💙' : '💚'}</span>
                        <span style="
                            color: ${hasLiked ? '#0284c7' : '#38a169'}; 
                            font-size: 13px; 
                            font-weight: 600;
                        ">${investment.likes}</span>
                        ${hasLiked ? '<span style="color: #64748b; font-size: 10px; margin-left: 4px;">(bereits geliked)</span>' : ''}
                    </div>
                </div>
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
                    maxWidth: 320,
                    className: 'custom-popup',
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

            // Add coordinates if a location was selected
            const suggestionWithCoords = {
                ...newSuggestion,
                ...(selectedLocation && {
                    lat: selectedLocation.lat,
                    lng: selectedLocation.lng,
                    location: selectedLocation.address || newSuggestion.location
                })
            };

            const response = await fetch('/api/investment', {
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

            const createdInvestment = await response.json();
            setInvestments([...investments, createdInvestment]);
            setIsModalOpen(false);
            setSelectedLocation(null);
        } catch (err) {
            console.error('Error creating investment:', err);
            setError(err instanceof Error ? err.message : 'Failed to create investment');
        }
    };

    const handleLike = async (id: number) => {
        const investment = investments.find(inv => inv.id === id);
        if (!investment) return;

        // Prüfe, ob der Nutzer bereits geliked hat
        if (hasUserLiked(id)) {
            // Like entfernen
            try {
                const updatedData = {
                    likes: investment.likes > 0 ? investment.likes - 1 : 0
                };

                const response = await fetch(`/api/investment/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(updatedData),
                });

                if (!response.ok) {
                    throw new Error(`Fehler beim Entfernen des Likes: ${response.statusText}`);
                }

                const updatedInvestment = await response.json();

                setInvestments(investments.map(inv =>
                    inv.id === id ? updatedInvestment : inv
                ));

                // Like aus Set entfernen und speichern
                const newLikedInvestments = new Set(likedInvestments);
                newLikedInvestments.delete(id);
                setLikedInvestments(newLikedInvestments);
                saveLikedInvestments(newLikedInvestments);

            } catch (err) {
                console.error('Fehler beim Entfernen des Likes:', err);
                setError(err instanceof Error ? err.message : 'Fehler beim Entfernen des Likes');
                setTimeout(() => setError(null), 5000);
            }
            return;
        }

        // Like hinzufügen
        try {
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

            setInvestments(investments.map(inv =>
                inv.id === id ? updatedInvestment : inv
            ));

            // Like zum Set hinzufügen und speichern
            const newLikedInvestments = new Set(likedInvestments);
            newLikedInvestments.add(id);
            setLikedInvestments(newLikedInvestments);
            saveLikedInvestments(newLikedInvestments);

        } catch (err) {
            console.error('Error updating likes:', err);
            setError(err instanceof Error ? err.message : 'Failed to update likes');
            setTimeout(() => setError(null), 5000);
        }
    };

    const handleModalCancel = () => {
        setIsModalOpen(false);
        setSelectedLocation(null);
    };

    // Filter für Investments
    const visibleInvestments = isAdmin()
        ? investments
        : investments.filter(inv => inv.approved);

    const handleApprove = async (id: number) => {
        try {
            const updatedData = {
                approved: true
            };

            const response = await fetch(`/api/investment/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedData),
            });

            if (!response.ok) {
                throw new Error(`Fehler beim Entfernen des Likes: ${response.statusText}`);
            }

            const updatedInvestment = await response.json();

            setInvestments(investments.map(inv =>
                inv.id === id ? updatedInvestment : inv
            ));

        } catch (err) {
            console.error('Fehler beim Entfernen des Likes:', err);
            setError(err instanceof Error ? err.message : 'Fehler beim Entfernen des Likes');
            setTimeout(() => setError(null), 5000);
        }
        return;
    };

    // Delete investment by ID
    const handleDelete = async (id: number) => {
        if (!window.confirm('Möchten Sie dieses Investment wirklich löschen?')) return;
        try {
            const res = await fetch(`/api/investment/${id}`, { method: 'DELETE' });
            if (res.ok) {
                setInvestments(prev => prev.filter(inv => inv.id !== id));
            } else {
                alert('Fehler beim Löschen des Investments.');
            }
        } catch (error) {
            alert('Fehler beim Löschen des Investments.');
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
                    <div className={styles.mapInstructions}>
                        🗺️ Klicken Sie auf die Karte, um einen neuen Investitionsvorschlag zu erstellen
                    </div>

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
                {visibleInvestments.length === 0 ? (
                    <div className={styles.emptyMessage}>Keine Investments gefunden.</div>
                ) : (
                    visibleInvestments.map(inv => (
                        <div key={inv.id} className={styles.investmentCard}>
                            <InvestmentCard
                                investment={inv}
                                onLike={() => handleLike(inv.id)}
                                hasUserLiked={hasUserLiked(inv.id)}
                                isAdmin={isAdmin()}
                                onApprove={() => handleApprove(inv.id)}
                                onDelete={() => handleDelete(inv.id)} // Pass delete handler
                            />
                        </div>
                    ))
                )}
            </div>

            {isModalOpen && (
                <SuggestionModal
                    onSubmit={handleAddSuggestion}
                    onCancel={handleModalCancel}
                    prefilledLocation={selectedLocation?.address}
                />
            )}
        </div>
    );
};

export default InvestmentMap;

//TODO
// - improve position of street/satellite toggle
// - apply design to InvestmentsFinished