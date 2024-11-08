import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { useParams, useNavigate, Routes, Route, NavLink } from 'react-router-dom';
import QuoteRow from './QuoteRow';
import { PhilosopherByUsernameQuery, PhilosopherByUsernameQueryVariables, GetQuotesQuery } from './gql/graphql';
import colors from './color';
import { getColorForUUID } from './colorForUUID';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faMapPin, faArrowUpFromBracket, faFileLines, faBook, faHeadphones } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import Spacer from './Spacer';
import { MenuButton } from './MenuButton';
import { MenuItem } from './MenuItem';
import { useLocation } from 'react-router-dom';
import Modal from './Modal';
import LoadingBounce from './LoadingBounce';
import { User } from './User';
import OwlImage from './OwlImage';
import QuoteImage from './QuoteImage';
import { QuoteWithDates } from './Quote';

type RandomQuote = GetQuotesQuery['randomQuotes'][number];

export const WikipediaIcon = () => (
    <img src="/icWiki.png" width="15px" height="15px" />
);

export const SEPIcon = () => (
    <img src="/icSep.png" width="15px" height="15px" />
);

export const IEPIcon = () => (
    <img src="/icIEP.png" width="15px" height="15px" />
);

export const PROFILE_DETAILS = gql`
  query PhilosopherByUsername($name: String!) {
    philosopherByUsername(name: $name) {
      id
      name
      username
      life
      arObjects {
        id
      }
      birthLocation {
        name
        latitude
        longitude
      }
      hasEBooks
      iepLink
      images {
        illustrations {
          ill500x500
        }
        fullImages {
          full1200x1600
        }
      }
      interests
      libriVoxGetRequestLinks
      quotes {
        id
        quote
        year
        work
      }
      school 
      speLink
      wikiTitle
      works {
        title
        link
      }
    }
  }
`;

