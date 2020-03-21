
import { Router, Request, Response, NextFunction } from 'express';
import { createAccount,signin, updateProfile,getUserId,search} from './auth.controller';
import { upload, validateToken } from '../helpers';

const router = Router();

router.route('/signup')
    .post(async (req: Request, res: Response, next: NextFunction ) => {
        try{
            const savedUser = await createAccount(req.body);
            if(!savedUser){
                return res.status(400).json({
                    "status": false,
                    "data": "error",
                    "message": "User registration failed"
                });
            }

            const json = {
                "status": true,
                "data": savedUser,
                "message": "User Created and confirmation email sent to mail"
            };
            return res.status(201).json(json);
        } catch(err) {
            console.log("create user error", err);
            return res.status(400).json({
                'status':false,
                'error':err
            });
        }
    })

router.route("/login")
    .post(signin);

router.route('/users/:_id')
    .get(validateToken.verifyToken,getUserId);

router.route('/users/:id') 
    .put(validateToken.verifyToken,updateProfile);

router.route('/user/search/:fullname') 
    .get(search);


export { router as authRouter };