import React from 'react';
import { Hashtag } from './Hashtag';
import colors from './color';
import { useNavigate } from 'react-router-dom';

const SuggestedSearch: React.FC = () => {
  const navigate = useNavigate();
  const suggestions = React.useMemo(() => Hashtag.getRandomHashtags(15), []);
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

  const handleClick = (tag: string) => {
    navigate(`/search/${tag}`);
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '12px',
      width: '100%'
    }}>
      <div style={{
        fontWeight: 700,
        fontSize: '1.2em',
        color: colors.black,
        opacity: 0.8,
      }}>
        Try searching for
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
          bottom: 0,
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
          bottom: 0,
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
            gap: '8px',
            paddingBottom: '12px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'relative',
          }}
        >
          {suggestions.map((hashtag) => (
            <button
              key={hashtag.id}
              onClick={() => handleClick(hashtag.tag)}
              style={{
                padding: '8px 16px',
                borderRadius: '20px',
                border: `1px solid ${colors.blue}`,
                backgroundColor: 'transparent',
                color: colors.blue,
                fontSize: '0.9em',
                fontWeight: 600,
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors.blue;
                e.currentTarget.style.color = colors.white;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = colors.blue;
              }}
            >
              {hashtag.tag}
            </button>
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

export default SuggestedSearch;