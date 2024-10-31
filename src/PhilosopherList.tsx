import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { SearchPhilosopherQuery, SearchPhilosopherQueryVariables } from './gql/graphql';
import PhilosopherRow from './PhilosopherRow';
import LoadingBounce from './LoadingBounce';

// Define your GraphQL query using the `gql` tag
export const SEARCH_PHILOSOPHERS = gql`
  query SearchPhilosopher($search: String!) {
  searchPhilosophers(search: $search) {
    name
    username
    id
    life
    school
    interests
    images {
      thumbnailIllustrations {
        thumbnailIll150x150
      }
    }
    works{
      title
      link
    }
  }
}
`;

interface PhilosopherListProps {
  searchTerm?: string;
}

// PhilosopherList Component
const PhilosopherList: React.FC<PhilosopherListProps> = ({ searchTerm }) => {
  // Use the lazy query hook with correct types
  const [searchPhilosophers, { loading, error, data }] = useLazyQuery<SearchPhilosopherQuery, SearchPhilosopherQueryVariables>(
    SEARCH_PHILOSOPHERS
  );

  // Trigger search on searchTerm change
  React.useEffect(() => {
    if (searchTerm) {
      const trimmedTerm = searchTerm.trim();
      if (trimmedTerm) {
        searchPhilosophers({
          variables: { search: trimmedTerm }
        }).catch(err => {
          console.error('Error searching philosophers:', err);
        });
      }
    }
  }, [searchTerm, searchPhilosophers]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      {loading && <LoadingBounce />}
      
      {error && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: 'red' 
        }}>
          Error: {error.message}
        </div>
      )}

      {data?.searchPhilosophers.length === 0 && (
        <div style={{ 
          padding: '20px', 
          textAlign: 'center', 
          color: '#666' 
        }}>
          No philosophers found matching "{searchTerm}"
        </div>
      )}
      
      {data?.searchPhilosophers.map(philosopher => (
        <PhilosopherRow 
          key={philosopher.id} 
          philosopher={philosopher} 
        />
      ))}
    </div>
  );
};

export default PhilosopherList;