import { useEffect, useState } from 'react';
import DeckGL from '@deck.gl/react/typed';
import { BitmapLayer, GeoJsonLayer } from '@deck.gl/layers/typed';
import { TileLayer } from '@deck.gl/geo-layers/typed';
import * as turf from '@turf/turf'; 

// DeckGL react component
const GeoMap = (props) => {
    const { style, geolayer } = props;

    useEffect(() => {
        if(geolayer) {
            try {
                const [lon, lat] = turf.centroid(geolayer).geometry.coordinates;
            
                setViewState({
                    latitude: lat,
                    longitude: lon,
                    zoom: 3,
                })
            } catch(err) {
                console.error(err.message)
            } 
        }
    }, [geolayer])
    
    const [viewState, setViewState] = useState({
        latitude: 47.7853,
        longitude: 25.41669,
        zoom: 3,
        pitch: 0,
        bearing: 0,
    });

    
    const tileLayer = new TileLayer({
        data: "https://c.tile.openstreetmap.org/{z}/{x}/{y}.png",
        minZoom: 0,
        maxZoom: 19,
        tileSize: 256,
    
        renderSubLayers: (props) => {
            /* eslint react/prop-types: 0 */
            const {
                bbox: { west, south, east, north }
            } = props.tile;

            return new BitmapLayer(props, {
                data: null,
                image: props.data,
                bounds: [west, south, east, north]
            });
        }
    });

    const generateGeoJsonLayer = (data) => {
        return new GeoJsonLayer({
            id: 'geojson-layer',
            data: data,
            pickable: true,
            stroked: false,
            filled: true,
            pointType: 'circle',
            lineWidthMinPixels: 2,
            pointRadiusMinPixels: 4,
            getFillColor: [10, 100, 240, 200],
        });
    }

    return (
        <DeckGL
            style={style}
            initialViewState={viewState}
            controller={true}
            layers={[
                tileLayer,
                generateGeoJsonLayer(geolayer),
            ]}
        />
    )
}

export default GeoMap;