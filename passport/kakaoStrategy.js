//passport-kakao모듈로부터 Strategy 생성자를 불러와 전략을 구현한다.

const passport = require('passport');
const KakaoStrategy = require('passport-kakao').Strategy;

const Sign = require('../models/Sign');

module.exports = () => {
    //로컬 로그인과 마찬가지로 카카오 로그인에 대한 설정을 한다.
    //clienId는 카카오에서 발급해주는 아이디 => 노출되면 x => process.env.KAKAO_ID로 설정
    //나중에 아이디를 발급받아 .env파일에 넣을 것임.
    //callbackURL은 카카오로부터 인증 결과를 받을 라우터 주소
    passport.use(new KakaoStrategy({
        clientID: process.env.KAKAO_ID,
        callbackURL: '/sign/kakao/callback',
    }, 

    //먼저 기존에 카카오를 통해 회원가입한 사용자가 있는지 조회.
    //기존에 이미 카카오로 가입한 사람o -> 사용자 정보와 함께 done함수 호출, 전략을 종료
    async (accessToken, refreshToken, profile, done) => {
        console.log('kakao profile>>', profile);
        
        try{
            const exUser = await Sign.findOne({
                where: {snsId: profile.id, provider: 'kakao'},
            });
            
            if(exUser){//기존에 이미 카카오로 가입한 사람o -> 사용자 정보와 함께 done함수 호출, 전략을 종료
                done(null, exUser);
            }
            
            //카카오를 통해 회원가입한 사용자가 없다면 회원가입을 진행
            //카카오에서는 인증 후 callbackURL에 적힌 주소로 accessToken, refreshToken과 profile을 보낸다.
            //profile에는 사용자 정보들이 들어있다.
            //profile객체에서 원하는 정보를 꺼내와 회원가입을 하면 된다.
            else{
                const newUser = await Sign.create({
                    email: profile._json && profile._json.kakao_account_email,
                    nick: profile.displayName,
                    snsId: profile.id,
                    provider: 'kakao',
                });
                done(null, newUser);
            }
        }catch(error){
            console.error(error);
            done(error);
        }
    }));
};