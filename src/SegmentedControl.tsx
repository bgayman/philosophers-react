import React, { useState } from 'react';
import colors from './color';

interface SegmentedControlProps {
    segments: string[];
    defaultSelected?: string;
    onSelect: (segment: string) => void;
}

const SegmentedControl: React.FC<SegmentedControlProps> = ({ 
    segments, 
    defaultSelected = segments[0],
    onSelect 
}) => {
    const [selectedSegment, setSelectedSegment] = useState(defaultSelected);
    const [hoveredSegment, setHoveredSegment] = useState<string | null>(null);

    const handleSelect = (segment: string) => {
        setSelectedSegment(segment);
        onSelect(segment);
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'space-around',
            borderBottom: `1px solid ${colors.lightTan}`,
            marginTop: '20px',
            position: 'relative'
        }}>
            {segments.map((segment) => (
                <div
                    key={segment}
                    onClick={() => handleSelect(segment)}
                    onMouseEnter={() => setHoveredSegment(segment)}
                    onMouseLeave={() => setHoveredSegment(null)}
                    style={{
                        padding: '10px 20px',
                        cursor: 'pointer',
                        position: 'relative',
                        fontWeight: selectedSegment === segment ? '600' : '400',
                        color: selectedSegment === segment 
                            ? colors.black 
                            : hoveredSegment === segment 
                                ? colors.darkBlue 
                                : '#aaa',
                        transition: 'all 0.3s ease',
                        borderBottom: selectedSegment === segment 
                            ? `2px solid ${colors.blue}` 
                            : '2px solid transparent',
                        marginBottom: '-1px',
                        userSelect: 'none',
                    }}
                >
                    {segment}
                </div>
            ))}
        </div>
    );
};

export default SegmentedControl;