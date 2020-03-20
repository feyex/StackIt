// import DataURI from 'datauri';  
const DataURI = require('datauri');
import path from 'path';



const fileToDataUri = (file:any) => {
    const dataUri = new DataURI();
    return dataUri.format(
        path.extname(file.originalname).toString(),
        file.buffer
    );
}

export {fileToDataUri}