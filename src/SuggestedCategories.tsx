import React from 'react';
import { gql, useQuery } from '@apollo/client';
import colors from './color';
import CategoryItem from './CategoryItem';
import { AllCategoriesQuery } from './gql/graphql';
import LoadingBounce from './LoadingBounce';

const ALL_CATEGORIES = gql`
  query AllCategories {
    allCategories {
      id
      name
      description
      images {
        banner800x600
      }
    }
  }
`;

type Category = AllCategoriesQuery['allCategories'][number];

const SuggestedCategories: React.FC = () => {
  const { loading, error, data } = useQuery(ALL_CATEGORIES);
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
        Explore Categories
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
        Explore Categories
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
            gap: '16px',
            paddingBottom: '12px',
            WebkitOverflowScrolling: 'touch',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            position: 'relative',
            paddingLeft: '4px',
            paddingRight: '4px',
          }}
        >
          {data?.allCategories.map((category: Category) => (
            <div 
              key={category.id}
              style={{
                minWidth: '250px',
                maxWidth: '300px'
              }}
            >
              <CategoryItem 
                category={category}
                imageWidth="250px"
                imageHeight="175px"
                hideDescription = {true}
              />
            </div>
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

export default SuggestedCategories;