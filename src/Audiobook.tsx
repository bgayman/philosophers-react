import React, { useState, useRef } from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faArrowLeft,
    faArrowUpFromBracket,
    faPlay,
    faPause,
    faDownload
} from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import colors from './color';
import IconButton from './IconButton';
import QuoteImage from './QuoteImage';
import Spacer from './Spacer';
import LoadingBounce from './LoadingBounce';
import AudioPlaybackControls from './AudioPlaybackControls';
import { AudiobookQuery, AudiobookQueryVariables } from './gql/graphql';

const AUDIOBOOK_QUERY = gql`
  query Audiobook($idString: String!) {
    philosopherByAudiobookID(idString: $idString) {
      philosopher {
        id
        name
        username
        images {
          illustrations {
            ill750x750
          }
        }
      }
      audiobook {
        id
        title
        copyrightYear
        numberOfSections
        description
        totalTimeSecs
        language
        translators {
          id
          firstName
          lastName
          dateOfBirth
          dateOfDeath
        }
        sections {
          id
          title
          fileName
          language
          listenURL
          playtime
          readers {
            displayName
            readerID
          }
          sectionNumber
        }
        authors {
          id
          firstName
          lastName
          dateOfBirth
          dateOfDeath
        }
        genres {
          id
          name
        }
        urlInternetArchive
        urlLibrivox
        urlOther
        urlProject
        urlRSS
        urlTextSource
        urlZipFile
      }
    }
  }
`;

const formatPlaybackTime = (totalSeconds: number): string => {
    if (!totalSeconds) return '0s';

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const parts = [];
    if (hours > 0) parts.push(`${hours}h`);
    if (minutes > 0) parts.push(`${minutes}m`);
    if (seconds > 0 || parts.length === 0) parts.push(`${seconds}s`);

    return parts.join(' ');
};

