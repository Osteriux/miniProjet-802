import React, { createContext } from "react";

const initialSearchContext = {
    startCoord: null,
    setStartCoord: () => {},
    endCoord: null,
    setEndCoord: () => {}
}

const SearchContext = createContext(initialSearchContext);

export { initialSearchContext, SearchContext };