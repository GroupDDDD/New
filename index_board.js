// modules
const express = require('express');
const path = require('path');
const morgan = require('morgan');

// router
const { sequelize } = require('./models/index_board'); // 시퀄라이즈
const boardRouter = require('./routes/board');

// app
const app = express();
app.set('port', process.env.PORT || 8500);
app.set('view engine', 'ejs');
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
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', boardRouter);

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