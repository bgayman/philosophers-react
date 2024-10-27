import React from 'react';
import { GetQuotesQuery } from './gql/graphql';
import QuoteHeader from './QuoteHeader';
import Divider from './Divider';
import QuoteFooter from './QuoteFooter';
import colors from './color';

type RandomQuote = GetQuotesQuery['randomQuotes'][number];

interface QuoteRowProps {
  quote: RandomQuote;
  searchTerm?: string;
}

const QuoteRow: React.FC<QuoteRowProps> = React.memo(({ quote, searchTerm }) => {
  // Function to highlight matched text
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
              color: `${colors.black}`
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

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      margin: '10px',
    }}>
      <QuoteHeader philosopher={quote.philosopher} />
      <div style={{
        opacity: '0.8',
        marginBottom: '8px',
        lineHeight: '1.2', // Added for better readability
      }}>
        {highlightText(quote.quote, searchTerm)}
      </div>
      <QuoteFooter quote={quote} />
      <Divider />
    </div>
  );
});

export default QuoteRow;