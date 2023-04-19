import Validator from '../validators/validator';
import GapAnalyzer from 'gapanalizers/gapanalyzer';

interface IReportSchema {
    [key: string]: {
        presents: number,
        validity: number,
    }
}

interface IStoreItem {
    Store: string[]
}

interface Feature {
    type: string,
    properties: {
        [key: string]: string | number | IStoreItem,
    },
    geometry?: {
        coordinates: number[]
    },
}

interface IGeoJSON {
    type: string,
    features: Feature[]
}

interface IPrettyReport {
    attrName: string,
    attrPresents: number,
    attrValidity: number,
}



function* genPrettyReport (report: IReportSchema): Generator<IPrettyReport> {
    for (const key of Object.keys(report)) {
        yield {
            "attrName": key,
            "attrPresents": report[key]['presents'],
            "attrValidity": report[key]['validity'],
        }
    }
}


function getPropertyReport(attrName: string, attrValue: any) {
    const isAttrPresented: boolean = GapAnalyzer.analyze(attrName, attrValue);
    const isAttrValid: boolean = isAttrPresented && Validator.validate(attrName, attrValue);

    return {
        presents: Number(isAttrPresented), 
        validity: Number(isAttrValid)
    }
}

export function prepareReport(geojson: IGeoJSON): IPrettyReport[] {

    const count = geojson.features.length;

    const report: IReportSchema  = {
        "ref": {presents: 0, validity: 0},
        "brand": {presents: 0, validity: 0},
        "chain_name": {presents: 0, validity: 0},
        "chain_id": {presents: 0, validity: 0},
        "@spider": {presents: 0, validity: 0},
        "name": {presents: 0, validity: 0},
        "addr:full": {presents: 0, validity: 0},
        "addr:housenumber": {presents: 0, validity: 0},
        "addr:street": {presents: 0, validity: 0},
        "addr:city": {presents: 0, validity: 0},
        "addr:state": {presents: 0, validity: 0},
        "addr:postcode": {presents: 0, validity: 0},
        "addr:country": {presents: 0, validity: 0},
        "phones": {presents: 0, validity: 0},
        "email": {presents: 0, validity: 0},
        "website": {presents: 0, validity: 0},
        "store_url": {presents: 0, validity: 0},
        "operatingHours": {presents: 0, validity: 0},
        "lat": {presents: 0, validity: 0},
        "lon": {presents: 0, validity: 0},
    }

    
    for (const feature of geojson.features) {
        for (const property of Object.keys(feature.properties)) {
            if (!Object.prototype.hasOwnProperty.call(report, property)){
                report[property] = {presents: 0, validity: 0}
            }

            const {presents, validity} = getPropertyReport(property, feature.properties[property])
            
            report[property]['presents'] += presents;
            report[property]['validity'] += validity;
        }

        if (feature.geometry) {
            const [lat, lon] = feature.geometry.coordinates;

            if (!Object.prototype.hasOwnProperty.call(report, 'lat')){
                report['lat'] = {presents: 0, validity: 0};
            }

            if (!Object.prototype.hasOwnProperty.call(report, 'lon')) {
                report['lon'] = {presents: 0, validity: 0}
            }
            
            const isAttrPresented: boolean = GapAnalyzer.analyze('coordinates', feature.geometry.coordinates);
            
            if(isAttrPresented) {
                report['lat']['presents'] += 1;
                report['lon']['presents'] += 1;

                const isLatValid: boolean = Validator.validate('lat', lat);
                const isLonValid: boolean = Validator.validate('Lon', lon);

                if (isLatValid) report['lat']['validity'] += 1;
                if (isLonValid) report['lon']['validity'] += 1;
            }
        }
    }

    for (const property of Object.keys(report)){
        report[property]['presents'] = Math.ceil(report[property]['presents'] * 100  / count);
        report[property]['validity'] = Math.ceil(report[property]['validity'] * 100 / count);
    }

    return [...genPrettyReport(report)];
}