import React from 'react';
import QuoteImage from './QuoteImage';
import colors from './color';
import { User } from './User'

// Import Font Awesome core and the ellipsis icon
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH } from '@fortawesome/free-solid-svg-icons';
import OwlImage from './OwlImage';
import { NavLink } from 'react-router-dom';

export interface Philosopher {
  id?: string | null | undefined;
  name: string;
  username: string;
  images?: PhilosopherImages;
}

export interface PhilosopherImages {
  thumbnailIllustrations?: ThumbnailIllustrations;
}

export interface ThumbnailIllustrations {
  thumbnailIll150x150: string;
}

interface QuoteHeaderProps {
  philosopher: Philosopher;
  imageWidth?: string;
  imageHeight?: string;
  showMoreButton?: boolean;
}

const QuoteHeader: React.FC<QuoteHeaderProps> = ({
  philosopher,
  imageWidth = '60px',
  imageHeight = '60px',
  showMoreButton = true,
}) => {
  const hasImage = philosopher.images?.thumbnailIllustrations?.thumbnailIll150x150;
  const profilePath = User.current.id === philosopher.id ? "/profile" : `/profile/${philosopher.username}`

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between', // Pushes items to the sides
      gap: '4px',
      width: '100%',
    }}>
      <NavLink to={profilePath} style={{
        textDecoration: 'none',
        color: 'black',
      }}>
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '4px' }}>
          {hasImage ? (
            <QuoteImage philosopher={philosopher} width={imageWidth} height={imageHeight} />
          ) : (
            <OwlImage width={imageWidth} height={imageHeight} />
          )}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{
              fontSize: '1.2em',
              fontWeight: 800,
              opacity: '0.7',
            }}>
              {philosopher.name}
            </div>
            <div style={{
              fontSize: '0.8em',
              fontWeight: 700,
              opacity: '0.5',
            }}>
              {philosopher.username}
            </div>
          </div>
        </div>
      </NavLink>

      {/* Button with Font Awesome three dots (ellipsis) for more options */}
      <button
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          fontSize: '1.5em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: colors.blue,
        }}
        aria-label="More options"
        onClick={() => alert('More options clicked!')} // Placeholder for your action
      >
        <FontAwesomeIcon icon={faEllipsisH} />
      </button>
    </div>
  );
};

export default QuoteHeader;