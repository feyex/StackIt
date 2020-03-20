import { model } from 'mongoose';
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';


const Answer = model('Answer');

//create answer modelled to a particular Answer
const createAnswer = (req: Request, res: Response) => {
	var answer = new Answer(
		req.body

	);

	answer.save() 
		.then(Answer => res.status(200)
		.json({
			status: true,
			message: Answer,
			SuccessMsg: 'All Answers saved '
		}))
		.catch(err =>res.status(500)
			.json({
			status: false,
			error: err,
			message: 'Something went wrong. Failed to save Answer'
		}))

}

const listAnswer = (req: Request, res: Response) => {
	Answer.find({})
		.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: 'All Answers fetched '
			}))
		.catch(err => res.send({
			status: false,
			error: err,
			message: 'Something went wrong. Failed to fetch all Answers'
		}))
}

const getAnswer = (req: Request, res: Response) => {
	const { id } = req.params;
	Answer.findById(id)
		.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: 'All Answers fetched by Id '
			}))
		.catch(err =>res.status(500)
				.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to fetch user Answers'
			}))
}

const updateAnswer = (req: Request, res: Response) => {
	Answer.findByIdAndUpdate(req.params.id, req.body, { new: true })
		.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: 'updated '
			}))
		.catch(err =>res.status(500)
				.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to update Answers'
			}))
}

const deleteAnswer = (req: Request, res: Response) => {
	const id = req.params.id;
	Answer.deleteOne({ '_id': id })
		.then(response => {
			if (response) {
				res.status(200)
					.json({
						status: true, message: "successfully deleted Answers"
					})
			}
			else {
				res.status(201)
					.json({
						status: false, message: "failed to delete Answers"
					})
			}
		})
		.catch(err => res.send(err))

}

const getUserAnswer = (req: Request, res: Response) => {
	Answer.find({ "user_id": req.params.user_id })
		.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: ' Answers fetched for user '
			}))
		.catch(err =>res.status(500)
				.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to fetch user Answers'
			}))
}

const UpVote = (req: Request, res:Response) => {
	const {id} = req.params
	Answer.findByIdAndUpdate(id,{$inc:{vote:1}},{new:true})
	.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: "Upvote done for Answer"
			}))
			.catch(err => res.status(200)
				.json({
					status: false,
					error: err,
					message: 'Something went wrong. Failed to upvote Answer'
			}))
}

const DownVote = (req: Request, res:Response) => {
	const {id} = req.params
	Answer.findByIdAndUpdate(id,{$inc:{vote:-1}},{new:true})
	.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: "Downvote done for Answer"
			}))
			.catch(err => res.status(200)
				.json({
					status: false,
					error: err,
					message: 'Something went wrong. Failed to Downvote Answer'
			}))
}

const search = (req: Request, res:Response) => {
	let ans = req.params.answer
	Answer.find({ "answer": {'$regex':ans,'$options': 'i'}})
		.then(Answer => res.status(200)
			.json({
				status: true,
				message: Answer,
				SuccessMsg: ' Answers fetched for user '
			}))
		.catch(err =>res.status(500)
				.json({
				status: false,
				error: err,
				message: 'Something went wrong. Failed to fetch user Answers'
			}))
}


export { createAnswer, listAnswer, getAnswer, updateAnswer, deleteAnswer, getUserAnswer, UpVote,DownVote, search };

