import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { useParams, NavLink, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faArrowUpFromBracket } from '@fortawesome/free-solid-svg-icons';
import colors from './color';
import IconButton from './IconButton';
import QuoteImage from './QuoteImage';
import LoadingBounce from './LoadingBounce';
import Divider from './Divider';
import Spacer from './Spacer';

// Define the GraphQL query
const PHILOSOPHER_KEY_IDEAS_QUERY = gql`
  query PhilosopherByUsernameKeyIdeas($name: String!) {
    philosopherByUsername(name: $name) {
      id
      name
      username
      life
      images {
        thumbnailIllustrations {
          thumbnailIll150x150
        }
      }
      keyIdeas {
        id
        text
      }
    }
  }
`;

// TypeScript interfaces for the query response
interface KeyIdea {
  id: string;
  text: string;
}

interface Philosopher {
  id: string;
  name: string;
  username: string;
  life: string;
  images: {
    thumbnailIllustrations: {
      thumbnailIll150x150: string;
    };
  };
  keyIdeas: KeyIdea[];
}

interface PhilosopherKeyIdeasData {
  philosopherByUsername: Philosopher;
}

interface PhilosopherKeyIdeasVars {
  name: string;
}

const PhilosophersKeyIdeas: React.FC = () => {
  const { username } = useParams<{ username: string }>();
  const navigate = useNavigate();

  const { loading, error, data } = useQuery<PhilosopherKeyIdeasData, PhilosopherKeyIdeasVars>(
    PHILOSOPHER_KEY_IDEAS_QUERY,
    {
      variables: { name: username ?? '' }
    }
  );

  const handleBack = () => {
    navigate(-1);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${data?.philosopherByUsername.name}'s Key Ideas`,
          url: window.location.href
        });
      } catch (err) {
        console.error('Share failed:', err);
      }
    }
  };

  if (loading) return <LoadingBounce />;
  if (error) return null;
  if (!data?.philosopherByUsername) return null;

  const { philosopherByUsername: philosopher } = data;

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: colors.white
    }}>
      {/* Navigation Bar */}
      <div style={{
        position: 'sticky',
        top: 0,
        backgroundColor: `${colors.white}aa`,
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        zIndex: 100,
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
          display: 'flex',
          flexDirection: 'column',
          gap: '2px'
        }}>
          <div style={{
            fontWeight: 700,
            fontSize: '1.4em',
            color: colors.black,
          }}>
            {philosopher.name}
          </div>
          <div style={{
            fontWeight: 500,
            fontSize: '0.8em',
            color: colors.black,
            opacity: 0.9,
          }}>
            {philosopher.keyIdeas.length} key ideas
          </div>
        </div>
        <Spacer />
        <IconButton onClick={handleShare}>
          <FontAwesomeIcon icon={faArrowUpFromBracket} size="lg" />
        </IconButton>
      </div>

      {/* Content */}
      <div style={{
        padding: '20px'
      }}>
        <NavLink
          to={`/profile/${username}`}
          style={{
            textDecoration: 'none',
            color: colors.black
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            padding: '12px 0'
          }}>
            <QuoteImage
              philosopher={philosopher}
              width="60px"
              height="60px"
            />
            <div>
              <div style={{
                fontSize: '1.4em',
                fontWeight: 800,
                opacity: 0.9
              }}>
                {philosopher.name}
              </div>
              <div style={{
                fontSize: '1.0em',
                color: colors.black,
                opacity: 0.7
              }}>
                {philosopher.life}
              </div>
            </div>
          </div>
        </NavLink>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          marginTop: '20px'
        }}>
          {philosopher.keyIdeas.map(keyIdea => (
            <React.Fragment key={keyIdea.id}>
              <NavLink
                to={`/keyIdea/${keyIdea.id}`}
                style={{
                  textDecoration: 'none',
                  color: colors.black,
                  padding: '12px',
                  borderRadius: '8px',
                  fontSize: '1.0em',
                  lineHeight: '1.5'
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = `${colors.black}10`}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
              >
                {keyIdea.text}
              </NavLink>
              <Divider />
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PhilosophersKeyIdeas;