require('dotenv').config()
const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const app = express()
const transporter = require('./config/emailConfig');

app.use(cors());
app.use(morgan('dev'));

const mongoose = require('mongoose')

// const userRoutes = require('./routes/userRoutes')
const authRoutes = require('./routes/authRoutes')
const adminRoutes = require('./routes/adminRoutes')
const userRoutes = require('./routes/userRoutes')


mongoose.connect(process.env.MONGO_URI)  //use 127.0.0.1 insted of localhost

const db = mongoose.connection

db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
transporter.verify((error, success) => {
    if (error) {
        console.error('Error connecting to email server:', error);
    } else {
        console.log('Email server is ready to send messages.');
    }
});
app.use('/auth' , authRoutes)
// app.use('/users', userRoutes)
app.use('/admin', adminRoutes)
app.use('/user',  userRoutes)
// const test = require('./routes/test')
// app.use('/test' , test)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(3000, () => console.log('Server started on port 3000'))

