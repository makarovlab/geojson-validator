interface IEmailStoreItem {
    "Customer Service": string[]
}

export const isEmailPresented = (value: string | IEmailStoreItem) => {
    if(typeof(value) === 'object') {
        return value['Customer Service'].length > 0;

    } else if(typeof(value) === 'string') {
        return value.length > 0;

    } else {
        return false;
    }
}