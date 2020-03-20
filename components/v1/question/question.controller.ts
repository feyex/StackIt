import { Request, Response } from 'express';
import { model } from 'mongoose';

const Question = model('Question');

const createQuestion = (req: Request, res: Response) => {
	var question = new Question(
		req.body

	);

	question.save()
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: 'All Questions saved '
			}))
		.catch(err => res.status(500)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to save question'
			}))

}

const listQuestion = (req: Request, res: Response) => {
	Question.find({})
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: 'All Questions fetched '
			}))
		.catch(err => res.send({
			status: false,
			error: err,
			message: 'Something went wrong. Failed to fetch all Questions'
		}))
}

//get questions per Id
const getQuestion = (req: Request, res: Response) => {
	const { id } = req.params;
	Question.findById(id)
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: 'All Questions fetched by Id '
			}))
		.catch(err => res.status(500)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to fetch user Questions'
			}))
}

//update questions
const updateQuestion = (req: Request, res: Response) => {
	Question.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: 'updated '
			}))
		.catch(err => res.status(500)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to update Questions'
			}))
}

//delete question
const deleteQuestion = (req: Request, res: Response) => {
	const id = req.params.id;
	Question.deleteOne({ '_id': id })
		.then(response => res.status(200)
			.json({
				status: true,
				SuccessMsg: ' Questions deleted for user '
			}))
		.catch(err => res.status(500)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to delete user Questions'
			}))
}

//get question per user
const getUserQuestion = (req: Request, res: Response) => {
	Question.find({ "user_id": req.params.user_id })
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: ' Questions fetched for user '
			}))
		.catch(err => res.status(500)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to fetch user Questions'
			}))
}

//vote for a question
const UpVote = (req: Request, res: Response) => {
	const { id } = req.params
	Question.findByIdAndUpdate(id, { $inc: { vote: 1 } })
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: "Upvote done for Question"
			}))
		.catch(err => res.status(200)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to upvote Question'
			}))
}

//downvote a question
const DownVote = (req: Request, res: Response) => {
	const { id } = req.params
	Question.findByIdAndUpdate(id, { $inc: { vote: -1 } })
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: "Downvote done for Question"
			}))
		.catch(err => res.status(200)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to Downvote Question'
			}))
}

//search for questions
const search = (req: Request, res: Response) => {
	let query = req.params.question
	Question.find({ "question": { '$regex': query, '$options': 'i' } })
		.then(Question => res.status(200)
			.json({
				status: true,
				message: Question,
				SuccessMsg: ' Questions fetched for user '
			}))
		.catch(err => res.status(500)
			.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to fetch user Questions'
			}))
}


export { createQuestion, listQuestion, getQuestion, updateQuestion, deleteQuestion, getUserQuestion, UpVote, DownVote, search };
