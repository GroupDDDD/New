const express = require('express');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const dotenv = require('dotenv');
dotenv.config();
const passport = require('passport');
const PORT = 8500;

//라우터 분리
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const signRouter = require('./routes/sign'); //localhost:8000/sign
const { sequelize } = require('./models');
const passportConfig = require('./passport');
const chatRouter = require("./routes/chat");

// socket
const http = require("http").Server(app);
const io = require("socket.io")(http); // http-socket 연결

const app = express();
passportConfig(); // 패스포트 설정

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/profileImgs', express.static(__dirname + '/profileImgs'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        maxAge: 600 * 1000,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/sign', signRouter);



// router setting
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use("/board", boardRouter);
app.use("/chat", chatRouter); // 기본 경로: localhost:PORT/chat

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
    res.render('error');
});