import { isOperatingHoursValid } from './openhours';
import { isPhoneValid } from './phone';
import { isAddressValid } from './address';
import { isLatValid, isLonValid } from './latlon';
import { isUrlValid } from './url';
import { isEmailValid } from './email';

interface IStoreItem {
    Store: string[]
}

interface IEmailStoreItem {
    "Customer Service": string[]
}

export default class Validator {
    
    static validate(attribute: string, value: string | number | IStoreItem | IEmailStoreItem): boolean {
        switch(attribute) {
            case "addr:full":
                return isAddressValid(value as string);
            
            case "lat":
                return isLatValid(value as string | number);
            
            case "lon":
                return isLonValid(value as string | number);
            
            case "phones":
                return isPhoneValid(value as string);
    
            case "operatingHours":
                return isOperatingHoursValid(value as string | IStoreItem);
                
            case "website":
                return isUrlValid(value as string);
            
            case "email":
                return isEmailValid(value as string | IEmailStoreItem);
            
            case "store_url":
                return isUrlValid(value as string);
            
            default:
                return true;
        }
    }
}