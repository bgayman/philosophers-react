import React from 'react';
import { gql, useQuery } from '@apollo/client';
import QuoteHeader from './QuoteHeader';
import colors from './color';
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

const YouMightLike: React.FC = () => {
  const { loading, error, data } = useQuery(RANDOM_PHILOSOPHERS, {
    variables: { count: 3 }
  });

  return (
    <div style={{
      borderRadius: '8px',
      borderColor: '#ddd',
      borderWidth: '0.5px',
      borderStyle: 'solid',
      padding: '10px',
      margin: '10px 5px',
    }}>
      <div style={{
        color: colors.black,
        opacity: 0.8,
        fontWeight: 800,
        fontSize: '1.5em',
        padding: '5px 0px 15px 0px',
      }}>
        You might like
      </div>
      
      {loading && (
        <LoadingBounce />
      )}
      
      {error && (
        <div style={{ 
          padding: '10px', 
          color: colors.darkRed, 
          fontSize: '0.9em',
          textAlign: 'center' 
        }}>
          Error loading suggestions
        </div>
      )}

      {data?.randomPhilosophers.map((philosopher: RandomPhilosopher) => (
        <div key={philosopher.id} style={{ marginBottom: '20px' }}>
          <QuoteHeader 
            philosopher={philosopher}
            showMoreButton={false}
            imageWidth="40px"
            imageHeight="40px"
          />
        </div>
      ))}
    </div>
  );
};

export default YouMightLike;