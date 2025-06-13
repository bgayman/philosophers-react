import React, { ReactNode } from 'react';
import Inspector from './Inspector';

interface ScrollSyncContainerProps {
    children: ReactNode;
}

const ScrollSyncContainer: React.FC<ScrollSyncContainerProps> = ({ children }) => {
    const enhancedChildren = React.Children.map(children, child => {
        if (!React.isValidElement(child)) return child;

        // Check if this is the Inspector component
        if (child.type === Inspector) {
            return (
                <div style={{
                    position: 'sticky',
                    bottom: 0,
                    alignSelf: 'flex-end',
                    height: '100vh',
                    overflow: 'auto',
                }}>
                    {child}
                </div>
            );
        }

        return child;
    });

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            minHeight: '100vh',
            margin: 'auto',
            justifyContent: 'space-around',
        }}>
            {enhancedChildren}
        </div>
    );
};

export default ScrollSyncContainer;