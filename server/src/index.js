import http from 'http';
import express from 'express';
import morgan from 'morgan';
import mongoose from 'mongoose';
//import cors from 'cors';
import logger from './util/logger';
import config from './config';
import Middlewares from './api/middlewares'
import Authentication from './api/authentication'
import UserRouter from './user/router'

if(!process.env.MONGODB_URI) {
    const err = new Error('No JWT_SECRET in env variable, check instructions: https://github.com/amazingandyyy/mern#prepare-your-secret');
    logger.warn(err.message);
}

const app = express();

mongoose.connect(config.mongoose.uri)
.catch(err=>console.error(err));

mongoose.Promise = global.Promise;

// App Setup
/*
app.use(cors({
    origin: ['http://localhost:5000']
}));
*/
app.use(morgan('dev'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.get('/ping', (req, res) => res.send('pong'))
app.post('/signup', Authentication.signup)
app.post('/signin', Authentication.signin)
app.get('/auth-ping', Middlewares.loginRequired, (req, res) => res.send('connected'))
app.use('/user', Middlewares.loginRequired, UserRouter)

app.use((err, req, res, next) => {
    logger.error(err.message);
    res.status(422).json(err.message);
});

// Server Setup
const port = process.env.PORT || 8000
http.createServer(app).listen(port, ()=>{
    logger.info(`Server listening on: ${port}`)
});
