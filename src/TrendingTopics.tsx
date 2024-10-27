import React, { useState } from 'react';
import { Hashtag } from './Hashtag';
import colors from './color';
import { NavLink, useNavigate } from 'react-router-dom';

// TrendingTopics Component to display a list of hashtags and their descriptions
const TrendingTopics: React.FC<{ hashtags: Hashtag[] }> = ({ hashtags }) => {
    return (
        <div style={{
            borderRadius: '8px',
            borderColor: '#ddd',
            borderWidth: '0.5px',
            borderStyle: 'solid',
            padding: '10px',
            margin: '10px 5px',
        }}>
            <div style={{
                color: colors.black,
                opacity: 0.8,
                fontWeight: 800,
                fontSize: '1.5em',
                padding: '5px 0px 15px 0px',
            }}>Explore</div>
            {hashtags.length === 0 ? (
                <p>No trending topics found.</p>
            ) : (
                hashtags.map((hashtag) => (
                    <NavLink to={`/search/${hashtag.tag}`} style={{
                        textDecoration: 'none',
                    }} key={hashtag.id}>
                        <div key={hashtag.id} style={{ marginBottom: '15px' }}>
                            <div style={{
                                margin: '0',
                                color: colors.blue,
                                fontWeight: 800,
                                fontSize: '1.2em',
                            }}>#{hashtag.tag}
                            </div>
                            <div style={{ margin: '0', fontSize: '0.7em', color: '#555' }}>{hashtag.description}</div>
                        </div>
                    </NavLink>
                ))
            )}
        </div>
    );
};

export default TrendingTopics;