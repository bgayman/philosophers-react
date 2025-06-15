import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome as faHomeSolid, faSearch as faSearchSolid, faBell as faBellSolid, faUser as faUserSolid, faMap as faMapSolid, faTimeline as faTimelineSolid } from '@fortawesome/free-solid-svg-icons';
import { faBell as faBellRegular, faUser as faUserRegular, faMap as faMapRegular } from '@fortawesome/free-regular-svg-icons';
import colors from './color'
import QuoteHeader from './QuoteHeader';
import { User } from './User'
import { useNavigate, useLocation } from 'react-router-dom';
import Spacer from './Spacer';

interface SidebarProps {
    compact?: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ compact = false }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const handlePost = () => {
        navigate("/compose/post", {
            state: {
                backgroundLocation: location
            }
        });
    };

    const handleLogout = () => {
        User.logout();
        navigate('/auth');
    };

    return (
        <div
            style={{
                width: compact ? '60px' : '275px',
                height: '100vh',
                backgroundColor: '#f8f9fa',
                padding: '20px 0px',
                display: 'flex',
                flexDirection: 'column',
                gap: '0px',
                position: 'sticky',
                top: '0',
                marginBlockStart: 'auto',
                alignItems: compact ? 'center' : 'start',
                transition: 'width 0.3s ease',
                borderRight: compact ? `${colors.black}aa 0.5px solid` : 'none'
            }}
        >
            <NavLink
                to="/"
                end
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                })}
            >
                <img
                    src="/icStone@100x.svg"
                    alt="stone logo"
                    width={compact ? "40px" : "80px"}
                    height={compact ? "40px" : "80px"}
                />
            </NavLink>
            <NavLink
                to="/"
                end
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                    justifyContent: 'center',
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={faHomeSolid}
                            style={{ marginRight: compact ? '0' : '10px' }}
                        />
                        {!compact && 'Home'}
                    </>
                )}
            </NavLink>
            <NavLink
                to="/search"
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                    justifyContent: 'center',
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={faSearchSolid}
                            style={{ marginRight: compact ? '0' : '10px' }}
                        />
                        {!compact && 'Explore'}
                    </>
                )}
            </NavLink>
            <NavLink
                to="/notifications"
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                    justifyContent: 'center',
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={isActive ? faBellSolid : faBellRegular}
                            style={{ marginRight: compact ? '0' : '10px' }}
                        />
                        {!compact && 'Notifications'}
                    </>
                )}
            </NavLink>
            <NavLink
                to="/profile"
                end
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                    justifyContent: 'center',
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={isActive ? faUserSolid : faUserRegular}
                            style={{ marginRight: compact ? '0' : '10px' }}
                        />
                        {!compact && 'Profile'}
                    </>
                )}
            </NavLink>
            <NavLink
                to="/map"
                end
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                    justifyContent: 'center',
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={isActive ? faMapSolid : faMapRegular}
                            style={{ marginRight: compact ? '0' : '10px' }}
                        />
                        {!compact && 'Map'}
                    </>
                )}
            </NavLink>
            <NavLink
                to="/timeline"
                end
                style={({ isActive }) => ({
                    ...navLinkStyle,
                    ...(isActive ? activeStyle : {}),
                    margin: compact ? '10px 0' : '10px 30px',
                    justifyContent: 'center',
                })}
                className={"nav-link"}
            >
                {({ isActive }) => (
                    <>
                        <FontAwesomeIcon
                            icon={faTimelineSolid}
                            style={{ marginRight: compact ? '0' : '10px' }}
                        />
                        {!compact && 'Timeline'}
                    </>
                )}
            </NavLink>
            {!compact && (
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
                    onClick={handlePost}
                >
                    Post
                </button>
            )}

            <Spacer />

            {!compact && User.current && (
                <>
                    <div
                        className={"nav-link"}
                        style={{
                            marginBottom: '20px',
                            textDecoration: 'none',
                            color: '#333',
                        }}
                    >
                        <QuoteHeader
                            philosopher={{
                                id: User.current.id,
                                name: User.current.name,
                                username: User.current.username,
                                images: {
                                    thumbnailIllustrations: {
                                        thumbnailIll150x150: "",
                                    }
                                },
                            }}
                            imageWidth='40px'
                            imageHeight='40px'
                        />
                    </div>
                    <div style={{ margin: '0 30px 20px 30px' }}>
                        <button
                            onClick={handleLogout}
                            style={{
                                width: '100%',
                                padding: '10px 15px',
                                backgroundColor: colors.blue,
                                color: colors.white,
                                border: 'none',
                                borderRadius: '30px',
                                cursor: 'pointer',
                                fontSize: '1em',
                                fontWeight: 700,
                            }}
                        >
                            Log Out
                        </button>
                    </div>
                </>
            )}

            {!compact && !User.current && (
                <div style={{ margin: '0 30px 40px 30px' }}>
                    <button
                        onClick={() => navigate('/auth')}
                        style={{
                            width: '100%',
                            padding: '10px 15px',
                            backgroundColor: colors.blue,
                            color: colors.white,
                            border: 'none',
                            borderRadius: '30px',
                            cursor: 'pointer',
                            fontSize: '1em',
                            fontWeight: 700,
                        }}
                    >
                        Sign In
                    </button>
                </div>
            )}
        </div>
    );
};

const navLinkStyle: React.CSSProperties = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.5em',
    display: 'flex',
    alignItems: 'center',
    fontWeight: 600,
};

const activeStyle: React.CSSProperties = {
    fontWeight: 900,
    fontSize: '1.8em',
    color: colors.darkBlue,
};

export default Sidebar;