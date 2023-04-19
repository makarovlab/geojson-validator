import opening_hours from "opening_hours";

interface IStoreItem {
    Store: string[]
}

const isOSMHours = (hours: string): boolean => {
    try {
        new opening_hours(hours);
        return true;
    } catch(err) {
        if (err instanceof Error) {
            console.log(err.message)
        }
        return false;
    }
}

export const isOperatingHoursValid = (hours: string | IStoreItem | undefined): boolean => {
    switch(typeof(hours)) {
        case 'string':
            return isOSMHours(hours);
        
        case 'object':
            return hours.Store.length > 0 ?? hours.Store.every((item: string) => isOSMHours(item));
        
        case 'undefined':
            return false;

        default:
            return isOSMHours(hours);
    }
};