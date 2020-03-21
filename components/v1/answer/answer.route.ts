import { Router } from "express";
import {validateToken } from '../helpers';
import {createAnswer, listAnswer, getAnswer, deleteAnswer, getUserAnswer, UpVote, DownVote, search } from './answer.controller'

const router = Router();

router.route("/")
    .post(validateToken.verifyToken, createAnswer);

router.route('/all') 
    .get(validateToken.verifyToken,listAnswer);


router.route('/:id') 
    .get(validateToken.verifyToken,getAnswer);

router.route('/user/:user_id') 
    .get(validateToken.verifyToken,getUserAnswer);

router.route('/:id') 
    .delete(validateToken.verifyToken,deleteAnswer);

router.route('/vote/:_id') 
    .put(validateToken.verifyToken,UpVote);

router.route('/downvote/:_id') 
    .put(validateToken.verifyToken,DownVote);

router.route('/search/:answer') 
    .get(validateToken.verifyToken,search);

export { router as AnswerRouter }