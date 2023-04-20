export const parseJSON = (value: string) => {
    try {
       const parsedJSON = JSON.parse(value);
       return parsedJSON;
       
    } catch (err) {
       if (err instanceof SyntaxError) {
          console.log(err.message);
 
          return null;
       }
    }
} 