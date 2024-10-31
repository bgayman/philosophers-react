// MenuButton.tsx
import React, { useRef, useState, useEffect, createContext, useContext } from 'react';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import colors from './color';
import { MenuItemProps } from './MenuItem';

interface MenuContextType {
    closeMenu: () => void;
}

export const MenuContext = createContext<MenuContextType | null>(null);

interface MenuButtonProps {
    icon: IconDefinition;
    children: React.ReactNode;
    label?: string;
    color?: string;
    borderRadius?: string;
    border?: string;
    width?: string;
    height?: string;
}

export const MenuButton: React.FC<MenuButtonProps> = ({
    icon,
    children,
    label = "More options",
    color = colors.blue, // default blue color
    borderRadius = "8px",
    border = "none",
    width,
    height
}) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDialogElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const closeMenu = () => {
        menuRef.current?.close();
        setIsMenuOpen(false);
    };

    const handleMenuClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!isMenuOpen) {
            menuRef.current?.show();
            setIsMenuOpen(true);

            // Position the menu relative to the button
            if (menuRef.current && buttonRef.current) {
                const buttonRect = buttonRef.current.getBoundingClientRect();
                menuRef.current.style.top = `${buttonRect.bottom + 2}px`;
                menuRef.current.style.left = `${buttonRect.right - menuRef.current.offsetWidth}px`;
            }
        } else {
            closeMenu()
        }
    };

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                menuRef.current.close();
                setIsMenuOpen(false);
            }
        };

        if (isMenuOpen) {
            document.addEventListener('click', handleClickOutside);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isMenuOpen]);

    return (
        <>
            <button
                ref={buttonRef}
                style={{
                    background: 'none',
                    border: border,
                    cursor: 'pointer',
                    fontSize: '1.5em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: color,
                    padding: '4px',
                    borderRadius: borderRadius,
                    width: width,
                    height: height,
                }}
                aria-label={label}
                onClick={handleMenuClick}
                onMouseEnter={e => e.currentTarget.style.backgroundColor = 'rgba(0,0,0,0.05)'}
                onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
                <FontAwesomeIcon icon={icon} />
            </button>

            <dialog
                ref={menuRef}
                style={{
                    position: 'fixed',
                    margin: '0',
                    padding: '4px 0',
                    border: '1px solid #ccc',
                    borderRadius: '8px',
                    backgroundColor: colors.white,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.15)',
                    zIndex: 200,
                }}
            >
                <MenuContext.Provider value={{ closeMenu }}>
                    <menu style={{
                        margin: 0,
                        padding: 0,
                        listStyle: 'none',
                        color: colors.black,
                    }}>
                        {children}
                    </menu>
                </MenuContext.Provider>

            </dialog>
        </>
    );
};