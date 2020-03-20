
import { Router, Request, Response, NextFunction } from 'express';
import { createAccount,signin,checkmailexist, uploadoc,getUserId,search} from './auth.controller';
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

router.route("/email/:email")
       .get (checkmailexist);

router.route('/users/:_id')
    .get(getUserId);

router.route('/users/:id') 
    .post(upload.single('profilePic'),uploadoc);

router.route('user/search/:user') 
    .get(search);


export { router as authRouter };