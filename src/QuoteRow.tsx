import React from 'react';
import { GetQuotesQuery } from './gql/graphql';
import QuoteHeader from './QuoteHeader';
import Divider from './Divider';
import QuoteFooter from './QuoteFooter';
import colors from './color';
import { NavLink } from 'react-router-dom';
import Spacer from './Spacer';

export type RandomQuote = GetQuotesQuery['randomQuotes'][number];

interface QuoteRowProps {
  quote: RandomQuote;
  searchTerm?: string;
  showLeadingMargin?: boolean;
  showConnector?: boolean;
}

const QuoteRow: React.FC<QuoteRowProps> = React.memo(({ quote, searchTerm, showLeadingMargin = false, showConnector = false }) => {
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(quote.quote)
    } catch (err) {
      console.error('Failed to copy text:', err);
    }
  }
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
    <div>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        margin: '10px',
      }}>
        <QuoteHeader philosopher={quote.philosopher} onCopy={handleCopy} />
        <div style={{
          display: 'flex',
          flexDirection: 'row'
        }}>
          {showLeadingMargin &&
        <div style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '4px',
        }}>
          <div style={{width: '24px'}} />
          <div style={{
            height: '100%',
            width: '4px',
            borderRadius: '2px',
            backgroundColor: colors.black,
            zIndex: -1,
            opacity: showConnector ? 1.0 : 0.0,
          }} />
          <div style={{width: '30px'}} />
        </div>}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
          }}>
            <NavLink to={`/quote/${quote.id ?? ""}`} style={{
              textDecoration: 'none',
              color: 'black',
            }}>
              <div style={{
                opacity: '0.8',
                marginBottom: '8px',
                lineHeight: '1.2', // Added for better readability
              }}>
                {highlightText(quote.quote, searchTerm)}
              </div>
            </NavLink>
            <QuoteFooter quote={quote} />
            <Divider />
          </div>
        </div>
      </div>
    </div>
  );
});

export default QuoteRow;