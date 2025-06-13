import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import colors from './color';
import QuoteImage from './QuoteImage';
import LoadingBounce from './LoadingBounce';
import Divider from './Divider';
import { KeyIdeaQuery, KeyIdeaQueryVariables } from './gql/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import Spacer from './Spacer';

const KEY_IDEA_QUERY = gql`
  query KeyIdea($idString: String!) {
    keyIdea(idString: $idString) {
      id
      text
      philosopher {
        id
        name 
        username
        life
        birthYear
        deathYear
        images {
          thumbnailIllustrations {
            thumbnailIll150x150
          }
        }
      }
      agreeingKeyIdeas {
        id
        text
        philosopher {
          id
          name
          username
          life
          birthYear
          deathYear
          images {
            thumbnailIllustrations {
              thumbnailIll150x150
            }
          }
        }
      }
      disagreeingKeyIdeas {
        id
        text
        philosopher {
          id
          name
          username
          life
          birthYear
          deathYear
          images {
            thumbnailIllustrations {
              thumbnailIll150x150
            }
          }
        }
      }
    }
  }
`;

type KeyIdeaType = NonNullable<KeyIdeaQuery['keyIdea']>;
type PhilosopherType = KeyIdeaType['philosopher'];
type RelatedKeyIdeaType = NonNullable<NonNullable<KeyIdeaType['agreeingKeyIdeas']>[number]>;

interface IdeaWithType extends Omit<RelatedKeyIdeaType, '__typename'> {
    type: 'main' | 'agreeing' | 'disagreeing';
}

interface PhilosopherSection {
    philosopher: PhilosopherType;
    ideas: IdeaWithType[];
}

const compareYears = (year1: string | null | undefined, year2: string | null | undefined): number => {
    if (!year1) return 1;
    if (!year2) return -1;

    const num1 = parseInt(year1.replace(/[^-\d]/g, ''));
    const num2 = parseInt(year2.replace(/[^-\d]/g, ''));
    const isBC1 = year1.includes('BC');
    const isBC2 = year2.includes('BC');

    if (isBC1 && !isBC2) return -1;
    if (!isBC1 && isBC2) return 1;
    if (isBC1) return num2 - num1;
    return num1 - num2;
};

const sortPhilosophers = (ideas: RelatedKeyIdeaType[]) => {
    return [...ideas].sort((a, b) => {
        const yearA = a.philosopher.deathYear || a.philosopher.birthYear;
        const yearB = b.philosopher.deathYear || b.philosopher.birthYear;
        return compareYears(yearA, yearB);
    });
};

