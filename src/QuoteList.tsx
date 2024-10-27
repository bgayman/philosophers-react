// QuoteList.tsx
import React from 'react';
import { gql, useLazyQuery } from '@apollo/client';
import { SearchQuotesQuery, SearchQuotesQueryVariables } from './gql/graphql';
import QuoteRow from './QuoteRow';

export const SEARCH_QUOTES = gql`
  query SearchQuotes($search: String!) {
    searchQuotes(search: $search) {
      id
      quote
      year
      work
      philosopher {
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
  }
`;

type RandomQuote = SearchQuotesQuery['searchQuotes'][number];

interface QuoteListProps {
    searchTerm?: string;
}

export const QuoteList: React.FC<QuoteListProps> = ({ searchTerm }) => {
    const [searchQuotes, { loading, error, data }] = useLazyQuery<SearchQuotesQuery, SearchQuotesQueryVariables>(
        SEARCH_QUOTES
    );

    React.useEffect(() => {
        if (searchTerm) {
            const trimmedTerm = searchTerm.trim();
            if (trimmedTerm) {
                searchQuotes({
                    variables: {
                        search: trimmedTerm
                    }
                }).then(result => {
                    console.log('Search result:', result);
                }).catch(err => {
                    console.error('Search error:', err);
                });
            }
        }
    }, [searchTerm, searchQuotes]);

    return (
        <div>
            {loading && <div style={{ 
                padding: '20px', 
                textAlign: 'center', 
                color: '#666' }}>
          Loading quotes...
        </div>}
            {error && <p>Error: {error.message}</p>}
            {data?.searchQuotes.length === 0 && (
                <div style={{
                    padding: '20px',
                    textAlign: 'center',
                    color: '#666'
                }}>
                    No quotes found matching "{searchTerm}"
                </div>
            )}
            {data && data.searchQuotes.map((quote: RandomQuote) => (
                <QuoteRow
                    key={quote.id}
                    quote={quote}
                    searchTerm={searchTerm} />
            ))}
        </div>
    );
};

export default QuoteList;