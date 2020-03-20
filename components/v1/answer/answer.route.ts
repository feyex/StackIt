import { Router } from "express";
import {createAnswer, listAnswer, getAnswer, updateAnswer, deleteAnswer, getUserAnswer, UpVote, DownVote, search } from './answer.controller'

const router = Router();

router.route("/")
    .post(createAnswer);

router.route('/all') 
    .get(listAnswer);

router.route('/:id') 
    .put(updateAnswer);

router.route('/:id') 
    .get(getAnswer);

router.route('/:user_id') 
    .get(getUserAnswer);

router.route('/:id') 
    .delete(deleteAnswer);

router.route('/vote/:id') 
    .put(UpVote);

router.route('/downvote/:id') 
    .put(DownVote);

router.route('/search/:answer') 
    .get(search);

export { router as AnswerRouter }