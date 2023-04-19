export const isUrlValid = (website: string | undefined): boolean => {
    if(website) {
        try {
            new URL(website);
            return true;
        } catch (err) {
            if(err instanceof TypeError) {
                console.log(err.message);
            }
            return false;
        }
    } else {
        return false;
    }
};