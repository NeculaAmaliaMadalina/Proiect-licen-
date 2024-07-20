const express = require('express');
const app = express();

require('dotenv').config();

const mongoose = require('mongoose');
const xss = require('xss-clean');
const mongoSanitize = require('express-mongo-sanitize');
const routes = require('./routes');
const { handleError, convertToApiError } = require('./middkeware/apiError');
const passport = require('passport');
const {jwtStrategy} = require('./middkeware/passport');

//mongodb+srv mongodb+srv://admin:<password>@cluster0.evq3gzx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}?retryWrites=true&w=majority&appName=Cluster0`;
mongoose.connect(mongoUri
);

app.use(express.json());

app.use(xss());
app.use(mongoSanitize());

app.use(passport.initialize());
passport.use('jwt', jwtStrategy);

app.use('/api', routes);

app.use(convertToApiError);
app.use((err, req, res, next) => {
    handleError(err, res)
})

const port = process.env.PORT || 3010
app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
});