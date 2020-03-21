import { Router } from "express";
import { upload, validateToken } from '../helpers';
import {
    createQuestion, listQuestion, getQuestion, updateQuestion, deleteQuestion, getUserQuestion, UpVote, DownVote, search
} from './question.controller'

const router = Router();

router.route('/')
    .post(validateToken.verifyToken,createQuestion);

router.route('/all/:user_id')
    .get(validateToken.verifyToken,getUserQuestion);

router.route('/:id')
    .get(validateToken.verifyToken,getQuestion);

router.route('/all')
    .get(validateToken.verifyToken,listQuestion);

router.route('/all/:id')
    .delete(deleteQuestion);

router.route('/:id')
    .put(validateToken.verifyToken,updateQuestion);

router.route('/vote/:id')
    .put(validateToken.verifyToken,UpVote);

router.route('/downvote/:id')
    .put(validateToken.verifyToken,DownVote);

router.route('/search/:question') 
    .get(validateToken.verifyToken,search);

export { router as QuestionRouter }