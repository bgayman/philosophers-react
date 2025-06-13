import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { NavLink } from 'react-router-dom';
import { SearchKeyIdeasQuery, SearchKeyIdeasQueryVariables } from './gql/graphql';
import QuoteImage from './QuoteImage';
import colors from './color';
import LoadingBounce from './LoadingBounce';
import Divider from './Divider';

export const SEARCH_KEY_IDEAS = gql`
  query SearchKeyIdeas($search: String!) {
    searchKeyIdeas(search: $search) {
      text
      id
      philosopher {
        id
        name
        username
        life
        images {
          thumbnailIllustrations {
            thumbnailIll150x150
          }
        }
      }
    }
  }
`;

const highlightText = (text: string, highlight?: string) => {
    if (!highlight || highlight.trim() === '') {
        return <span>{text}</span>;
    }

    // Escape special characters in the search term
    const escapedHighlight = highlight.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    // Create regex with case-insensitive flag
    const regex = new RegExp(`(${escapedHighlight})`, 'gi');

    // Split text into parts
    const parts = text.split(regex);

    return (
        <span>
            {parts.map((part, i) => (
                regex.test(part) ? (
                    <span key={i} style={{
                        fontWeight: 'bold',
                        color: `${colors.darkBlue}`
                    }}>
                        {part}
                    </span>
                ) : (
                    <span key={i}>{part}</span>
                )
            ))}
        </span>
    );
};

interface KeyIdeaListProps {
    searchTerm?: string;
}

const KeyIdeaList: React.FC<KeyIdeaListProps> = ({ searchTerm }) => {
    const [searchKeyIdeas, { loading, error, data }] = useLazyQuery<
        SearchKeyIdeasQuery,
        SearchKeyIdeasQueryVariables
    >(SEARCH_KEY_IDEAS);

    React.useEffect(() => {
        if (searchTerm) {
            const trimmedTerm = searchTerm.trim();
            if (trimmedTerm) {
                searchKeyIdeas({
                    variables: { search: trimmedTerm }
                }).catch(err => {
                    console.error('Error searching key ideas:', err);
                });
            }
        }
    }, [searchTerm, searchKeyIdeas]);

    if (loading) return <LoadingBounce />;
    if (error) return (
        <div style={{
            padding: '20px',
            textAlign: 'center',
            color: 'red'
        }}>
            Error: {error.message}
        </div>
    );

    if (!data?.searchKeyIdeas || data.searchKeyIdeas.length === 0) {
        return (
            <div style={{
                padding: '20px',
                textAlign: 'center',
                color: '#666'
            }}>
                No key ideas found matching "{searchTerm}"
            </div>
        );
    }

    // Group key ideas by philosopher
    const keyIdeasByPhilosopher = data.searchKeyIdeas.reduce((acc, keyIdea) => {
        const philosopherId = keyIdea.philosopher.id;
        if (!acc[philosopherId ?? '']) {
            acc[philosopherId ?? ''] = {
                philosopher: keyIdea.philosopher,
                keyIdeas: []
            };
        }
        acc[philosopherId ?? ''].keyIdeas.push(keyIdea);
        return acc;
    }, {} as Record<string, { philosopher: typeof data.searchKeyIdeas[0]['philosopher'], keyIdeas: typeof data.searchKeyIdeas }>);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '24px',
            padding: '20px'
        }}>
            {Object.values(keyIdeasByPhilosopher).map(({ philosopher, keyIdeas }) => (
                <div key={philosopher.id} style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '12px'
                }}>
                    <NavLink
                        to={`/profile/${philosopher.username}`}
                        style={{
                            textDecoration: 'none',
                            color: colors.black
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '6px',
                        }}>
                            <QuoteImage
                                philosopher={philosopher}
                                width="48px"
                                height="48px"
                            />
                            <div style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '4px'
                            }}>
                                <div style={{
                                    fontSize: '1.2em',
                                    fontWeight: 800
                                }}>
                                    {philosopher.name}
                                </div>
                                <div style={{
                                    fontSize: '0.8em',
                                    fontWeight: 700,
                                    opacity: 0.9,
                                }}>
                                    {philosopher.life}
                                </div>
                            </div>
                        </div>
                    </NavLink>

                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '4px',
                    }}>
                        {keyIdeas.map(keyIdea => (
                            <NavLink
                                key={keyIdea.id}
                                to={`/keyIdea/${keyIdea.id}`}
                                style={{
                                    textDecoration: 'none',
                                    color: colors.black,
                                    fontSize: '1em',
                                    lineHeight: '1.5',
                                    padding: '8px',
                                    borderRadius: '8px',
                                }}
                                onMouseEnter={e => e.currentTarget.style.backgroundColor = `${colors.black}10`}
                                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
                            >
                                {highlightText(keyIdea.text, searchTerm)}
                            </NavLink>
                        ))}
                    </div>

                    <Divider />
                </div>
            ))}
        </div>
    );
};

export default KeyIdeaList;