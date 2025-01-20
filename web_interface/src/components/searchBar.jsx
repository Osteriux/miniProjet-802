import React, {useEffect, useContext} from 'react';
import { SearchContext } from '../globals';
import { SearchBox } from '@mapbox/search-js-react';

export function SearchBar() {
    const { setStartCoord, setEndCoord } = useContext(SearchContext);
    
    const onChange = (result, isStart) => {
        if (result.features && result.features.length > 0) {
            if(isStart) {
                setStartCoord(result.features[0].geometry.coordinates);
            } else {
                setEndCoord(result.features[0].geometry.coordinates);
            }
        } else {
            console.error("No features found in the result");
        }
    }

    return (<div id="searchBar">
        <SearchBox
            id="startSearch"
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            options={{
                language: 'fr',
                country: 'FR'
            }}
            onRetrieve={(e) => onChange(e, true)}
        />
        <SearchBox
            id="startSearch"
            accessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            options={{
                language: 'fr',
                country: 'FR'
            }}
            onRetrieve={(e) => onChange(e, false)}
        />
    </div>);
}
