import React, { ReactNode } from 'react';
import colors from './color';

interface IconButtonProps {
    children: ReactNode;
    onClick: () => void;
    size?: 'sm' | 'md' | 'lg';
    hoverColor?: string;
    hoverBackgroundColor?: string;
    color?: string;
    backgroundColor?: string;
    accessibilityLabel?: string;  // renamed from ariaLabel for clarity
    disabled?: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
    children,
    onClick,
    size = 'md',
    hoverColor = colors.white,
    hoverBackgroundColor = colors.blue,
    color = colors.black,
    backgroundColor = 'transparent',
    accessibilityLabel,
    disabled = false,
}) => {
    // Map size prop to pixel dimensions
    const sizeMap = {
        sm: 32,
        md: 40,
        lg: 48
    } as const;

    return (
        <button
            aria-label={accessibilityLabel}
            disabled={disabled}
            style={{
                background: backgroundColor,
                border: 'none',
                cursor: disabled ? 'not-allowed' : 'pointer',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: `${sizeMap[size]}px`,
                height: `${sizeMap[size]}px`,
                transition: 'all 0.2s ease',
                fontWeight: 800,
                opacity: disabled ? 0.6 : 1,
                color: color,
            }}
            onClick={!disabled ? onClick : undefined}
            onMouseEnter={e => {
                if (!disabled) {
                    e.currentTarget.style.backgroundColor = hoverBackgroundColor;
                    e.currentTarget.style.color = hoverColor;
                }
            }}
            onMouseLeave={e => {
                if (!disabled) {
                    e.currentTarget.style.backgroundColor = backgroundColor;
                    e.currentTarget.style.color = color;
                }
            }}
        >
            {children}
        </button>
    );
};

export default IconButton;