const KeyIdea = () => {
    const containerRef = React.useRef<HTMLDivElement>(null);
    const { keyIdeaId } = useParams();
    const { loading, error, data } = useQuery<KeyIdeaQuery, KeyIdeaQueryVariables>(
        KEY_IDEA_QUERY,
        {
            variables: { idString: keyIdeaId ?? '' }
        }
    );
    const svgRef = React.useRef<SVGSVGElement>(null);
    const [curves, setCurves] = React.useState<{ agreeing: string[], disagreeing: string[] }>({
        agreeing: [],
        disagreeing: []
    });

    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = () => {
        // Share functionality
    };

    React.useEffect(() => {
        if (!data?.keyIdea || !svgRef.current || !containerRef.current) return;

        const mainElement = document.getElementById(`idea-${data.keyIdea.id}`);
        if (!mainElement) return;

        const svgRect = svgRef.current.getBoundingClientRect();
        const containerRect = containerRef.current.getBoundingClientRect();
        const mainRect = mainElement.getBoundingClientRect();

        const agreeingPaths: string[] = [];
        const disagreeingPaths: string[] = [];

        // Handle agreeing ideas - arc from left of main text to left edge to left of related text
        (data.keyIdea.agreeingKeyIdeas || []).forEach(idea => {
            if (!idea) return;
            const element = document.getElementById(`idea-${idea.id}`);
            if (element) {
                const rect = element.getBoundingClientRect();

                // Start point: 4px left of main idea's text
                const startX = mainRect.left - svgRect.left - 4;
                const startY = mainRect.top - svgRect.top + mainRect.height / 2;

                // Middle point: left edge of container
                const midX = containerRect.left - svgRect.left;
                const midY = (startY + rect.top - svgRect.top + rect.height / 2) / 2;

                // End point: 4px left of related idea's text
                const endX = rect.left - svgRect.left - 4;
                const endY = rect.top - svgRect.top + rect.height / 2;

                // Create a path that goes through three points
                const path = `
              M ${startX} ${startY}
              Q ${midX} ${startY} ${midX} ${midY}
              Q ${midX} ${endY} ${endX} ${endY}
            `;

                agreeingPaths.push(path);
            }
        });

        // Handle disagreeing ideas - arc from right of main text to right edge to right of related text
        (data.keyIdea.disagreeingKeyIdeas || []).forEach(idea => {
            if (!idea) return;
            const element = document.getElementById(`idea-${idea.id}`);
            if (element) {
                const rect = element.getBoundingClientRect();

                // Start point: 4px right of main idea's text
                const startX = mainRect.right - svgRect.left + 4;
                const startY = mainRect.top - svgRect.top + mainRect.height / 2;

                // Middle point: right edge of container
                const midX = containerRect.right - svgRect.left;
                const midY = (startY + rect.top - svgRect.top + rect.height / 2) / 2;

                // End point: 4px right of related idea's text
                const endX = rect.right - svgRect.left + 4;
                const endY = rect.top - svgRect.top + rect.height / 2;

                // Create a path that goes through three points
                const path = `
              M ${startX} ${startY}
              Q ${midX} ${startY} ${midX} ${midY}
              Q ${midX} ${endY} ${endX} ${endY}
            `;

                disagreeingPaths.push(path);
            }
        });

        setCurves({
            agreeing: agreeingPaths,
            disagreeing: disagreeingPaths
        });
    }, [data]);

    if (loading) return <LoadingBounce />;
    if (error) return <div>Error: {error.message}</div>;
    if (!data?.keyIdea) return <div>Key idea not found</div>;

    const mainIdea = data.keyIdea;
    const sortedAgreeingIdeas = sortPhilosophers(mainIdea.agreeingKeyIdeas ?? []);
    const sortedDisagreeingIdeas = sortPhilosophers(mainIdea.disagreeingKeyIdeas ?? []);

    const allIdeas: IdeaWithType[] = [
        {
            id: mainIdea.id,
            text: mainIdea.text,
            philosopher: mainIdea.philosopher,
            type: 'main' as const // Use const assertion
        },
        ...sortedAgreeingIdeas.map(idea => ({
            id: idea.id,
            text: idea.text,
            philosopher: idea.philosopher,
            type: 'agreeing' as const
        })),
        ...sortedDisagreeingIdeas.map(idea => ({
            id: idea.id,
            text: idea.text,
            philosopher: idea.philosopher,
            type: 'disagreeing' as const
        }))
    ];

    const renderPhilosopherSection = (philosopher: PhilosopherType, ideas: IdeaWithType[]) => (
        <div className="philosopher-section" key={philosopher.id}>
            <div style={{
                height: '10px',
            }} />
            <NavLink
                to={`/profile/${philosopher.username}`}
                style={{
                    textDecoration: 'none',
                    color: 'inherit',
                    display: 'block',
                    margin: '8px 0px'
                }}
            >
                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                }}>
                    <QuoteImage
                        philosopher={philosopher}
                        width="48px"
                        height="48px"
                    />
                    <div>
                        <div style={{
                            fontSize: '18px',
                            fontWeight: 800,
                            opacity: 0.7,
                        }}>{philosopher.name}</div>
                        <div style={{
                            fontSize: '14px',
                            color: colors.black,
                            opacity: 0.7
                        }}>{philosopher.life}</div>
                    </div>
                </div>
            </NavLink>

            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
            }}>
                {ideas.map(idea => (
                    <NavLink
                        key={idea.id}
                        to={`/keyIdea/${idea.id}`}
                        id={`idea-${idea.id}`}
                        style={{
                            textDecoration: 'none',
                            color: colors.black,
                            padding: '12px',
                            borderRadius: '8px',
                        }}
                        onMouseEnter={e => {
                            if (idea.type !== 'main') {
                                e.currentTarget.style.backgroundColor = `${colors.black}10`;
                            }
                        }}
                        onMouseLeave={e => {
                            if (idea.type !== 'main') {
                                e.currentTarget.style.backgroundColor = 'transparent';
                            }
                        }}
                    >
                        {idea.text}
                    </NavLink>
                ))}
            </div>
            <div style={{
                height: '10px',
            }} />
            <Divider />
        </div>
    );

    // Group ideas by philosopher
    const ideasByPhilosopher = allIdeas.reduce<Record<string, PhilosopherSection>>((acc, idea) => {
        const philosopherId = idea.philosopher.id ?? '';
        if (!acc[philosopherId]) {
            acc[philosopherId] = {
                philosopher: idea.philosopher,
                ideas: []
            };
        }
        acc[philosopherId].ideas.push(idea);
        return acc;
    }, {});

    return (
        <div style={{
            width: '100%',
            maxWidth: '600px',
        }}>
            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: `${colors.white}aa`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 100,
                height: '60px',
                width: '100%',
                borderBottomColor: colors.tan,
                borderBottomWidth: '4px',
                borderBottomStyle: 'solid',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
                padding: '-20px',
            }}>
                <IconButton onClick={handleBack} accessibilityLabel='Go back'>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </IconButton>
                <div style={{
                    fontWeight: 700,
                    fontSize: '1.4em',
                    color: colors.black,
                }}>
                    {loading ? 'Loading...' : 'Key Idea'}
                </div>
                <Spacer />
                <IconButton onClick={handleShare} accessibilityLabel='Share'>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>
            <div ref={containerRef} style={{
                position: 'relative',
                margin: '0 auto',
                padding: '0px 20px',
                overflow: 'visible',
            }}>
                <svg
                    ref={svgRef}
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        pointerEvents: 'none',
                        zIndex: 10,
                        overflow: 'visible',
                    }}
                >
                    {curves.agreeing.map((path, i) => (
                        <path
                            key={`agreeing-${i}`}
                            d={path}
                            stroke={colors.green}
                            strokeWidth="2"
                            fill="none"
                            opacity={0.4}
                        />
                    ))}
                    {curves.disagreeing.map((path, i) => (
                        <path
                            key={`disagreeing-${i}`}
                            d={path}
                            stroke={colors.darkRed}
                            strokeWidth="2"
                            fill="none"
                            opacity={0.4}
                        />
                    ))}
                </svg>

                <div style={{
                    position: 'relative',
                    zIndex: 2,
                    padding: '20px',
                }}>
                    {Object.values(ideasByPhilosopher).map(({ philosopher, ideas }) =>
                        renderPhilosopherSection(philosopher, ideas)
                    )}
                </div>
            </div>
        </div>
    );
};

export default KeyIdea;