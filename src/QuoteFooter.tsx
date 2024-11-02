import React from 'react';
import { GetQuotesQuery } from './gql/graphql'; // Import the generated type
import Spacer from './Spacer';

// Define the type for a single RandomQuote using the generated type
type RandomQuote = GetQuotesQuery['randomQuotes'][number];

// Create a new component to display a RandomQuote
interface QuoteFooterProps {
    quote: RandomQuote;
}

const QuoteFooter: React.FC<QuoteFooterProps> = ({ quote }) => {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            gap: '8px',
            fontSize: '0.7em',
            fontWeight: 300,
            opacity: '0.6',
        }}>
            <div>
                {quote.year || "A long time ago"}
            </div>
            <Spacer />
            <div style={{
                textAlign: 'end',
            }}>
                {quote.work || ""}
            </div>
        </div>
    );
};

export default QuoteFooter;