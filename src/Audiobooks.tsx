import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate, NavLink } from 'react-router-dom';
import colors from './color';
import IconButton from './IconButton';
import QuoteImage from './QuoteImage';
import BooksCollection from './BooksCollection';
import LoadingBounce from './LoadingBounce';
import { PhilosopherAudiobooksQuery } from './gql/graphql';
import Spacer from './Spacer';

const PHILOSOPHER_AUDIOBOOKS_QUERY = gql`
  query PhilosopherAudiobooks($name: String!) {
    philosopherByUsername(name: $name) {
      id
      name
      username
      images {
        illustrations {
          ill750x750
        }
      }
      libriVoxBooks {
        id
        title
        totalTime
      }
    }
  }
`;

type Audiobook = PhilosopherAudiobooksQuery['philosopherByUsername']['libriVoxBooks'][number];

const Audiobooks = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(PHILOSOPHER_AUDIOBOOKS_QUERY, {
        variables: { name: username || '' }
    });

    if (loading) return <LoadingBounce />;
    if (error) return null;

    const philosopher = data?.philosopherByUsername;
    if (!philosopher) return null;

    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: `${philosopher.name}'s Audiobooks`,
                    url: window.location.href
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    // Transform audiobooks data for BooksCollection
    const bookCollectionData = philosopher.libriVoxBooks.map((book: Audiobook) => ({
        id: book.id,
        title: book.title,
        image: `https://philosophersapi.com/Images/LibriVox/${book.id}.jpg`
    }));

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: colors.white,
        }}>
            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: `${colors.white}aa`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 200,
                height: '62px',
                width: '100%',
                borderBottomColor: colors.tan,
                borderBottomWidth: '4px',
                borderBottomStyle: 'solid',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px'
            }}>
                <IconButton onClick={handleBack} accessibilityLabel='Go back'>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </IconButton>
                <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px'
                }}>
                    <div style={{
                        fontWeight: 700,
                        fontSize: '1.4em',
                        color: colors.black,
                    }}>
                        {data?.philosopherByUsername.name ?? ''}
                    </div>
                    {data && <div style={{
                        fontWeight: 500,
                        fontSize: '0.8em',
                        color: colors.black,
                        opacity: 0.9,
                    }}>
                        {philosopher.libriVoxBooks.length === 1 ? `${philosopher.libriVoxBooks.length ?? 0} audiobook` : `${philosopher.libriVoxBooks.length ?? 0} audiobooks`}
                    </div>}
                </div>
                <Spacer />
                <IconButton onClick={handleShare}>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>

            {/* Content */}
            <div style={{
                padding: '16px',
                backgroundColor: `${colors.black}10`,
                borderBottomColor: colors.tan,
                borderBottomWidth: '4px',
                borderBottomStyle: 'solid',
                display: 'grid',
                gridTemplate: '1fr / 1fr'
            }}>

                <div style={{
                    gridArea: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    flexDirection: 'row'
                }}>
                    <BooksCollection books={bookCollectionData} />
                    <div>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#111827',
                            margin: 0,
                        }}>{philosopher.name}</h2>
                        <a
                            href="https://librivox.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: colors.blue,
                                fontSize: '14px',
                                textDecoration: 'none',
                            }}
                        >
                            LibriVox
                        </a>
                    </div>
                    <Spacer />
                </div>
                <div style={{
                    width: '190px',
                    height: '190px',
                    borderRadius: '50%',
                    gridArea: '1 / 1',
                    zIndex: 10,
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'end',
                    gap: '20px',
                }}>
                    <Spacer />
                    <div style={{
                        width: '80px',
                        height: '80px',
                        borderRadius: '50%',
                        boxShadow: `0px 0px 10px ${colors.black}bb`
                    }}>
                        <QuoteImage philosopher={{
                            id: philosopher.id,
                            name: philosopher.name,
                            username: philosopher.username,
                            images: {
                                thumbnailIllustrations: {
                                    thumbnailIll150x150: philosopher.images.illustrations.ill750x750
                                }
                            }
                        }} width='80px' height='80px' />
                    </div>
                </div>
            </div>

            {/* Books List */}
            <div style={{ padding: '16px' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {philosopher.libriVoxBooks.map((book: Audiobook) => (
                        <NavLink to={`/profile/${philosopher.username}/audiobooks/${book.id}`} className="nav-link">
                            <div
                                key={book.id}
                                style={{
                                    display: 'flex',
                                    gap: '8px',
                                    padding: '8px',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderRadius: '8px',
                                    textDecoration: 'none',
                                }}
                            >
                                <div style={{
                                    width: '80px',
                                    height: '80px',
                                    backgroundColor: colors.tan,
                                    borderRadius: '6px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    overflow: 'hidden',
                                }}>
                                    <img
                                        src={`https://philosophersapi.com/Images/LibriVox/${book.id}.jpg`}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                        }}
                                        onError={(e) => {
                                            const target = e.target as HTMLImageElement;
                                            target.style.display = 'none';
                                            target.parentElement!.innerHTML = `<div style="color: ${colors.blue}"><font-awesome-icon icon="headphones" size="lg" /></div>`;
                                        }}
                                    />
                                </div>
                                <div style={{ flex: 1 }}>
                                    <h3 style={{
                                        fontSize: '16px',
                                        fontWeight: 600,
                                        color: colors.black,
                                        textDecoration: 'none',
                                        margin: 0,
                                    }}>{book.title}</h3>
                                    <p style={{
                                        fontSize: '14px',
                                        color: '#6b7280',
                                        textDecoration: 'none',
                                        margin: '4px 0',
                                    }}>{book.totalTime}</p>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Audiobooks;