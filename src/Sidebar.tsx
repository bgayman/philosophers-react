import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome as faHomeSolid, faSearch as faSearchSolid, faBell as faBellSolid, faUser as faUserSolid } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular, faUser as faUserRegular } from '@fortawesome/free-regular-svg-icons';
import colors from './color'
import QuoteHeader from './QuoteHeader';
import { User } from './User'
import { useNavigate, useLocation } from 'react-router-dom';
import Spacer from './Spacer';

const Sidebar: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const handlePost = () => {
        navigate("/compose/post", { state: {
            backgroundLocation: location
        }})
    };

    return (
        <div
            style={{
                width: '275px',
                height: '100vh',
                backgroundColor: '#f8f9fa',
                padding: '20px 0px',
                display: 'flex',
                flexDirection: 'column',
                gap: '5px',
                position: 'sticky', // Makes the sidebar sticky
                top: '0',
                marginBlockStart: 'auto',
                alignItems: 'start',
            }}
        >
            <NavLink
                to="/"
                end // Ensure exact match for the root path '/'
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                })}
            >
                <img src="/icStone@100x.svg" alt="stone logo" width="80px" height="80px" />

            </NavLink>
            <NavLink
                to="/"
                end // Ensure exact match for the root path '/'
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={faHomeSolid}
                            style={{ marginRight: '10px' }}
                        />
                        Home
                    </>
                )}
            </NavLink>
            <NavLink
                to="/search"
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={faSearchSolid}
                            style={{ marginRight: '10px' }}
                        />
                        Explore
                    </>
                )}
            </NavLink>
            <NavLink
                to="/notifications"
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={isActive ? faBellSolid : faBellRegular}
                            style={{ marginRight: '10px' }}
                        />
                        Notifications
                    </>
                )}
            </NavLink>
            <NavLink
                to="/profile"
                end
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={isActive ? faUserSolid : faUserRegular}
                            style={{ marginRight: '10px' }}
                        />
                        Profile
                    </>
                )}
            </NavLink>
            <button
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    padding: '15px 15px',
                    backgroundColor: colors.blue,
                    color: colors.white,
                    border: 'none',
                    borderRadius: '30px',
                    cursor: 'pointer',
                    fontSize: '1.5em',
                    fontWeight: 800,
                    width: '90%',
                }}
                onClick={handlePost} // Trigger post when the button is clicked
            >
                Post
            </button>

            {/* Spacer to push the QuoteHeader to the bottom */}
            <Spacer />
            <div
                className={"nav-link"}
                style={{
                    marginBottom: '25px',
                    textDecoration: 'none',
                    color: '#333',
                }}
            >
                <QuoteHeader philosopher={{
                    id: User.current.id,
                    name: User.current.name,
                    username: User.current.username,
                    images: {
                        thumbnailIllustrations: {
                            thumbnailIll150x150: "",
                        }
                    },
                }} imageWidth='40px' imageHeight='40px' />
            </div>
        </div>
    );
};


// Basic styles for links
const navLinkStyle: React.CSSProperties = {
    margin: '10px 30px',
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center', // Align icon and text horizontally
    fontWeight: 600,
};

// Example CSS for the active state
const activeStyle: React.CSSProperties = {
    fontWeight: 900,
    fontSize: '1.8em',
    color: colors.darkBlue, // Use your color from the `colors` file
};

export default Sidebar;