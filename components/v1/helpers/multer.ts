import { Request } from 'express';
import * as Multer from 'multer';

const fileFilter = (req: Request, file:any, cb:any) =>{
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null, true);
    }
    else{
        cb(null, false);
    }
}

const storage = Multer.memoryStorage();
const upload = Multer.default({
    storage,
    limits: {
        fileSize : 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

export {upload}