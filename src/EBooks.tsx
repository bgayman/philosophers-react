import React from 'react';
import { useQuery } from '@apollo/client';
import { gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket, faBook } from '@fortawesome/free-solid-svg-icons';
import { useParams, useNavigate } from 'react-router-dom';
import colors from './color';
import IconButton from './IconButton';
import { PhilosopherEBooksQuery } from './gql/graphql';
import Spacer from './Spacer';
import BooksCollection from './BooksCollection';
import { Book } from './BooksCollection';
import QuoteImage from './QuoteImage';
import { relative } from 'path';
import LoadingBounce from './LoadingBounce';

const PHILOSOPHER_EBOOKS_QUERY = gql`
  query PhilosopherEBooks($username: String!) {
    philosopherByUsername(name: $username) {
      id
      name
      username
      images {
        illustrations {
          ill750x750
        }
      }
      libriVoxIDs
      libriVoxGetRequestLinks
      ebooks {
        id
        title
        copyright
        bookshelves
        authors {
          name
          birthYear
          deathYear
        }
        languages
        mediaType
        subjects
        formats {
          epubZip
          html
          image
          mobi
          plainText
          plainTextISO
          plainTextUTF8
          rdf
          zip
        }
      }
    }
  }
`;

type PhilosopherEBook = PhilosopherEBooksQuery['philosopherByUsername']['ebooks'][number];

const EBooks = () => {
    const { username } = useParams();
    const navigate = useNavigate();

    const { loading, error, data } = useQuery(PHILOSOPHER_EBOOKS_QUERY, {
        variables: { username }
    });

    if (loading) return (
        <LoadingBounce />
    );

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
                    title: `${philosopher.name}'s EBooks`,
                    url: window.location.href
                });
            } catch (err) {
                console.error('Share failed:', err);
            }
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            backgroundColor: colors.white
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
                        {philosopher.ebooks.length === 1 ? `${philosopher.ebooks.length ?? 0} ebook` : `${philosopher.ebooks.length ?? 0} ebooks`}
                    </div>}
                </div>
                <Spacer />
                <IconButton onClick={handleShare}>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>

            {/* Header Section */}
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
                    <BooksCollection
                        books={philosopher.ebooks.map((book: PhilosopherEBook): Book => ({
                            id: `${book.id}`,
                            title: book.title,
                            image: book.formats.image  // Note: it's formats not format
                        }))}
                    />
                    <div>
                        <h2 style={{
                            fontSize: '20px',
                            fontWeight: 'bold',
                            color: '#111827',
                            margin: 0,
                        }}>{philosopher.name}</h2>
                        <a
                            href="https://www.gutenberg.org"
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                                color: colors.blue,
                                fontSize: '14px',
                                textDecoration: 'none',
                            }}
                        >
                            Project Gutenberg
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
                    {philosopher.ebooks.map((book: PhilosopherEBook) => (
                        <div
                            key={book.id}
                            style={{
                                display: 'flex',
                                gap: '8px',
                                padding: '8px',
                                borderRadius: '8px',
                            }}
                        >
                            <div style={{
                                width: '64px',
                                height: '80px',
                                backgroundColor: colors.tan,
                                borderRadius: '6px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                color: colors.blue
                            }}>
                                {book.formats.image ? (
                                    <img
                                        src={book.formats.image}
                                        alt={book.title}
                                        style={{
                                            width: '100%',
                                            height: '100%',
                                            objectFit: 'cover',
                                            borderRadius: '6px',
                                        }}
                                    />
                                ) : (
                                    <FontAwesomeIcon icon={faBook} />
                                )}
                            </div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    color: '#111827',
                                    margin: 0,
                                }}>{book.title}</h3>
                                <p style={{
                                    fontSize: '14px',
                                    color: '#6b7280',
                                    margin: '4px 0',
                                }}>{book.authors.map(author => author.name).join(', ')}</p>
                                <div style={{
                                    marginTop: '8px',
                                    display: 'flex',
                                    gap: '8px',
                                }}>
                                    {book.formats.plainTextUTF8 && (
                                        <a
                                            href={book.formats.plainTextUTF8}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                padding: '4px 8px',
                                                backgroundColor: colors.blue,
                                                color: colors.white,
                                                borderRadius: '5px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            TXT
                                        </a>
                                    )}
                                    {book.formats.epubZip && (
                                        <a
                                            href={book.formats.epubZip}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                padding: '4px 8px',
                                                backgroundColor: colors.blue,
                                                color: colors.white,
                                                borderRadius: '5px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            EPUB
                                        </a>
                                    )}
                                    {book.formats.mobi && (
                                        <a
                                            href={book.formats.mobi}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                padding: '4px 8px',
                                                backgroundColor: colors.blue,
                                                color: colors.white,
                                                borderRadius: '5px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            MOBI
                                        </a>
                                    )}
                                    {book.formats.html && (
                                        <a
                                            href={book.formats.html}
                                            style={{
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                padding: '4px 8px',
                                                backgroundColor: colors.blue,
                                                color: colors.white,
                                                borderRadius: '5px',
                                                textDecoration: 'none',
                                            }}
                                        >
                                            HTML
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <style>
                {`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}
            </style>
        </div >
    );
};

export default EBooks;