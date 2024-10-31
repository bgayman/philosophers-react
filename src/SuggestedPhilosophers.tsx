import React from 'react';
import { gql, useQuery } from '@apollo/client';
import colors from './color';
import QuoteHeader from './QuoteHeader';
import { RandomPhilosopherQuery } from './gql/graphql';
import LoadingBounce from './LoadingBounce';

const RANDOM_PHILOSOPHERS = gql`
  query RandomPhilosopher($count: Int!) {
    randomPhilosophers(count: $count) {
      id
      name
      username
      images {
        thumbnailIllustrations {
          thumbnailIll150x150
        }
      }
    }
  }
`;

type RandomPhilosopher = RandomPhilosopherQuery['randomPhilosophers'][number];

const SuggestedPhilosophers: React.FC = () => {
  const { loading, error, data } = useQuery(RANDOM_PHILOSOPHERS, {
    variables: { count: 12 }
  });
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const [showLeftGradient, setShowLeftGradient] = React.useState(false);
  const [showRightGradient, setShowRightGradient] = React.useState(true);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const element = e.currentTarget;
    const isAtStart = element.scrollLeft <= 0;
    const isAtEnd = element.scrollLeft >= element.scrollWidth - element.clientWidth - 1;
    
    setShowLeftGradient(!isAtStart);
    setShowRightGradient(!isAtEnd);
  };

  if (error) return null;
  if (loading) return (
    <div style={{ padding: '20px 0' }}>
      <div style={{
        fontWeight: 700,
        fontSize: '1.2em',
        color: colors.black,
        opacity: 0.8,
        marginBottom: '12px'
      }}>
        Suggested Philosophers
      </div>
      <LoadingBounce />
    </div>
  );

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '100%',
      padding: '20px 0'
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: '1.2em',
        color: colors.black,
        opacity: 0.8,
      }}>
        Suggested Philosophers
      </div>
      
      <div style={{
        position: 'relative',
        width: '100%',
      }}>
        {/* Left gradient mask */}
        <div style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: '12px', // Match bottom padding of scroll container
          width: '40px',
          background: `linear-gradient(to right, ${colors.white}, transparent)`,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: showLeftGradient ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }} />

        {/* Right gradient mask */}
        <div style={{
          position: 'absolute',
          right: 0,
          top: 0,
          bottom: '12px', // Match bottom padding of scroll container
          width: '40px',
          background: `linear-gradient(to left, ${colors.white}, transparent)`,
          zIndex: 1,
          pointerEvents: 'none',
          opacity: showRightGradient ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }} />

        {/* Scrollable container */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          style={{
            display: 'flex',
            overflowX: 'auto',
            paddingBottom: '12px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'relative',
            paddingLeft: '4px',
            paddingRight: '4px',
            alignItems: 'center',
          }}
        >
          {data?.randomPhilosophers.map((philosopher: RandomPhilosopher, index: number) => (
            <React.Fragment key={philosopher.id}>
              <div style={{
                padding: '0px 16px 0px 0px',
                minWidth: 'fit-content',
                flexShrink: 0,
              }}>
                <QuoteHeader 
                  philosopher={philosopher}
                  showMoreButton={false}
                  imageWidth="40px"
                  imageHeight="40px"
                />
              </div>
              {/* Add divider after each philosopher except the last one */}
              {index < data.randomPhilosophers.length - 1 && (
                <div style={{
                  backgroundColor: colors.black,
                  opacity: 0.1,
                  flexShrink: 0,
                  width: '0.5px',
                  height: '35px',
                  margin: '0px 16px 0px 0px',
                }} />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      <style>
        {`
          div::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

export default SuggestedPhilosophers;