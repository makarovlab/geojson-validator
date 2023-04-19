import { phone } from 'phone';

interface IStoreItem {
    Store: string[]
}

export const isPhoneValid = (phoneAttr: string | IStoreItem | undefined): boolean => {
    switch(typeof(phoneAttr)) {
        case 'string':
            return phone(phoneAttr).isValid;
        
        case 'object':
            return phoneAttr.Store.length > 0 ?? phoneAttr.Store.every((item: string) => phone(item).isValid);
        
        case 'undefined':
            return false;

        default:
            return phone(phoneAttr).isValid;
    }
};