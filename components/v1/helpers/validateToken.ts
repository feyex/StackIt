import jwt from 'jsonwebtoken';
import { Response, NextFunction } from "express";

const config = require('./../../config');

const validateToken = {
    verifyToken: function (req: any, res: Response, next: NextFunction) { }
};

/** verifyToken method - this method verifies token */

validateToken.verifyToken = (req, res, next) => {

    //Request header with authorization key
    const bearerHeader = req.headers['authorization'];

    //Check if there is  a header
    if (typeof bearerHeader !== 'undefined') {

        const bearer = bearerHeader.split(' ');

        //Get Token arrray by spliting
        const bearerToken = bearer[1];

        jwt.verify(bearerToken, config.secret, (err: Error, result: any) => {
            if (!err) {
                req.payload = result;
                next();
            } else {
                console.log(err, result)
                return res.status(403)
                    .json({
                        message: "Token expired or does not exist. Please login"
                    })
            }
        });
    } else {
        return res.status(403)
            .json({
                message: "Token expired or does not exist. Please login"
            })
    }
};

export { validateToken };