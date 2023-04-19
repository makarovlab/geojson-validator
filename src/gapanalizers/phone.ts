interface IStoreItem {
    Store: string[]
}

export const isPhonePresented = (value: string | IStoreItem) => {
    if(typeof(value) === 'object') {
        return value.Store.length > 0;

    } else if(typeof(value) === 'string') {
        return value.length > 0;

    } else {
        return false;
    }
}