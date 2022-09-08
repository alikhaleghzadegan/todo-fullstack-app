const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const logger = require('morgan');
const authRoutes = require('./routes/authRoutes');
const taskRoutes = require('./routes/taskRoutes');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');
const { allowOrigin } = require('./middleware/corsMiddleware');
require("dotenv").config();


const app = express();

// middleware
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static('public'));
app.use(allowOrigin);

// database connection
mongoose.connect(process.env.DB_URI, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useCreateIndex: true
}).then(() => {
	app.listen(process.env.APP_PORT || 5000);
	console.log(`server started at port ${process.env.APP_PORT}`);
}).catch((err) => console.error(err));

// routes
app.use('*', checkUser);
app.use('/auth', authRoutes);
app.use('/api', requireAuth, taskRoutes);
