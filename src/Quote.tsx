import React, {useEffect} from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, useNavigate } from 'react-router-dom';
import QuoteRow, { RandomQuote } from './QuoteRow';
import { QuoteQuery, QuoteQueryVariables } from './gql/graphql';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import IconButton from './IconButton';
import colors from './color';
import Spacer from './Spacer';
import LoadingBounce from './LoadingBounce';

const QUOTE_QUERY = gql`
  query Quote($idString: String!) {
    quote(idString: $idString) {
      id
      quote
      work
      year
      philosopher {
        id
        name
        username
        birthDate
        deathDate
        images {
          thumbnailIllustrations {
            thumbnailIll150x150
          }
        }
      }
      relatedQuotes {
        id
        quote
        work
        year
        philosopher {
          id
          name
          username
          birthDate
          deathDate
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

interface QuoteWithDates {
    id: string;
    quote: string;
    work?: string | null;
    year?: string | null;
    philosopher: {
        id?: string | null;
        name: string;
        username: string;
        birthDate?: string | null;
        deathDate?: string | null;
        images?: {
            thumbnailIllustrations?: {
                thumbnailIll150x150: string;
            } | null;
        } | null;
    };
}

const getQuoteSortValue = (quote: QuoteWithDates): number => {
    // If year is available, convert it to number (removing "BC" or "AD")
    if (quote.year) {
        const yearNum = parseInt(quote.year.replace(/[^-\d]/g, ''));
        return yearNum || Infinity;
    }

    // If philosopher's death date is available
    if (quote.philosopher.deathDate) {
        const deathYear = parseInt(quote.philosopher.deathDate.replace(/[^-\d]/g, ''));
        return deathYear || Infinity;
    }

    // If philosopher's birth date is available
    if (quote.philosopher.birthDate) {
        const birthYear = parseInt(quote.philosopher.birthDate.replace(/[^-\d]/g, ''));
        return birthYear || Infinity;
    }

    // If no dates are available, return -Infinity to sort to the beginning
    return -Infinity;
};

const Quote: React.FC = () => {
    const { quoteId } = useParams<{ quoteId: string }>();
    const { loading, error, data } = useQuery<QuoteQuery, QuoteQueryVariables>(
        QUOTE_QUERY,
        { variables: { idString: quoteId ?? '' } }
    );
    const navigate = useNavigate();
    const handleBack = () => {
        navigate(-1);
    };

    const handleShare = () => {
        // Share functionality
    };

    if (error) return null;
    if (!data?.quote) return null;

    // Combine main quote and related quotes into one array for sorting
    const allQuotes = [data.quote, ...data.quote.relatedQuotes ?? []]
        .filter(Boolean)
        .sort((a, b) => getQuoteSortValue(a as QuoteWithDates) - getQuoteSortValue(b as QuoteWithDates));

    // Find the index of the main quote in the sorted array
    const mainQuoteIndex = allQuotes.findIndex(q => q.id === data.quote?.id);

    return (
        <div>
            {/* Navigation Bar */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: `${colors.white}aa`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 10,
                height: '62px',
                width: '100%',
                borderBottomColor: colors.tan,
                borderBottomWidth: '4px',
                borderBottomStyle: 'solid',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px'
            }}>
                <IconButton onClick={handleBack} accessibilityLabel='Go back'>
                    <FontAwesomeIcon icon={faArrowLeft} size="lg" />
                </IconButton>
                <div style={{
                    fontWeight: 700,
                    fontSize: '1.4em',
                    color: colors.black,
                }}>
                    {loading ? 'Loading...' : 'Related Quotes'}
                </div>
                <Spacer />
                <IconButton onClick={handleShare} accessibilityLabel='Share'>
                    <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
                </IconButton>
            </div>
            {loading && <LoadingBounce />}
            <div style={{
                maxWidth: '600px',
                margin: '0 auto',
                padding: '20px',
            }}>
                {allQuotes.map((quote, index) => (
                    <React.Fragment key={quote.id}>
                        <QuoteRow
                            quote={quote as RandomQuote}
                            key={quote.id}
                            showLeadingMargin={quote.id !== quoteId}
                            showConnector={quote.id !== quoteId && index !== allQuotes.length - 1}
                        />
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

export default Quote;