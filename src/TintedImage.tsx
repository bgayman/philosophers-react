interface TintedImageProps {
    src: string;
    tintColor: string;
    width?: string;
    height?: string;
    fit?: 'contain' | 'cover';
    position?: string;
}

const TintedImage: React.FC<TintedImageProps> = ({ 
    src, 
    tintColor,
    width = '50px',
    height = '50px',
    fit = 'cover',
    position = 'center'
}) => {
    return (
        <div style={{
            width: width,
            height: height,
            backgroundColor: tintColor,
            WebkitMaskImage: `url(${src})`,
            maskImage: `url(${src})`,
            WebkitMaskSize: fit,
            maskSize: fit,
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskPosition: position,
            maskPosition: position
        }} />
    );
};

export default TintedImage