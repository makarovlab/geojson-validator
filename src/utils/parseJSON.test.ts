import { describe, expect, test } from '@jest/globals';
import { parseJSON } from './parseJSON';


describe('parseJSON tests', () => {
    test('valid JSON input', () => {
        const json = '{"type":"FeatureCollection","features":[{"type":"Feature","properties":{},"geometry":{"coordinates":[31.031078043038235,30.094635580029248],"type":"Point"}}]}';
        
        expect(parseJSON(json)).toBeInstanceOf(Object);
    });

    test('invalid JSON input', () => {
        const json = 'asdfasdf';
        expect(parseJSON(json)).toBe(null);
    });
});
