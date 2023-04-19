import { isOperatingHoursPresented } from './openhours';
import { isPhonePresented } from './phone';
import { isEmailPresented } from './email';
import { isAttributePresented } from './generic';
import { isLatLonPresented } from './latlon';


interface IStoreItem {
    Store: string[]
}

interface IEmailStoreItem {
    "Customer Service": string[]
}


export default class GapAnalyzer {
    
    static analyze(attribute: string, value: string | number | number[] | IStoreItem): boolean {
        switch(attribute) {
            case "phones":
                return isPhonePresented(value as string | IStoreItem);
    
            case "operatingHours":
                return isOperatingHoursPresented(value as string | IStoreItem)
            
            case "email":
                return isEmailPresented(value as string | IEmailStoreItem);
            
            case "coordinates":
                return isLatLonPresented(value as number[]);
            
            default:
                return isAttributePresented(value as string | number);
        }
    }
}
