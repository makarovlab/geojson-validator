import { describe, expect, test } from '@jest/globals';
import { isGeoJSONValid } from './geojson';


describe('isGeoJSONValid tests', () => {
    test('valid GeoJSON input', () => {
        const geojson = {
            "type": "FeatureCollection",
            "features": [
              {
                "type": "Feature",
                "properties": {},
                "geometry": {
                  "coordinates": [
                    31.031078043038235,
                    30.094635580029248
                  ],
                  "type": "Point"
                }
              }
            ]
        }
        
        expect(isGeoJSONValid(geojson)).toBe(true);
    });

    test('invalid GeoJSON input', () => {
        const geojson = {
            "username": "Nick",
            "age": 23
        }
        
        expect(isGeoJSONValid(geojson)).toBe(false);
    });

    test('invalid GeoJSON input', () => {
        expect(isGeoJSONValid([])).toBe(false);
    });
  });