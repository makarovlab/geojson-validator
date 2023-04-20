export const isGeoJSONValid = (geojson: {[key: string]: any}) => {
   return (
      Object.prototype.hasOwnProperty.call(geojson, 'type') &&
      Object.prototype.hasOwnProperty.call(geojson, 'features')
   )
};