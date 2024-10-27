import React from 'react';
import { GetQuotesQuery } from './gql/graphql'; // Import the generated type
import { getColorForUUID } from './colorForUUID';
import { Philosopher } from './QuoteHeader';

// Create a new component to display a RandomQuote
interface QuoteImageProps {
    philosopher: Philosopher;
    width: string;
    height: string;
}

function removeDiacritics(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const QuoteImage: React.FC<QuoteImageProps> = ({ philosopher, width, height }) => {
    // Guard against missing philosopher ID or images
    const philosopherId = philosopher.id ?? "";
    const thumbnailUrl =
        philosopher.images?.thumbnailIllustrations?.thumbnailIll150x150
            ? `https://philosophersapi.com/${removeDiacritics(philosopher.images.thumbnailIllustrations.thumbnailIll150x150)}`
            : ""; // Default to an empty string or placeholder image URL

    return (
        <div
            style={{
                borderRadius: '50%',
                overflow: 'hidden',
                backgroundColor: getColorForUUID(philosopherId),
                width: width,
                height: height,
            }}
        >
            {thumbnailUrl ? (
                <img
                    src={thumbnailUrl}
                    alt={`${philosopher.name} thumbnail`}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }} // Ensure the image fits within the circle
                />
            ) : (
                <p>No Image Available</p> // Placeholder text or image if thumbnailUrl is empty
            )}
        </div>
    );
};

export default QuoteImage;