import React, { useState } from 'react';
import { Hashtag } from './Hashtag';
import SearchBar from './SearchBar';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import TrendingTopics from './TrendingTopics';
import YouMightLike from './YouMightLike';

// Inspector Component to wrap Search and TrendingTopics
const Inspector: React.FC = () => {
    const [trendingHashtags, setTrendingHashtags] = useState<Hashtag[]>(Hashtag.getRandomHashtags(5));  // State to track filtered hashtags
    const navigate = useNavigate();
    const location = useLocation();
    const isSearchPath = location.pathname.startsWith('/search');

    // Handler to filter hashtags based on search input
    const handleSearch = (query: string) => {
        if (query.trim()) {
            navigate(`/search/${query.trim()}`);
        }
    };

    return (
        <div style={{
            width: '275px',
            height: '100vh',
            backgroundColor: '#f8f9fa',
            borderRadius: '10px',
            display: 'flex',
            flexDirection: 'column',
            position: 'sticky', // Makes the sidebar sticky
            top: '0',
            marginBlockStart: 'auto',
            padding: '20px 0px',
        }}>
            <div className='inspector-content-wrapper'>
                {!isSearchPath && <SearchBar onSearch={handleSearch} resetOnSubmit={true} />}
                <YouMightLike />
                <TrendingTopics hashtags={trendingHashtags} />
            </div>
        </div>
    );
};

export default Inspector;