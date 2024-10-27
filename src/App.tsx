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


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <AppContent /> {/* Move all the route logic to a new component */}
      </Router>
    </ApolloProvider>
  );
}

// Create a new component for the app content
const AppContent: React.FC = () => {
  const location = useLocation();
  const state = location.state as { backgroundLocation?: Location };
  const handlePost = (text: string) => {}

  console.log('Current location:', location);
  console.log('Location state:', state);
  console.log('Background location:', state?.backgroundLocation);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'row',
      height: '100vh',
      overflowY: 'auto',
      margin: 'auto',
      justifyContent: 'space-around',
    }}>
      <Sidebar />
      <div style={{
        flex: 1,
        height: '200vh',
        maxWidth: '500px',
      }}>
        <Routes location={state?.backgroundLocation || location}>
          <Route path="/" element={<ForYou />} />
          <Route path="/search/:searchTerm" element={<Search />} />
          <Route path="/search" element={<Search />} />
          <Route path="/profile/:username" element={<Profile />} />
        </Routes>

        {/* Modal route - Changed the path and conditional rendering */}
        {state?.backgroundLocation && (
          <Routes>
            <Route 
              path="/compose/post"  // Remove the wildcard *
              element={
                <Modal title="Create Post">
                  <PostInput onPost={handlePost} />
                </Modal>
              } 
            />
          </Routes>
        )}
      </div>
      <Inspector />
    </div>
  );
};

export default App;