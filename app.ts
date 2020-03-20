import express from "express";
import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import cookieParser from "cookie-parser";
import createError  from 'http-errors';
import logger from 'morgan';
import { api }   from './components';
import mongoose from 'mongoose';
import { connection, connect } from 'mongoose';
import { mongodbUser, mongodbPass } from './components/config';

import cors from 'cors'

// Add Dotenv 
dotenv.config();


// Create Express server
const app = express();

/**
   * Connect to MongoDB server.
   */

  const connectionOptions = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  }
  
  if (mongodbUser && mongodbPass) {
    Object.assign(connectionOptions, { user: mongodbUser, pass: mongodbPass })
  }
  
  const mongoUrl = process.env.MLAB_URL || process.env.MONGOLAB_URI || 'mongodb://localhost:27017/softcomm';

  // const mongoUrl = process.env.MLAB_URL || process.env.MONGOLAB_URI || 'mongodb://ecommerce:ewaoluwa18@ds361768.mlab.com:61768/ecommerce';

  mongoose.Promise = global.Promise;
  connect(mongoUrl, connectionOptions);
  
  const db = connection;
  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', function() {
    // we're connected!
    console.log('Connected to DB');
  });

app.use(logger('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser());
app.use(cors());

app.use('/', api);

// catch 404 and forward to error handler
app.use((req: Request, res: Response, next: NextFunction) => {
  next(createError(404));
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(500);
  res.render('error');
})

export { app };