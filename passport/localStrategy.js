//로그인 전략 규현
//passport-local모듈에서 strategy 생성자를 불러와 그 안에 전략을 규현

//사용자 데이터베이스에서 일치하는 이메일이 있는지 찾은 후, 있다면 bcrypt의 compare함수로 비밀번호 교환
//비밀번호까지 일치한다면 done함수의 두번째 인수로 사용자 정보를 넣어 보낸다.
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const Sign = require('../models/Sign');


module.exports = () => {
    
    passport.use(new LocalStrategy({
        //첫번째 인자: 전략에 관한 설정을 하는 곳
        //usernameFiled와 passwordFiled에는 엘치하는 로그인 라우터의 req.body 속성명을 적으면 된다.
        //req.body.email에는 이메일 주소가, req.body.password에는 비밀번호가 담겨 들어온다.

        usernameField: 'email',
        passwordField: 'password',
    }, 
    
    //실제 전략을 수행하는 async 함수.
    //Localstrategy 생성자의 두번째인수ㅗ 들어간다.
    //첫번째 인수에서 넣어준 email과 password는
    //각각 async 함수의 첫번째와 두번째 매개변수가 된다.
    //세번째 매개변수인 done은 passport.quthenticate의 콜백함수
    async (email, password, done) => {
        try{
            const exUser = await User.findOne({ where: { email } });
            if(exUser){
                const result = await bcrypt.compare(password, exUser.password);

                if(result){
                    done(null, exUser);
                }else{
                    done(null, false, {message: '비밀번호가 일치하지 않습니다.'});
                }
            }else{
                done(null, false, {message: '가입되지 않은 회원입니다.'});
            }
        }catch (error) {
            console.error(error);
            done(error);
        }
    }));
};



//############################################
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Users = require('./user');

module.exports = () => {
  passport.serializeUser((user, done) => { // Strategy 성공 시 호출됨
    done(null, user); // 여기의 user가 deserializeUser의 첫 번째 매개변수로 이동
  });

  passport.deserializeUser((user, done) => { // 매개변수 user는 serializeUser의 done의 인자 user를 받은 것
    done(null, user); // 여기의 user가 req.user가 됨
  });

  passport.use(new LocalStrategy({ // local 전략을 세움
    usernameField: 'id',
    passwordField: 'pw',
    session: true, // 세션에 저장 여부
    passReqToCallback: false,
  }, (id, password, done) => {
    Users.findOne({ id: id }, (findError, user) => {
      if (findError) return done(findError); // 서버 에러 처리
      if (!user) return done(null, false, { message: '존재하지 않는 아이디입니다' }); // 임의 에러 처리
      return user.comparePassword(password, (passError, isMatch) => {
        if (isMatch) {
          return done(null, user); // 검증 성공
        }
        return done(null, false, { message: '비밀번호가 틀렸습니다' }); // 임의 에러 처리
      });
    });
  }));
};