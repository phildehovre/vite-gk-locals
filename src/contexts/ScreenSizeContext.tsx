import React, { createContext, useEffect, useState } from 'react';

type ScreenSizeContextType = {
    screenSize: number | undefined;
    setScreenSize: (filter: string | undefined) => void;
    isSmallScreen: boolean
};

type ScreenSizeProviderProps = {
    children: React.ReactNode;
};

export const ScreenSize = createContext<ScreenSizeContextType>({
    screenSize: undefined,
    setScreenSize: () => { },
    isSmallScreen: true
});



const ScreenSizeProvider: React.FC<ScreenSizeProviderProps> = ({ children }) => {
    const [screenSize, setScreenSize] = useState<number | undefined>(undefined);
    const [isSmallScreen, setIsSmallScreen] = useState<boolean>(true);

    useEffect(() => {
        window.addEventListener('load', (e) => {
            if (e.currentTarget instanceof Window) {
                setScreenSize(e.currentTarget.innerWidth)
            }
        })
    });

    useEffect(() => {
        window.addEventListener('resize', (e) => {
            if (e.currentTarget instanceof Window && e.currentTarget.innerWidth !== screenSize) {
                setScreenSize(e.currentTarget.innerWidth)
            }
        })
    }, [screenSize]);

    useEffect(() => {
        if (screenSize) {
            if (screenSize < 500) {
                setIsSmallScreen(true)
            } else {
                setIsSmallScreen(false)
            }
        }
    }, [screenSize]);

    console.log(screenSize, isSmallScreen)


    return (
        <ScreenSize.Provider value={{ screenSize, isSmallScreen }}>
            {children}
        </ScreenSize.Provider>
    );
};

export default ScreenSizeProvider;
