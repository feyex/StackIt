import { Router } from "express";

import './auth/user.model';
import './question/question.model';
import './answer/answer.model';


// Routes
import { authRouter } from './auth';
import { QuestionRouter } from './question';
import { AnswerRouter } from './answer';


let router = Router();

router.use('/', authRouter);
router.use('/question', QuestionRouter);
router.use('/answer', AnswerRouter);




router.get('/', (req, res) => {
  res.send('api v1 works');
});

export { router as v1 };