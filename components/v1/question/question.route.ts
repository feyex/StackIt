import { Router } from "express";
import {
    createQuestion, listQuestion, getQuestion, updateQuestion, deleteQuestion, getUserQuestion, UpVote, DownVote, search
} from './question.controller'

const router = Router();

router.route('/')
    .post(createQuestion);

router.route('/all/:user_id')
    .get(getUserQuestion);

router.route('/:id')
    .get(getQuestion);

router.route('/all')
    .get(listQuestion);

router.route('/all/:id')
    .delete(deleteQuestion);

router.route('/:id')
    .put(updateQuestion);

router.route('/vote/:id')
    .put(UpVote);

router.route('/downvote/:id')
    .put(DownVote);

router.route('/search/:question') 
    .get(search);

export { router as QuestionRouter }