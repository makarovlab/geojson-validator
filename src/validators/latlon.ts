export const isLatValid = (lat: string | number): boolean => {
    const latitude: number = typeof(lat) === "string" ? parseFloat(lat) : lat;
    return (latitude <= 180 && latitude >= -180);
};

export const isLonValid = (lon: string | number): boolean => {
    const longitude: number = typeof(lon) === "string" ? parseFloat(lon) : lon;
    return (longitude <= 90 && longitude >= -90);
};