// Search.tsx
import React, { useEffect } from 'react';
import SearchBar from './SearchBar';
import SegmentedControl from './SegmentedControl';
import QuoteList from './QuoteList';
import PhilosopherList from './PhilosopherList';
import { useParams } from 'react-router-dom';
import colors from './color';
import CategoryList from './CategoryList';
import SuggestedSearch from './SuggestedSearch';
import SuggestedCategories from './SuggestedCategories';
import SuggestedPhilosophers from './SuggestedPhilosophers';

const Search: React.FC = () => {
    const { searchTerm } = useParams<{ searchTerm: string }>();
    const [currentSearchTerm, setCurrentSearchTerm] = React.useState(searchTerm);
    const [currentSegment, setCurrentSegment] = React.useState("Quotes");

    const handleSearchSubmit = (term: string) => {
        const trimmedTerm = term?.trim();
        if (trimmedTerm) {
            setCurrentSearchTerm(trimmedTerm);
        }
    };

    // Add useEffect to watch for searchTerm changes
    useEffect(() => {
        if (searchTerm) {
            handleSearchSubmit(searchTerm);
        }
    }, [searchTerm]); // Dependency array includes searchTerm

    const handleSegmentChange = (segment: string) => {
        setCurrentSegment(segment)
    }

    return (
        <div style={{
            maxWidth: '600px',
            margin: 'auto',
            display: 'flex',
            flexDirection: 'column',
        }}>
            {/* Sticky container */}
            <div style={{
                position: 'sticky',
                top: 0,
                backgroundColor: `${colors.white}44`,
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
                zIndex: 10,
                paddingTop: '20px'
            }}>
                <SearchBar onSearch={handleSearchSubmit} initialSearchTerm={searchTerm} />
                <SegmentedControl segments={[
                    "Quotes",
                    "Philosophers",
                    "Categories",
                ]} onSelect={handleSegmentChange} />
            </div>

            <div style={{
                padding: '20px',
                flex: 1
            }}>
                {!currentSearchTerm ? (
                    <>
                        <SuggestedSearch />
                        <SuggestedCategories />
                        <SuggestedPhilosophers />
                    </>
                ) : (
                    <>
                        {currentSegment === "Quotes" && <QuoteList searchTerm={currentSearchTerm} />}
                        {currentSegment === "Philosophers" && <PhilosopherList searchTerm={currentSearchTerm} />}
                        {currentSegment === "Categories" && <CategoryList searchTerm={currentSearchTerm} />}
                    </>
                )}
            </div>
        </div>
    );
};

export default Search;