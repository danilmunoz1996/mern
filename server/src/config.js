import dotenv from 'dotenv';
import path from 'path';

if(process.env.NODE_ENV !== 'production'){
  try {
    dotenv.config({
      path: path.resolve(__dirname, '.env'),
      silent: true
    });
  } catch (e) {
    console.error(e.message)
  }
}

module.exports = {
  mongoose: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost/mern'
  },
}