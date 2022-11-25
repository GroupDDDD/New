const passport = require('passport');
// const local = require('./localStrategy');
const kakao = require('./kakaoStrategy');
const Sign = require('../models/Sign');

module.exports = () => {
    // 로그인 시 실행
    //req.session(세션)객체에 어떤 데이터를 저장할 지 정하는 메서드
    passport.serializeUser((user, done) => {
        //첫번째 인자: 에러를 발생시 사용
        //두번째 인자: 저장하고 싶은 데이터
        done(null, user.id);
    });

    //매 요청 시 실행
    //serializeUser의 done 두번쨰인자 = 매개변수
    //즉, done(null, user.id)의 user.id = deserializeUser((id, done)의 id
    passport.deserializeUser((id, done) => { //passport.session 미들웨어가 이 메서드를 호출.
        Sign.findOne({ where: { id } })
        .then(user => done(null, user))
        .catch(err => done(err));
    });

    // local();
    kakao();
};