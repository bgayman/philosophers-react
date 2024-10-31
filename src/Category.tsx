import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import colors from './color';
import IconButton from './IconButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket, faFileLines } from '@fortawesome/free-solid-svg-icons';
import Spacer from './Spacer';
import { MenuButton } from './MenuButton';
import { MenuItem } from './MenuItem';
import QuoteImage from './QuoteImage';
import TintedImage from './TintedImage';
import { getColorPairsForUUID } from './colorForUUID';
import { NavLink } from 'react-router-dom';
import { CategoryQuery, CategoryQueryVariables } from './gql/graphql';
import { IEPIcon, SEPIcon, WikipediaIcon } from './Profile';
import LoadingBounce from './LoadingBounce';

const CATEGORY_QUERY = gql`
  query Category($idString: String!) {
    category(idString: $idString) {
      id
      name
      description
      speLink
      wikiTitle
      iepLink
      images {
        banner800x600
        banner1200x900
      }
      associatedPhilosophers {
        id
        name
        username
        images {
          illustrations {
            ill500x500
          }
        }
      }
    }
  }
`;

const Category: React.FC = () => {
    const { categoryId } = useParams<{ categoryId: string }>();
    const { loading, error, data } = useQuery<CategoryQuery, CategoryQueryVariables>(CATEGORY_QUERY, {
        variables: { idString: categoryId ?? '' }
    });
    const navigate = useNavigate();
    const colorPair = data?.category ? getColorPairsForUUID(data.category.id ?? '') : ['#fff', '#fff'];

    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = () => {
        // Share functionality
    };

    const openWikipedia = () => {
        if (data?.category?.wikiTitle) {
            window.open(`https://wikipedia.org/wiki/${data.category.wikiTitle}`, '_blank', 'noopener,noreferrer');
        }
    };

    const openSEP = () => {
        if (data?.category?.speLink) {
            window.open(data.category.speLink, '_blank', 'noopener,noreferrer');
        }
    };

    const openIEP = () => {
        if (data?.category?.iepLink) {
            window.open(data.category.iepLink, '_blank', 'noopener,noreferrer');
        }
    };

    if (error) return null;

    return (
        <div>
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
                gap: '8px'
            }}>
                <IconButton onClick={handleBack} accessibilityLabel='Go back'>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </IconButton>
                <div style={{
                    fontWeight: 700,
                    fontSize: '1.4em',
                    color: colors.black,
                }}>
                    {loading ? 'Loading...' : data?.category?.name}
                </div>
                <Spacer />
                <IconButton onClick={handleShare} accessibilityLabel='Share'>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>

            {/* Content */}
            {loading ? (
                <LoadingBounce />
                // <div style={{ padding: '20px', textAlign: 'center' }}>Loading category...</div>
            ) : data?.category && (
                <div>
                    {/* Banner Image */}
                    <div style={{
                        height: '300px',
                        width: '100%',
                        backgroundColor: colorPair[0],
                        overflow: 'hidden',
                    }}>
                        <TintedImage
                            src={`https://philosophersapi.com${data.category.images.banner1200x900}`}
                            tintColor={colorPair[1]}
                            width="100%"
                            height="300px"
                            fit="cover"
                            position="center"
                        />
                    </div>

                    {/* Category Info */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '12px',
                    }}>
                        <div style={{
                            padding: '20px',
                            borderBottomColor: colors.tan,
                            borderBottomWidth: '4px',
                            borderBottomStyle: 'solid',
                            backgroundColor: `${colors.black}10`,
                            minHeight: '130px',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                        }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                                <div style={{
                                    fontSize: '2em',
                                    fontWeight: 1000,
                                    color: colors.blue,
                                }}>
                                    {data.category.name}
                                </div>
                                <Spacer />
                                <div style={{
                                    fontSize: '1em',
                                    fontWeight: 500,
                                    color: colors.blue,
                                }}>
                                    {data?.category && (
                                        <MenuButton icon={faFileLines} label='Articles' width='40px' height='40px' borderRadius='20px' border={`solid 1px ${colors.blue}`}>
                                            {data.category.wikiTitle && (
                                                <MenuItem onClick={openWikipedia}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                        <WikipediaIcon />
                                                        Wikipedia
                                                    </span>
                                                </MenuItem>
                                            )}
                                            {data.category.speLink && (
                                                <MenuItem onClick={openSEP}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                        <SEPIcon />
                                                        Stanford Encyclopedia of Philosophy
                                                    </span>

                                                </MenuItem>
                                            )}
                                            {data.category.iepLink && (
                                                <MenuItem onClick={openIEP}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                                                        <IEPIcon />
                                                        Internet Encyclopedia of Philosophy
                                                    </span>
                                                </MenuItem>
                                            )}
                                        </MenuButton>
                                    )}
                                </div>
                            </div>

                            <div style={{
                                fontSize: '1.1em',
                                color: colors.black,
                                opacity: 0.8,
                                padding: '0px 0px 15px',
                            }}>
                                {data.category.description}
                            </div>
                        </div>

                        {/* Philosophers Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '20px',
                        }}>
                            {data.category.associatedPhilosophers.map((philosopher) => (
                                <NavLink
                                    key={philosopher.id}
                                    to={`/profile/${philosopher.username}`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'inherit',
                                    }}
                                >
                                    <div style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        gap: '2px',
                                        textAlign: 'center',
                                    }}>
                                        <QuoteImage
                                            philosopher={{
                                                ...philosopher,
                                                images: {
                                                    thumbnailIllustrations: {
                                                        thumbnailIll150x150: philosopher.images.illustrations.ill500x500
                                                    }
                                                }
                                            }}
                                            width="100px"
                                            height="100px"
                                        />
                                        <div style={{
                                            fontWeight: 800,
                                            fontSize: '1.2em',
                                            color: colors.black,
                                        }}>
                                            {philosopher.name}
                                        </div>
                                        <div style={{
                                            fontSize: '0.9em',
                                            opacity: 0.7,
                                            color: colors.black,
                                        }}>
                                            {philosopher.username}
                                        </div>
                                    </div>
                                </NavLink>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Category;