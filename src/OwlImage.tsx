import React from 'react';
import colors from './color';


// Create a new component to display a RandomQuote
interface OwlImageProps {
    width: string;
    height: string;
}

const OwlImage: React.FC<OwlImageProps> = ({ width, height }) => {

    return (
        <div
            style={{
                borderRadius: '50%',
                backgroundColor: colors.blue,
                width: width,
                height: height,
            }}
        >
            <img
                src={`/Owl@3x.png`}
                alt={`Egg Profile Pic`}
                style={{ 
                    width: width, 
                    height: height, 
                    objectFit: 'cover',
                    borderRadius: '50%',
                }} // Ensure the image fits within the circle
            />
        </div>
    );
};

export default OwlImage;