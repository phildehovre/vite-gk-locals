import React, { createContext, useState } from 'react';

type SearchContextType = {
    selectedFilter: string | undefined;
    setSelectedFilter: (filter: string | undefined) => void;
};

type SearchProviderProps = {
    children: React.ReactNode;
};

export const SearchContext = createContext<SearchContextType>({
    selectedFilter: undefined,
    setSelectedFilter: () => { },
});


const SearchProvider: React.FC<SearchProviderProps> = ({ children }) => {
    const [selectedFilter, setSelectedFilter] = useState<string | undefined>('name');


    return (
        <SearchContext.Provider value={{ selectedFilter, setSelectedFilter }}>
            {children}
        </SearchContext.Provider>
    );
};

export default SearchProvider;
