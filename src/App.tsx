import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './ApolloClient'; // Import the Apollo client you just created
import './App.css';
import ForYou from './ForYou';
import { BrowserRouter as Router, Route, Routes, NavLink } from 'react-router-dom';
import Sidebar from './Sidebar';
import Inspector from './Inspector';
import Search from './Search';
import PostInput from './PostInput';
import Profile from './Profile';
import Modal from './Modal';
import { useLocation } from 'react-router-dom';
import Category from './Category';
import Quote from './Quote';
import ScrollToTop from './ScrollToTop';
import { useMediaQuery } from 'react-responsive';
import MobileTabBar from './MobileTabBar';
import Notifications from './Notifications';
import EBooks from './EBooks';
import Audiobooks from './Audiobooks';
import Audiobook from './Audiobook';
import KeyIdea from './KeyIdea';
import PhilosophersKeyIdeas from './PhilosophersKeyIdeas';
import PhilosophersMap from './PhilosophersMap';
import Timeline from './Timeline';
import Auth from './Auth';


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <ScrollToTop />
        <AppContent /> {/* Move all the route logic to a new component */}
      </Router>
    </ApolloProvider>
  );
}

// Create a new component for the app content
const AppContent: React.FC = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 600px)' });
  const isTablet = useMediaQuery({ query: '(min-width: 601px) and (max-width: 900px)' });
  const isDesktop = useMediaQuery({ query: '(min-width: 901px)' });
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const handlePost = (text: string) => { }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      overflowY: 'auto',
      margin: 'auto',
      justifyContent: 'space-around',
    }}>
      {(isTablet || isDesktop) && <Sidebar compact={isTablet} />}
      <div style={{
        flex: 1,
        height: '100vh',
        width: '100%',
        maxWidth: '600px',
      }}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<ForYou />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/map" element={<PhilosophersMap />} />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/:username/ebooks" element={<EBooks />} />
          <Route path="/profile/:username/keyIdeas" element={<PhilosophersKeyIdeas />} />
          <Route path="/profile/:username/audiobooks" element={<Audiobooks />} />
          <Route path="/profile/:username/audiobooks/:audiobookId" element={<Audiobook />} />
          <Route path="/category/:categoryId" element={<Category />} />
          <Route path="/quote/:quoteId" element={<Quote />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/keyIdea/:keyIdeaId" element={<KeyIdea />} />
        </Routes>

        {/* Modal route - Changed the path and conditional rendering */}
        {state?.backgroundLocation && (
          <Routes>
            <Route
              path="/compose/post"  // Remove the wildcard *
              element={
                <Modal>
                  <PostInput onPost={handlePost} />
                </Modal>
              }
            />
            <Route path="/profile/:username/*" element={<Profile />} />
          </Routes>
        )}
      </div>
      {/* Only show Inspector on desktop */}
      {(isTablet || isDesktop) && <Inspector />}
      
      {/* Show TabBar only on mobile */}
      {isMobile && <MobileTabBar />}
    </div>
  );
};

export default App;