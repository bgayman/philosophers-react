import React from 'react';
import TintedImage from './TintedImage';
import colors from './color';
import { getColorPairsForUUID } from './colorForUUID';

interface Category {
    id?: string | null | undefined;
    description: string;
    name: string;
    images: CatgeoryImage;
}

interface CatgeoryImage {
    banner800x600: string;
}

interface CategoryItemProps {
    category: Category;
    imageWidth?: string;
    imageHeight?: string;
}

const CategoryItem: React.FC<CategoryItemProps> = ({ category, imageWidth = '60px', imageHeight = '60px' }) => {
    const colorPair = getColorPairsForUUID(category.id ?? "")
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '4px',
            width: '100%',
        }}>
            <div style={{
                backgroundColor: colorPair[0],
                borderRadius: '20px',
                overflow: 'hidden',
            }}>
                <TintedImage
                    src={`https://philosophersapi.com${category.images.banner800x600}`}
                    tintColor={colorPair[1]}
                    width={imageWidth}
                    height={imageHeight}
                />
            </div>
            <div style={{
                fontWeight: 700,
                fontSize: '1.2em'
            }}>
                {category.name}
            </div>
            <div style={{
                textAlign: 'center',
            }}>
                {category.description}
            </div>
        </div>
    );
};

export default CategoryItem;