
import * as React from 'react'

export const SearchContext = React.createContext();

export default function SearchProvider(props) {
    const [isSearching, setIsSearching] = React.useState(false);
    return (
        <SearchContext.Provider value={{ isSearching, setIsSearching }}>
            {props.children}
        </SearchContext.Provider>
    );
}