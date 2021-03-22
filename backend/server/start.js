import dotenv from 'dotenv';
import mongoose from 'mongoose';
import app from './app';

dotenv.config();

const URL = "mongodb+srv://9592864914:9592864914@cluster0.vrtiq.mongodb.net/getateammate?retryWrites=true&w=majority";


const connectionParams={
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}

mongoose.connect(URL,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })



const PORT=5000
app.listen(PORT, () => {
  console.log(`Magic is happening on ${PORT}`);
});
