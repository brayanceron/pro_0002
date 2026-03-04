import { useEffect } from 'react';

const useReloadFlyonui = () => {
    const loadFlyonui = async () => {
        await import('flyonui/flyonui');
        window.HSStaticMethods.autoInit();
    };

    useEffect(() => {
        loadFlyonui();
    }, []);
    // }, [location.pathname]);
    
    return loadFlyonui;
}

export { useReloadFlyonui }