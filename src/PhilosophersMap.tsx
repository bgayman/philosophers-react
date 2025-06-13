import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import Map from './Map';
import LoadingBounce from './LoadingBounce';
import IconButton from './IconButton';
import colors from './color';
import { useNavigate } from 'react-router-dom';
import { AllPhilosophersBirthplacesQuery } from './gql/graphql';

const ALL_PHILOSOPHERS_BIRTHPLACES = gql`
  query AllPhilosophersBirthplaces {
    allPhilosophers {
      id
      name
      birthLocation {
        latitude
        longitude
        name
      }
    }
  }
`;

interface MapMarker {
    id: string;
    name: string;
    birthLocation: {
        latitude: number;
        longitude: number;
        name: string;
    };
}

const PhilosophersMap = () => {
    const { loading, error, data } = useQuery<AllPhilosophersBirthplacesQuery>(ALL_PHILOSOPHERS_BIRTHPLACES);
    const navigate = useNavigate();

    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Map',
                    url: window.location.href
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    if (loading) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            width: '100%'
        }}>
            <LoadingBounce />
        </div>
    );

    if (error) return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '20px',
            color: colors.darkRed
        }}>
            Error loading map: {error.message}
        </div>
    );

    // Filter out philosophers without birth locations and map to markers
    const markers: MapMarker[] = data?.allPhilosophers
        .filter(p => p.birthLocation)
        .map(philosopher => ({
            id: philosopher.id ?? '',
            name: philosopher.name,
            birthLocation: {
                latitude: philosopher.birthLocation?.latitude ?? 0,
                longitude: philosopher.birthLocation?.longitude ?? 0,
                name: philosopher.birthLocation?.name ?? ''
            }
        })) ?? [];

    return (
        <div style={{
            height: '100vh',
            width: '100%',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: `${colors.white}aa`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 10,
                height: '62px',
                width: '100%',
                borderBottomColor: colors.tan,
                borderBottomWidth: '4px',
                borderBottomStyle: 'solid',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                padding: '0 16px'
            }}>
                <IconButton onClick={handleBack} accessibilityLabel='Go back'>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </IconButton>
                <div style={{
                    fontWeight: 700,
                    fontSize: '1.4em',
                    color: colors.black,
                }}>
                    Map
                </div>
                <div style={{ flex: 1 }} />
                <IconButton onClick={handleShare}>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>

            {/* Map Container */}
            <div style={{
                flex: 1,
                padding: '16px'
            }}>
                <Map
                    markers={markers}
                    initialRegion={{
                        latitude: 48.8566, // Paris
                        longitude: 2.3522,
                        latitudeDelta: 60,
                        longitudeDelta: 60,
                    }}
                />
            </div>
        </div>
    );
};

export default PhilosophersMap;