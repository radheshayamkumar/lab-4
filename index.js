
import itemRoutes from './routes/itemRoutes.js';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';


const app = express();  // create express app

//middleware
app.use((bodyParser.json()));

//connect to mongodb
mongoose.connect('mongodb+srv://radheshayamsingh47:SIdsaQ54rPTzgTgZ@cluster0.geprm.mongodb.net/')


mongoose.connection.on('connected', () => {
    console.log('connected to mongodb');
})

//routes
app.use('/api/items', itemRoutes);

//start server
const PORT = 5000;  
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));  // listen for requests