const Audiobook = () => {
    const { audiobookId } = useParams();
    const navigate = useNavigate();
    const [currentlyPlayingId, setCurrentlyPlayingId] = useState<string | null>(null);
    const audioRef = useRef<HTMLAudioElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const { loading, error, data } = useQuery<AudiobookQuery, AudiobookQueryVariables>(
        AUDIOBOOK_QUERY,
        { variables: { idString: audiobookId ?? '' } }
    );

    if (loading) return <LoadingBounce />;
    if (error) return null;

    const { philosopher, audiobook } = data?.philosopherByAudiobookID || {};
    if (!philosopher || !audiobook) return null;

    const handleBack = () => navigate(-1);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: audiobook.title ?? '',
                    url: window.location.href
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    const handleDownload = () => {
        if (audiobook.urlZipFile) {
            window.location.href = audiobook.urlZipFile;
        }
    };

    const handlePlayPause = (sectionId: string, url: string) => {
        if (currentlyPlayingId === sectionId) {
            if (isPlaying) {
                audioRef.current?.pause();
            } else {
                audioRef.current?.play();
            }
            setIsPlaying(!isPlaying);
        } else {
            if (audioRef.current) {
                audioRef.current.src = url;
                audioRef.current.play();
                setCurrentlyPlayingId(sectionId);
                setIsPlaying(true);
            }
        }
    };

    const sortedSections = [...(audiobook.sections ?? [])].sort((a, b) =>
        parseInt(a.sectionNumber) - parseInt(b.sectionNumber)
    );

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: colors.white,
            paddingBottom: '160px' // Space for playback controls
        }}>
            {/* Hidden audio element */}
            <audio ref={audioRef} />

            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                zIndex: 10,
                height: '62px',
                width: '100%',
                borderBottom: `4px solid ${colors.tan}`,
                backgroundColor: `${colors.white}aa`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)'
            }}>
                <div style={{
                    display: 'flex',
                    height: '100%',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '0 16px'
                }}>
                    <IconButton onClick={handleBack}>
                        <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                    </IconButton>
                    <div style={{
                        flex: 1,
                        minWidth: 0 // Enable text truncation
                    }}>
                        <div style={{
                            fontSize: '1.4em',
                            fontWeight: 700,
                            color: colors.black,
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis'
                        }}>
                            {audiobook.title}
                        </div>
                        {data && <div style={{
                            fontWeight: 500,
                            fontSize: '0.8em',
                            color: colors.black,
                            opacity: 0.9,
                        }}>
                            {audiobook.sections?.length === 1 ? `${audiobook.sections?.length ?? 0} section` : `${audiobook.sections?.length ?? 0} sections`}
                        </div>}
                    </div>
                    <IconButton onClick={handleShare}>
                        <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                    </IconButton>
                </div>
            </div>

            {/* Header Section */}
            <div style={{
                padding: '16px',
                backgroundColor: `${colors.black}10`,
                borderBottom: `4px solid ${colors.tan}`,
                position: 'relative'
            }}>
                <div style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '16px'
                }}>
                    <div style={{
                        width: '192px',
                        height: '192px',
                        position: 'relative',
                        borderRadius: '12px',
                        overflow: 'hidden',
                        backgroundColor: colors.tan
                    }}>
                        <img
                            src={`https://philosophersapi.com/Images/LibriVox/${audiobook.id}.jpg`}
                            alt={audiobook.title ?? ''}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                        />
                        {/* Philosopher image overlay */}
                        <div style={{
                            position: 'absolute',
                            bottom: '12px',
                            right: '12px',
                            width: '80px',
                            height: '80px',
                            boxShadow: `0px 0px 10px ${colors.black}bb`,
                            borderRadius: '50%',
                        }}>
                            <QuoteImage
                                philosopher={{
                                    id: philosopher.id,
                                    name: philosopher.name,
                                    username: philosopher.username,
                                    images: {
                                        thumbnailIllustrations: {
                                            thumbnailIll150x150: philosopher.images.illustrations.ill750x750
                                        }
                                    }
                                }}
                                width='80px'
                                height='80px'
                            />
                        </div>
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        height: '192px',
                        gap: '2px',
                    }}>
                        <Spacer />
                        <div style={{
                            fontSize: '1.5em',
                            fontWeight: 700,
                            color: colors.black
                        }}>
                            {philosopher.name}
                        </div>
                        <div>
                            <a
                                href={audiobook.urlLibrivox ?? "https://librivox.org"}
                                target="_blank"
                                rel="noopener noreferrer"
                                style={{
                                    color: colors.blue,
                                    textDecoration: 'none'
                                }}
                            >
                                LibriVox
                            </a>
                        </div>

                        {audiobook.authors && audiobook.authors.length > 0 && (
                            <div style={{
                                fontSize: '0.9em',
                                color: colors.black,
                                opacity: 0.7
                            }}>
                                {audiobook.authors.map(author =>
                                    `${author.firstName ?? ''} ${author.lastName ?? ''}`
                                ).join(', ')}
                            </div>
                        )}
                        {audiobook.urlZipFile && (
                            <IconButton onClick={handleDownload} color={`${colors.black}88`}>
                                <FontAwesomeIcon icon={faDownload} />
                            </IconButton>
                        )}
                        <Spacer />
                    </div>

                </div>
            </div>

            {/* Sections List */}
            <div style={{ padding: '16px' }}>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '16px'
                }}>
                    {sortedSections.map((section) => (
                        <div
                            key={section.id}
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '16px',
                                padding: '16px',
                                backgroundColor: colors.white,
                                borderRadius: '8px'
                            }}
                        >
                            <IconButton
                                onClick={() => section.listenURL && handlePlayPause(section.id, section.listenURL)}
                            >
                                <FontAwesomeIcon
                                    icon={currentlyPlayingId === section.id && isPlaying ? faPause : faPlay}
                                    size="lg"
                                />
                            </IconButton>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    margin: 0,
                                    fontSize: '1.1em',
                                    fontWeight: 600,
                                    color: colors.black
                                }}>
                                    {section.title}
                                </h3>
                                {section.readers && section.readers.length > 0 && (
                                    <div style={{
                                        fontSize: '0.9em',
                                        color: colors.black,
                                        opacity: 0.7
                                    }}>
                                        {section.readers.map(reader => reader.displayName).join(', ')}
                                    </div>
                                )}
                                <div style={{
                                    fontSize: '0.9em',
                                    color: colors.black,
                                    opacity: 0.5
                                }}>
                                    {formatPlaybackTime(parseInt(section.playtime ?? ''))}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Playback Controls */}
            <div style={{
                maxWidth: '600px',
                width: '100%',
            }}>
                <AudioPlaybackControls
                    audioRef={audioRef}
                    isPlaying={isPlaying}
                    onPlayPause={() => {
                        if (currentlyPlayingId) {
                            handlePlayPause(
                                currentlyPlayingId,
                                audiobook.sections?.find(s => s.id === currentlyPlayingId)?.listenURL ?? ''
                            );
                        }
                    }}
                />
            </div>

        </div>
    );
};

export default Audiobook;