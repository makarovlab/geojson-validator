import * as EmailValidator from 'email-validator';

interface IStoreItem {
    "Customer Service": string[]
}

export const isEmailValid = (emailAttr: string | IStoreItem): boolean => {
    switch (typeof(emailAttr)) {
        case 'string':
            return EmailValidator.validate(emailAttr);

        case 'object':
            return (
                emailAttr["Customer Service"].length > 0 
                ?? emailAttr["Customer Service"].every((item: string) => EmailValidator.validate(item))
            );

        case 'undefined':
            return false;

        default:
            return EmailValidator.validate(emailAttr);
    }
};