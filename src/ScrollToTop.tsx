import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
    const { pathname } = useLocation();

    useEffect(() => {
        setTimeout(() => {
            // Try both window and container scroll
            window.scrollTo(0, 0);
            const mainContent = document.querySelector('div[style*="overflow-y: auto"]');
            if (mainContent) {
                mainContent.scrollTop = 0;
            }
        }, 0);
    }, [pathname]);

    return null;
};

export default ScrollToTop;