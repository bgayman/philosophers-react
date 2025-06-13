import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faHome as faHomeSolid, 
  faSearch as faSearchSolid, 
  faBell as faBellSolid, 
  faUser as faUserSolid 
} from '@fortawesome/free-solid-svg-icons';
import { 
  faBell as faBellRegular, 
  faUser as faUserRegular 
} from '@fortawesome/free-regular-svg-icons';
import colors from './color';

const MobileTabBar = () => {
  const location = useLocation();

  return (
    <div style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: colors.white,
      borderTop: '1px solid #eee',
      padding: '8px 0',
      zIndex: 1000,
      height: '45px',
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
      }}>
        <NavLink to="/" style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: isActive ? colors.blue : colors.black,
          textDecoration: 'none',
          fontSize: '1.2em',
        })}>
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={faHomeSolid} size="lg" />
            </>
          )}
        </NavLink>

        <NavLink to="/search" style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: isActive ? colors.blue : colors.black,
          textDecoration: 'none',
          fontSize: '1.2em',
        })}>
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={faSearchSolid} size="lg" />
            </>
          )}
        </NavLink>

        <NavLink to="/notifications" style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: isActive ? colors.blue : colors.black,
          textDecoration: 'none',
          fontSize: '1.2em',
        })}>
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={isActive ? faBellSolid : faBellRegular} size="lg" />
            </>
          )}
        </NavLink>

        <NavLink to="/profile" 
        end
        style={({ isActive }) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          color: isActive ? colors.blue : colors.black,
          textDecoration: 'none',
          fontSize: '1.2em',
        })}>
          {({ isActive }) => (
            <>
              <FontAwesomeIcon icon={isActive ? faUserSolid : faUserRegular} size="lg" />
            </>
          )}
        </NavLink>
      </div>
    </div>
  );
};

export default MobileTabBar;