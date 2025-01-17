import React from 'react';
import ReactMapboxGl, { GeoJSONLayer, Layer, Feature } from 'react-mapbox-gl';
import startMarqueur from '../assets/marqueur_start.svg';
import endMarqueur from '../assets/marqueur_end.svg';
import { test } from '../lib';
import 'mapbox-gl/dist/mapbox-gl.css';

export function Map() {
    const Map = ReactMapboxGl({
        accessToken:
        'pk.eyJ1IjoieGF2bWF6IiwiYSI6ImNtNjBnbDY4bDBhamQyanNiZnl6NXY1aDEifQ.49Dbre_-2F12TDpy5sLIsA',
        pitchWithRotate: false,
        dragRotate: false
    });
    const [geoJson, setGeoJson] = React.useState(null);
    const [start, setStart] = React.useState(null);
    const [end, setEnd] = React.useState(null);

    React.useEffect(() => {
        test().then(geoJson => {
            setGeoJson(geoJson);
            setStart(geoJson.features[0].geometry.coordinates[0]);
            setEnd(geoJson.features[0].geometry.coordinates[geoJson.features[0].geometry.coordinates.length -1]);
            console.log(start, end);
            console.log(startMarqueur, endMarqueur);
        });
    }, []);

    return (<Map
    style="mapbox://styles/mapbox/streets-v9"
    containerStyle={{
        height: '100vh',
        width: '100vw'
    }}
    center={[3.2877,47.3318]}
    zoom={[5]}
    >
        {geoJson && <>
        <GeoJSONLayer 
            data={geoJson}
            lineLayout={{
                'line-cap': 'round',
                'line-join': 'round'
            }}
        />
        <Layer type="symbol" id="marker-start" layout={{ 'icon-image': startMarqueur }}>
            <Feature coordinates={start} />
        </Layer>
        <Layer type="symbol" id="marker-end" layout={{ 'icon-image': endMarqueur }}>
            <Feature coordinates={end} />
        </Layer>
        </>}
    </Map>);
}
