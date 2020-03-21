import { Request, Response } from "express";
import { model } from 'mongoose';
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import { cloudinaryConfig, uploader } from '../helpers/cloudinary';
import { secret } from "../../config";
import { fileToDataUri } from '../helpers/file'

const SALT_WORK_FACTOR = 10;
const User = model('User');
const salt = bcrypt.genSaltSync(SALT_WORK_FACTOR);

import { sendEmail, createAccountEmail } from "../email/email.component";


//Create Account
const createAccount = async (body: any) => {

  try {

    const hashedPassword = bcrypt.hashSync(body.password, salt);

    // Store hash in your password DB.
    body.password = hashedPassword;

    const account = new User(body);

    const html = createAccountEmail();

    let subject = 'Confirm Your Email';

    //send mail to user email
    await sendEmail(body.email, html, subject);

    const savedAccount = await account.save();

    return savedAccount;

  } catch (err) {

    throw err;
  }
}

//Signin
const signin = (req: Request, res: Response) => {

  const email = req.body.email;
  const password = req.body.password;
  //check if email exists
  User.findOne({ "email": email })
    .then(async (user: any) => {
      if (!user) {

        return res.status(401)
          .json({
            status: false,
            message: 'Authentication failed. User not found.'
          });
      }

      const match = await bcrypt.compare(password, user.password);

      if (match) {
        //login
        const token = jwt.sign({ id: user.id }, secret, { expiresIn: 60 * 60 });
        const id = user._id;


        return res.status(201).json({
          status: true,
          token,
          id,

        })
      }
      else {
        return res.status(400).json({
          status: false,
          message: 'Incorrect username or password'
        });
      }
    })
    .catch((err) => {
      return res.status(401)
        .json({
          status: false,
          error: err
        })
    })
};


// To check email exist in database
const checkmailexist = (req: Request, res: Response) => {
  User.findOne({ "email": req.params.email })
    .then((user) => {
      if (!user) {
        return res.status(201)
          .json({
            status: false,
            message: 'Email does not exist'
          })
      };
      return res.status(200)
        .json({
          status: true,
          message: 'Email exist'
        })
    })
};


//Fetch user details
const getUserId = (req: Request, res: Response) => {

  let _id = req.params;

  User.findById(_id)
    .then(user => {
      res.status(200)
        .json({
          status: true,
          message: user,
          Successmessage: 'UserId details available'
        })
    })
    .catch(err => res.send({
      error: err,
      message: 'Something went wrong. UserId details not found'
    }))
}



const updateProfile = (req: Request, res: Response) => {

  User.findByIdAndUpdate(req.params.id, req.body, { new: true })
    .then(user => res.status(200)
      .json({
        status: true,
        message: 'User update successful'
      }))
    .catch(err => res.send({
      status: false,
      error: err,
      message: 'Something went wrong. Failed to update user details'
    }))
}

// upload image with other User info
const uploadoc = async (req: any, res: Response, ) => {
  try {

    const data = req.body;
    console.log(data, 'ff1')
    cloudinaryConfig();

    const file = fileToDataUri(req.files).content;
    console.log(file, 'ff2')

    const uploadResult = await uploader.upload(file, { folder: "softcomm" });


    const document = await User.findByIdAndUpdate(req.params.id, {

      profilePic: uploadResult.secure_url,
      fullname: data.fullname,
      location: data.location,
      title: data.title,

    }, { new: true });
    console.log(document, 'ff4')
    if (document) {
      return res.status(201).json({
        status: true,
        message: "User info uploaded Successfully",
        doc: document
      });

    }
    else {
      return res.status(401).json({
        message: "Error, Failed to create and upload User info",
        error: document
      });
    }

  } catch (error) {
    return res.status(500).json({
      msg: "server error",
      error: error.message
    });
  }

}

const search = (req: Request, res: Response) => {
  let query = req.params.user
  User.find({ "user": { '$regex': query, '$options': 'i' } })
    .then(user => res.status(200)
      .json({
        status: true,
        message: user,
        SuccessMsg: ' search fetched for user '
      }))
    .catch(err => res.status(500)
      .json({
        status: false,
        error: err,
        message: 'Something went wrong. Failed to fetch search details for users'
      }))
}



export {
  createAccount, signin, checkmailexist, updateProfile, getUserId, search
}