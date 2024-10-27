import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import colors from './color';

interface SearchBarProps {
    onSearch: (query: string) => void;
    initialSearchTerm?: string;
    resetOnSubmit?: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch, initialSearchTerm = '', resetOnSubmit = false }) => {
    const [inputValue, setInputValue] = useState<string>(initialSearchTerm);

    // Update input value when initialSearchTerm changes
    useEffect(() => {
        if (initialSearchTerm) {
            setInputValue(initialSearchTerm);
        }
    }, [initialSearchTerm, onSearch]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() !== '' && inputValue.length >= 3) {
            onSearch(inputValue.trim());
        }
        if (resetOnSubmit) {
            setInputValue('');
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ 
            position: 'relative', 
            display: 'flex', 
            alignItems: 'center',
            marginBottom: '10px',
             }}>
            <FontAwesomeIcon
                icon={faSearch}
                style={{
                    position: 'absolute',
                    left: '10px',
                    color: '#aaa',
                    padding: '10px',
                }}
            />
            <input
                type="text"
                placeholder="Search..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                style={{
                    padding: '10px 10px 10px 40px',
                    fontSize: '1.2em',
                    width: '100%',
                    border: '1px solid #ccc',
                    borderRadius: '25px',
                    margin: '0px 5px',
                    transition: 'border-color 0.3s',
                    outline: 'none',
                    boxShadow: 'none',
                }}
                onFocus={(e) => {
                    e.currentTarget.style.borderColor = colors.blue;
                    e.currentTarget.style.boxShadow = `0 0 0 3px ${colors.blue}25`;  // Adding a subtle shadow with 25% opacity
                }}
                onBlur={(e) => {
                    e.currentTarget.style.borderColor = colors.tan;
                    e.currentTarget.style.boxShadow = 'none';
                }}
            />
        </form>
    );
};

export default SearchBar;