import React, { useRef, useState } from 'react';
import QuoteImage from './QuoteImage';
import colors from './color';
import { User } from './User'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisH, faCopy, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import OwlImage from './OwlImage';
import { NavLink } from 'react-router-dom';
import { MenuDivider, MenuItem } from './MenuItem';
import { MenuButton } from './MenuButton';

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
  onDelete?: () => void;
  onCopy?: () => void;
}

const QuoteHeader: React.FC<QuoteHeaderProps> = ({
  philosopher,
  imageWidth = '60px',
  imageHeight = '60px',
  showMoreButton = true,
  onDelete,
  onCopy,
}) => {
  const hasImage = philosopher.images?.thumbnailIllustrations?.thumbnailIll150x150;
  const profilePath = User.current && User.current.id === philosopher.id
    ? "/profile"
    : `/profile/${philosopher.username}`;
  const isOwnQuote = !!User.current && User.current.id === philosopher.id;
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDialogElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMenuClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isMenuOpen) {
      menuRef.current?.show();
      setIsMenuOpen(true);

      // Position the menu relative to the button
      if (menuRef.current && buttonRef.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect();
        menuRef.current.style.top = `${buttonRect.bottom + 2}px`; // Very close to the button
        menuRef.current.style.left = `${buttonRect.right - menuRef.current.offsetWidth}px`;
      }
    } else {
      menuRef.current?.close();
      setIsMenuOpen(false);
    }
  };

  // Close menu when clicking outside
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        menuRef.current.close();
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: '4px',
      width: '100%',
      position: 'relative',
    }}>
      <NavLink to={profilePath} style={{
        textDecoration: 'none',
        color: 'black',
      }}>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'row', 
          alignItems: 'center', 
          gap: '4px' }}>
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

      {showMoreButton && (
        <MenuButton icon={faEllipsisH} label='More options'>
          {isOwnQuote && (
                <>
                  <MenuItem onClick={onDelete} isDestructive={true}>
                    <FontAwesomeIcon icon={faTrashCan} size='lg' />
                    &nbsp;Delete
                  </MenuItem>
                  <MenuDivider />
                </>
              )}
              <MenuItem onClick={onCopy}>
                <FontAwesomeIcon icon={faCopy} size='lg' />
                &nbsp;Copy Quote
              </MenuItem>

        </MenuButton>
      )}
    </div>
  );
};

export default QuoteHeader;