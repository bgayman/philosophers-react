import React, { useEffect, useRef } from 'react';
import LoadingBounce from './LoadingBounce';
import { getColorForUUID } from './colorForUUID';

interface Location {
    name: string;
    latitude: number;
    longitude: number;
}

interface MapMarker {
    id: string;
    name: string;
    birthLocation: Location;
}

interface MapProps {
    markers: MapMarker[];
    onMarkerClick?: (marker: MapMarker) => void;
    initialRegion?: {
        latitude: number;
        longitude: number;
        latitudeDelta: number;
        longitudeDelta: number;
    };
}

const Map: React.FC<MapProps> = ({
    markers,
    onMarkerClick,
    initialRegion = {
        latitude: 48.8566, // Paris
        longitude: 2.3522,
        latitudeDelta: 60,
        longitudeDelta: 60,
    }
}) => {
    const mapRef = useRef<HTMLDivElement>(null);
    const mapInstanceRef = useRef<mapkit.Map | null>(null);
    const markersRef = useRef<mapkit.MarkerAnnotation[]>([]);
    const [isLoading, setIsLoading] = React.useState(true);

    useEffect(() => {
        const initializeMap = async () => {
            if (!mapRef.current || mapInstanceRef.current) return;

            const map = new mapkit.Map(mapRef.current, {
                center: new mapkit.Coordinate(initialRegion.latitude, initialRegion.longitude)
            });
            mapInstanceRef.current = map;
            setIsLoading(false);
        };

        initializeMap();

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.destroy();
                mapInstanceRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapInstanceRef.current || isLoading) return;

        // Clear existing markers
        markersRef.current.forEach(marker => {
            marker.map?.removeAnnotation(marker);
        });
        markersRef.current = [];

        // Add new markers
        markers.forEach(marker => {
            if (!marker.birthLocation) return;

            const annotation = new mapkit.MarkerAnnotation(
                new mapkit.Coordinate(
                    marker.birthLocation.latitude,
                    marker.birthLocation.longitude
                ),
                {
                    title: marker.name,
                    subtitle: marker.birthLocation.name,
                    color: getColorForUUID(marker.id),
                }
            );

            if (onMarkerClick) {
                annotation.addEventListener('select', () => {
                    onMarkerClick(marker);
                });
            }

            mapInstanceRef.current?.addAnnotation(annotation);
            markersRef.current.push(annotation);
        });

        // Adjust map to show all markers if there are any
        if (markers.length > 0) {
            const padding = new mapkit.Padding(50, 50, 50, 50);
            mapInstanceRef.current.showItems(markersRef.current, { padding });
        }
    }, [markers, isLoading, onMarkerClick]);

    return (
        <>
            {isLoading && <LoadingBounce />}
            <div
                ref={mapRef}
                style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                }}
            />
        </>

    );
};

export default Map;