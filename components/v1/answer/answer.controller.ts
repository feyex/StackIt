import { model } from 'mongoose';
import crypto from "crypto";
import bcrypt from "bcrypt";
import { Request, Response } from 'express';


const Answer = model('Answer');

//create answer modelled to a particular Answer
const createAnswer = (req: Request, res: Response) => {

	let questionId = req.body.question_id;
	//Find if question has ever been answered
	Answer.findOne({question_id:questionId})
		.then((result:any)=>{
			if(result){
				//if question
				result.answers.push({
					user_id: req.body.user_id,
					answer:req.body.answer
			
				});

				//save answer
				result.save()
				.then((answer:any) => res.status(200)
					.json({
						status: true,
						message: answer,
						SuccessMsg: 'All Answers saved '
					}))
					.catch((err: any) =>res.status(500)
						.json({
						status: false,
						error: err,
						message: 'Something went wrong. Failed to save Answer'
					}))
			
			}
			else{

				//Save answer to model
			
				Answer.create({question_id:questionId})
					.then((results:any)=>{
						if (results){
							results.answers.push({
								user_id: req.body.user_id,
								answer:req.body.answer,
								
							});
						
							results.save() 
								.then((answer:any) => res.status(200)
								.json({
									status: true,
									message: answer,
									SuccessMsg: 'All Answers saved '
								}))
								.catch((err: any) =>res.status(500)
									.json({
									status: false,
									error: err,
									message: 'Something went wrong. Failed to save Answer'
								}))
						}
						else{
							return res.status(500)
										.json({
											status:false,
											message: 'Something went wrong. Failed to create Answer'
										})
						}
					})
					.catch((err: any) =>res.status(500)
							.json({
							status: false,
							error: err

						}))
	
			}
		})
	
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
	
	Answer.find({ answers: { $elemMatch: { user_id: req.params.user_id } } } )
		.then(answer=>{
				
				res.status(200)
						.json({
							status: true,
							message: answer,
							SuccessMsg: ' Answers fetched for user '
						})
		})
		.catch(err =>res.status(500)
				.json({
				status: false,
				error: err,
				message: 'Something went wrong.'
			}))
	
}

const UpVote = (req: Request, res:Response) => {
	
	Answer.findOneAndUpdate({"answers._id": req.params._id } ,{$inc:{"answers.$.vote":1}},{new:true})
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
					message: 'Something went wrong. Failed to Downvote Answer'
			}))
}

const DownVote = (req: Request, res:Response) => {
	
	Answer.findOneAndUpdate({"answers._id": req.params._id } ,{$inc:{"answers.$.vote":-1}},{new:true})
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
	Answer.find({ "answers.answer": {'$regex':ans,'$options': 'i'}})
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


export { createAnswer, listAnswer, getAnswer, deleteAnswer, getUserAnswer, UpVote,DownVote, search };

