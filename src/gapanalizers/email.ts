interface IEmailStoreItem {
    "Customer Service": string[]
}

export const isEmailPresented = (value: string | string[] | IEmailStoreItem | null) => {
    if (typeof(value) === 'object' && Array.isArray(value)) {
        return value.length > 0;
    
    } else if(
        typeof(value) === 'object' &&
        value != null &&
        Object.prototype.hasOwnProperty.call(value, 'Customer Service')) {
        
        return value['Customer Service'].length > 0;

    } else if(typeof(value) === 'string') {
        return value.length > 0;

    } else {
        return false;
    }
}