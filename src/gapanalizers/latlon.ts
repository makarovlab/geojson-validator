export const isLatLonPresented = (latlon: number[]): boolean => {
    return (
        typeof(latlon) === 'object' 
        && Object.prototype.hasOwnProperty.call(latlon, 'length') 
        && latlon.length > 1
        && latlon.length <= 3
        && latlon.every((coord: number) => (typeof(coord) === 'number') && !Number.isNaN(coord))
    );
};