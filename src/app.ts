import createError from 'http-errors'
import * as express from 'express'
import * as path from 'path'
// import cookieParser from 'cookie-parser'
import {json} from 'body-parser'
import userRouter from './router/userRouter'
import * as morgan from "morgan"
import * as mongoose from "mongoose";

const app = express()
require('dotenv').config()

// DB Connect
const DB_HOST = process.env.DB_HOST
mongoose.connect(DB_HOST)
    .then(() => console.log('Successfully connected to mongodb'))
    .catch(e => console.error(e))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(morgan('combined', { skip : (req, res) => { return res.statusCode < 400 } }))

app.use(express.json())
app.use(json())
app.use(express.urlencoded({extended: false}))
// index.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(userRouter)

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404))
})

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json(err.message)
})

export default app
