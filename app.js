// modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// router
const { sequelize } = require('./models/index_board'); // 시퀄라이즈
const indexRouter = require('./routes/index');
const userRouter = require('./routes/user');
const boardRouter = require('./routes/board');
const chatRouter = require("./routes/chat");

// socket
const http = require("http").Server(app);
const io = require("socket.io")(http); // http-socket 연결

// app
const app = express();
// port number setting
app.set('port', process.env.PORT || 8500);
// view engine setting
app.set('view engine', 'ejs');
// static file setting
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use('/static/css', express.static(__dirname + '/static/css'));
app.use('/static/js', express.static(__dirname + '/static/js'));
app.use('/static/img', express.static(__dirname + '/static/img'));

// 서버 실행시 MYSQL과 연결
sequelize.sync({ force: false }) // 서버 실행시마다 테이블을 재생성할건지에 대한 여부
    .then(() => {
        console.log('데이터베이스 연결 성공');
    })
    .catch((err) => {
        console.error(err);
    });

app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

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

app.listen(app.get('port'), () => {
    let p = app.get('port');
    console.log(p, '번 포트에서 대기 중');
    console.log('~~~~~~~~~~~~~~~~~~~~~');
    console.log(`http://localhost:${p}`);
    console.log('~~~~~~~~~~~~~~~~~~~~~');
});