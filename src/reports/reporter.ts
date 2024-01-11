import Validator from '../validators/validator';
import GapAnalyzer from 'gapanalizers/gapanalyzer';

interface IReportSchema {
    [key: string]: {
        required: boolean,
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
    attrRequired: boolean,
    attrPresents: number,
    attrValidity: number,
}



function* genPrettyReport (report: IReportSchema): Generator<IPrettyReport> {
    for (const key of Object.keys(report)) {
        yield {
            "attrName": key,
            "attrRequired": report[key]['required'],
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
        "ref": {required: true, presents: 0, validity: 0},
        "chain_name": {required: true, presents: 0, validity: 0},
        "chain_id": {required: true, presents: 0, validity: 0},
        "addr:full": {required: true, presents: 0, validity: 0},
        "lat": {required: true, presents: 0, validity: 0},
        "lon": {required: true, presents: 0, validity: 0},
        "addr:housenumber": {required: false, presents: 0, validity: 0},
        "addr:street": {required: false, presents: 0, validity: 0},
        "addr:city": {required: false, presents: 0, validity: 0},
        "addr:state": {required: false, presents: 0, validity: 0},
        "addr:postcode": {required: false, presents: 0, validity: 0},
        "addr:country": {required: false, presents: 0, validity: 0},
        "phones": {required: false, presents: 0, validity: 0},
        "email": {required: false, presents: 0, validity: 0},
        "website": {required: false, presents: 0, validity: 0},
        "store_url": {required: false, presents: 0, validity: 0},
        "operatingHours": {required: false, presents: 0, validity: 0},
    }

    
    for (const feature of geojson.features) {
        for (const property of Object.keys(feature.properties)) {
            if (!Object.prototype.hasOwnProperty.call(report, property)){
                report[property] = {required: false, presents: 0, validity: 0}
            }

            const {presents, validity} = getPropertyReport(property, feature.properties[property])
            
            report[property]['presents'] += presents;
            report[property]['validity'] += validity;
        }

        if (feature.geometry) {
            const [lat, lon] = feature.geometry.coordinates;

            if (!Object.prototype.hasOwnProperty.call(report, 'lat')){
                report['lat'] = {required: true, presents: 0, validity: 0};
            }

            if (!Object.prototype.hasOwnProperty.call(report, 'lon')) {
                report['lon'] = {required: true, presents: 0, validity: 0}
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