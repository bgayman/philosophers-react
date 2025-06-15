import React, { useState, useEffect } from 'react';
import { gql, useQuery } from '@apollo/client';
import { GetQuotesQuery } from './gql/graphql'; // Import the generated type
import QuoteRow from './QuoteRow';
import PostInput from './PostInput';
import { v4 as uuidv4 } from 'uuid';
import { User } from './User';
import Divider from './Divider';
import LoadingBounce from './LoadingBounce';

const GET_QUOTES = gql`
  query GetQuotes {
    randomQuotes(count: 15) {
      id
      quote
      work
      year
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

type RandomQuote = GetQuotesQuery['randomQuotes'][number];

const ForYou: React.FC = () => {
  const [quotes, setQuotes] = useState<GetQuotesQuery['randomQuotes']>([]);

  const handlePost = (text: string) => {
    const currentYear: string = new Date().getFullYear().toString();

    if (!User.current) {
      console.warn('No current user to post with.');
      return;
    }

    // Create a local instance of RandomQuote
    const mockRandomQuote: RandomQuote = {
      id: uuidv4(),
      quote: text,
      work: 'philosophers.com',
      year: `${currentYear} AD`,
      philosopher: {
        id: User.current.id,
        name: User.current.name,
        username: User.current.username,
        images: {
          thumbnailIllustrations: {
            thumbnailIll150x150: '',
          },
        },
      },
    };
    User.saveToLocalStorage();
    setQuotes([mockRandomQuote, ...quotes]);
  };


  const { loading, error, data, fetchMore } = useQuery<GetQuotesQuery>(GET_QUOTES, {
    onCompleted: (data) => {
      // Set initial quotes when the first query completes
      setQuotes(data.randomQuotes);
    },
  });

  // Infinite scroll function: detect when user scrolls near the bottom
  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 && !loading) {
      // If near the bottom of the page, load more quotes

      fetchMore({
        updateQuery: (prevResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return prevResult;
          // Filter out quotes in `fetchMoreResult` that already exist in `prevResult`
          const newQuotes = fetchMoreResult.randomQuotes.filter(
            newQuote => !prevResult.randomQuotes.some(prevQuote => prevQuote.id === newQuote.id)
          );
          console.log(newQuotes)
          setQuotes([...prevResult.randomQuotes, ...newQuotes])
          return {
            randomQuotes: [...prevResult.randomQuotes, ...newQuotes],
          };
        },
      });
    }
  };

  // Attach the scroll listener when the component mounts
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); // Clean up on unmount
    };
  }, [quotes, loading]); // Re-run when quotes or loading state changes

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div style={{
      padding: '20px',
    }}>
      <PostInput onPost={handlePost} />
      <Divider />
      {quotes.map((quote) => (
        <div key={quote.id} style={{ margin: 'auto', maxWidth: '500px' }}>
          <QuoteRow quote={quote} />
        </div>
      ))}
      {loading && <LoadingBounce />}
    </div>
  );
};

export default ForYou;