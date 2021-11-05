// import createError from 'http-errors'
import express from 'express'
import * as path from 'path'
// import cookieParser from 'cookie-parser'
import {json} from 'body-parser'
import userRouter from './router/userRouter'
import morgan from "morgan"
import mongoose from "mongoose";
import {NextFunction, Request, Response} from "express/ts4.0";
import cors from "cors"
const { createProxyMiddleware } = require("http-proxy-middleware");
const app = express()
require('dotenv').config()

// DB Connect
const DB_HOST:string|undefined = process.env.DB_HOST
if (DB_HOST != null) {
    mongoose.connect(DB_HOST)
        .then(() => console.log('Successfully connected to mongodb'))
        .catch(e => console.error(e))
}

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
// app.use((req:Request, res:Response, next:NextFunction) => {
//     next(createError(404))
// })

// error handler
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
    // set locals, only providing error in development
    res.locals.message = err.message
    res.locals.error = req.app.get('env') === 'development' ? err : {}

    // render the error page
    res.status(err.status || 500)
    res.json(err.message)
})
app.disable('x-powered-by');

// app.use(function(req, res, next) {
//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000')}
// )
// const corsCheck = (req:Request, callback:any) => {
//     console.log(callback)
//     let corsOptions;
//     const acceptList = ['http://locahost:3000/'];
//     if (acceptList.indexOf(<string>req.header('Origin')) !== -1) {
//         corsOptions = { origin: true};
//     } else {
//         corsOptions = { origin: false };
//     }
//
//     console.log(corsOptions)
//     callback(null, corsOptions);
// }
// app.use(cors(corsCheck))
// const allowedOrigins = ['http://localhost:3000','http://localhost:3001'];
//
// const options: cors.CorsOptions = {
//     origin: allowedOrigins
// };
// app.use(cors(options))
// app.use(cors(options))
// app.use(cors({
//     origin: function(origin, callback){
//         if(!origin) return callback(null, true);
//         if(allowedOrigins.indexOf(origin) === -1){
//             const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
//             return callback(new Error(msg), false);
//         }
//         return callback(null, true);
//     }
//
// }));
// app.use(
//     "/user",
//     createProxyMiddleware({
//         // proxy할 주소, 즉, 백단의 주소를 적어줍니다.
//         target: "http://localhost:3001",
//         changeOrigin: true,
//     })
// );
export default app
