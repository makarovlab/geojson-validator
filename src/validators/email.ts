import * as EmailValidator from 'email-validator';

interface IStoreItem {
    "Customer Service": string[]
}

export const isEmailValid = (value: string | string[] | IStoreItem): boolean => {
    if (typeof(value) === 'object' && Array.isArray(value)) {
        return value.every((item: string) => EmailValidator.validate(item));
    
    } else if(
        typeof(value) === 'object' &&
        Object.prototype.hasOwnProperty.call(value, 'Customer Service')) {
        
        return (
            value["Customer Service"].length > 0 
            ?? value["Customer Service"].every((item: string) => EmailValidator.validate(item))
        )

    } else if(typeof(value) === 'string') {
        return EmailValidator.validate(value);

    } else {
        return false;
    }
};