const Profile: React.FC = () => {
    const { username } = useParams<{ username: string }>();
    const [philosopherDetails, { loading, error, data }] = useLazyQuery<PhilosopherByUsernameQuery, PhilosopherByUsernameQueryVariables>(
        PROFILE_DETAILS
    );
    const navigate = useNavigate();
    const location = useLocation();
    const state = location.state as { backgroundLocation?: Location };

    // Determine if this is the current user's profile
    const isCurrentUser = !username || username === User.current.username;

    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = () => {
        // Share functionality
    }

    const handleFullImageClick = () => {
        if (isCurrentUser) return; // Disable click for current user
        navigate(`/profile/${username}/full-image`, {
            state: { backgroundLocation: location }
        });
    };

    const handleIllustrationClick = () => {
        if (isCurrentUser) return; // Disable click for current user
        navigate(`/profile/${username}/illustration`, {
            state: { backgroundLocation: location }
        });
    };

    const openWikipedia = () => {
        const url = `https://wikipedia.org/wiki/${data?.philosopherByUsername.wikiTitle ?? ''}`
        window.open(url, '_blank', 'noopener,noreferrer');
    }

    const openSEP = () => {
        window.open(data?.philosopherByUsername.speLink ?? '', '_blank', 'noopener,noreferrer');
    }

    const openIEP = () => {
        window.open(data?.philosopherByUsername.iepLink ?? '', '_blank', 'noopener,noreferrer');
    }

    React.useEffect(() => {
        if (username && !isCurrentUser) {
            philosopherDetails({
                variables: {
                    name: username
                }
            }).then(result => {
                console.log('Profile result:', result);
            }).catch(err => {
                console.error('Profile error:', err);
            });
        }
    }, [username, isCurrentUser]);

    React.useEffect(() => {
        const originalTitle = document.title;

        if (isCurrentUser) {
            document.title = `${User.current.name} - Philosophers`;
        } else if (data?.philosopherByUsername) {
            document.title = `${data.philosopherByUsername.name} - Philosophers`;
        }

        return () => {
            document.title = originalTitle;
        };
    }, [data, isCurrentUser]);

    // For current user's profile
    const renderCurrentUserProfile = () => {
        const userQuotes: QuoteWithDates[] = []; // TODO: Load quotes from local storage

        return (
            <div>
                <div style={{
                    height: '250px',
                    width: '100%',
                    overflow: 'hidden',
                }}>
                    <img
                        src="/banner.png"
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                        }}
                        alt="Profile banner"
                    />
                </div>
                <div style={{
                    width: '100%',
                    height: '275px',
                    backgroundColor: `${colors.black}10`,
                    borderBottomColor: colors.tan,
                    borderBottomWidth: '4px',
                    borderBottomStyle: 'solid',
                }}>
                    <div style={{
                        position: 'relative',
                        top: '-70px',
                        left: '12px',
                    }}>
                        <OwlImage width="140px" height="140px" />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '12px',
                        position: 'relative',
                        top: '-150px',
                    }}>
                        <div style={{ height: '70px' }} />
                        <div style={{
                            fontWeight: 1000,
                            fontSize: '2.0em',
                            color: colors.blue,
                        }}>
                            {User.current.name}
                        </div>
                        <div style={{
                            fontWeight: 500,
                            fontSize: '1.2em',
                            color: colors.black,
                            opacity: 0.8,
                        }}>
                            <b>{User.current.username}</b>
                        </div>
                    </div>
                </div>

                {userQuotes.length > 0 ? (
                    userQuotes.map((quote) => (
                        <QuoteRow
                            key={quote.id}
                            quote={quote as RandomQuote}
                        />
                    ))
                ) : (
                    <div style={{
                        textAlign: 'center',
                        padding: '40px 20px',
                        color: colors.black,
                        opacity: 0.6,
                    }}>
                        No quotes yet
                    </div>
                )}
            </div>
        );
    };

    const renderPhilosopherProfile = () => {
        if (!data?.philosopherByUsername) return null;

        return (
            <div>
                <div style={{
                    height: '250px',
                    width: '100%',
                    overflow: 'hidden',
                    cursor: 'pointer',
                }} onClick={handleFullImageClick}>
                    <img
                        src={`https://philosophersapi.com${data.philosopherByUsername.images.fullImages.full1200x1600}`}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            objectPosition: 'center center',
                        }}
                        alt={`${data.philosopherByUsername.name} full portrait`}
                    />
                </div>
                <div style={{
                    width: '100%',
                    height: '275px',
                    backgroundColor: `${colors.black}10`,
                    borderBottomColor: colors.tan,
                    borderBottomWidth: '4px',
                    borderBottomStyle: 'solid',
                }}>
                    <div
                        style={{
                            borderRadius: '50%',
                            overflow: 'hidden',
                            position: 'relative',
                            backgroundColor: getColorForUUID(data.philosopherByUsername.id ?? ""),
                            width: '140px',
                            height: '140px',
                            top: '-70px',
                            left: '12px',
                            borderColor: colors.white,
                            borderWidth: '4px',
                            borderStyle: 'solid',
                            cursor: 'pointer',
                        }}
                        onClick={handleIllustrationClick}
                    >
                        <QuoteImage
                            philosopher={{
                                id: data.philosopherByUsername.id,
                                name: data.philosopherByUsername.name,
                                username: data.philosopherByUsername.username,
                                images: {
                                    thumbnailIllustrations: {
                                        thumbnailIll150x150: data.philosopherByUsername.images.illustrations.ill500x500
                                    }
                                }
                            }}
                            width="140px"
                            height="140px"
                        />
                    </div>
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                        padding: '12px',
                        position: 'relative',
                        top: '-150px',
                    }}>
                        <div style={{
                            display: 'flex',
                            flexDirection: 'row',
                            height: '70px',
                            gap: '8px',
                        }}>
                            <Spacer />
                            {data.philosopherByUsername.libriVoxGetRequestLinks.length !== 0 &&
                                <NavLink to={`/profile/${data.philosopherByUsername.username}/audiobooks`}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        fontSize: '1.5em',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: colors.blue,
                                        borderRadius: '20px',
                                        border: `solid 1px ${colors.blue}`,
                                    }}>
                                        <FontAwesomeIcon icon={faHeadphones} />
                                    </div>
                                </NavLink>}
                            {data.philosopherByUsername.hasEBooks &&
                                <NavLink to={`/profile/${data.philosopherByUsername.username}/ebooks`}>
                                    <div style={{
                                        width: '40px',
                                        height: '40px',
                                        fontSize: '1.5em',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: colors.blue,
                                        borderRadius: '20px',
                                        border: `solid 1px ${colors.blue}`,
                                    }}>
                                        <FontAwesomeIcon icon={faBook} />
                                    </div>
                                </NavLink>}
                            <MenuButton icon={faFileLines} label='Articles' width='40px' height='40px' borderRadius='20px' border={`solid 1px ${colors.blue}`}>
                                <MenuItem onClick={openWikipedia}>
                                    <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                        <WikipediaIcon />
                                        Wikipedia
                                    </span>
                                </MenuItem>
                                {data.philosopherByUsername.speLink &&
                                    <MenuItem onClick={openSEP}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <SEPIcon />
                                            Stanford Encyclopedia of Philosophy
                                        </span>
                                    </MenuItem>
                                }
                                {data.philosopherByUsername.iepLink &&
                                    <MenuItem onClick={openIEP}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                                            <IEPIcon />
                                            Internet Encyclopedia of Philosophy
                                        </span>
                                    </MenuItem>
                                }
                            </MenuButton>
                        </div>
                        <div style={{
                            fontWeight: 1000,
                            fontSize: '2.0em',
                            color: colors.blue,
                        }}>
                            {data.philosopherByUsername.name}
                        </div>
                        <div style={{
                            fontWeight: 500,
                            fontSize: '1.2em',
                            color: colors.black,
                            opacity: 0.8,
                        }}>
                            <b>{data.philosopherByUsername.username}</b> {data.philosopherByUsername.life}
                        </div>
                        {data.philosopherByUsername.birthLocation && <div style={{
                            color: colors.blue,
                            fontWeight: 800,
                            fontSize: '1.1em',
                        }}>
                            <FontAwesomeIcon icon={faMapPin} size='lg' />
                            &nbsp;
                            {data.philosopherByUsername.birthLocation.name}
                        </div>}
                        {data.philosopherByUsername.works.length > 0 && <div style={{
                            color: '#666',
                            fontSize: '1.0em',
                            fontWeight: 600,
                        }}>
                            Major Works:&nbsp;
                            {data.philosopherByUsername.works.map((work, index, array) => (
                                <React.Fragment key={work.title}>
                                    <a
                                        href={work.link ?? '#'}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        style={{
                                            color: colors.blue,
                                            textDecoration: 'none'
                                        }}
                                        onMouseEnter={(e) => {
                                            e.currentTarget.style.textDecoration = 'underline';
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.textDecoration = 'none';
                                        }}
                                    >
                                        {work.title}
                                    </a>
                                    {index < array.length - 1 && ', '}
                                </React.Fragment>
                            ))}
                        </div>}
                    </div>
                </div>

                {data.philosopherByUsername.quotes.map((quote) => (
                    <QuoteRow
                        key={quote.id}
                        quote={{
                            ...quote,
                            philosopher: {
                                id: data.philosopherByUsername.id,
                                name: data.philosopherByUsername.name,
                                username: data.philosopherByUsername.username,
                                images: {
                                    thumbnailIllustrations: {
                                        thumbnailIll150x150: data.philosopherByUsername.images.illustrations.ill500x500,
                                    }
                                },
                            }
                        } as RandomQuote}
                    />
                ))}
            </div>
        );
    };

    // Main render
    return (
        <div>
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
                        {isCurrentUser ? User.current.name : data?.philosopherByUsername.name ?? ''}
                    </div>
                    {!isCurrentUser && data && <div style={{
                        fontWeight: 500,
                        fontSize: '0.8em',
                        color: colors.black,
                        opacity: 0.9,
                    }}>
                        {`${data?.philosopherByUsername.quotes.length ?? 0} quotes`}
                    </div>}
                </div>
                <Spacer />
                <IconButton onClick={handleShare} accessibilityLabel='Share'>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>

            {loading && <LoadingBounce />}

            {error && (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: colors.darkRed,
                }}>
                    Error: {error.message}
                </div>
            )}

            {isCurrentUser ? (
                renderCurrentUserProfile()
            ) : (
                renderPhilosopherProfile()
            )}

            {/* Modal Routes */}
            {!isCurrentUser && state?.backgroundLocation && data && (
                <Routes>
                    {/* Full Image Modal */}
                    <Route
                        path="/full-image"
                        element={
                            <Modal backgroundColor='#ffffff00' shadowOpacity={0}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: '80vh',
                                }}>
                                    <img
                                        src={`https://philosophersapi.com${data.philosopherByUsername.images.fullImages.full1200x1600}`}
                                        style={{
                                            maxWidth: '90%',
                                            maxHeight: '90%',
                                            objectFit: 'contain',
                                            borderRadius: '20px',
                                        }}
                                        alt={`${data.philosopherByUsername.name} full portrait`}
                                    />
                                </div>
                            </Modal>
                        }
                    />

                    {/* Illustration Modal */}
                    <Route
                        path="/illustration"
                        element={
                            <Modal backgroundColor='#ffffff00' shadowOpacity={0}>
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    width: '100%',
                                    height: '100%',
                                    maxHeight: '80vh',
                                    backgroundColor: getColorForUUID(data.philosopherByUsername.id ?? ""),
                                    borderRadius: '50%',
                                    overflow: 'hidden',
                                }}>
                                    <img
                                        src={`https://philosophersapi.com${data.philosopherByUsername.images.illustrations.ill500x500}`}
                                        style={{
                                            maxWidth: '100%',
                                            maxHeight: '100%',
                                            objectFit: 'contain',
                                        }}
                                        alt={`${data.philosopherByUsername.name} illustration`}
                                    />
                                </div>
                            </Modal>
                        }
                    />
                </Routes>
            )}
        </div>
    );
};

export default Profile;