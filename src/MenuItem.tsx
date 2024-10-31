// MenuItem.tsx
import React, { useContext } from 'react';
import { MenuContext } from './MenuButton';

export interface MenuItemProps {
    onClick?: () => void;
    children: React.ReactNode;
    isDestructive?: boolean;
}

export const MenuItem: React.FC<MenuItemProps> = ({
    onClick,
    children,
    isDestructive = false,
}) => {
    const menuContext = useContext(MenuContext);

    const handleCLick = () => {
        onClick?.();
        menuContext?.closeMenu();  // Close menu after action is completed
    }

    return (
        <li>
            <button
                onClick={handleCLick}
                style={{
                    width: '100%',
                    padding: '6px 12px',
                    border: 'none',
                    background: 'none',
                    textAlign: 'left',
                    cursor: 'pointer',
                    fontSize: '14px',
                    color: isDestructive ? '#dc2626' : 'inherit',
                    borderRadius: '4px',
                }}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = '#eee'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                {children}
            </button>
        </li>
    );
};

export const MenuDivider: React.FC = () => (
    <li style={{ borderTop: '1px solid #ddd', margin: '4px 0' }} />
);