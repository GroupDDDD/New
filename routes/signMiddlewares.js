//라우터를 통해 로그아웃 라우터, 이미지 업로드 라우터 등 => 로그인한 사람만 가능(로그인 성공)
//회원가입 라우터나 로그인 라우터는 로그인 하지 않은 사람만 접근 가능.
//라우터에 로그인 여부를 검사하는 미들웨어를 넣어 걸러내기.

//"로그인 여부"를 검사하는 미들웨어.
exports.isLoggedIn = (req, res, next) => {
    if(req.isAuthenticated()){ //로그인 성공-> res.sender('profile')로 이동
        next();
    }else{
        res.status(403).send('로그인 필요');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if(!req.isAuthenticated()){ //true가 아니라면, 즉 로그인 실패하면 next()실행
        //isAuthenticated가 true여야 next가 호출됨.
        next();
    }else{
        const message = encodeURIComponent('로그인한 상태입니다.');
        res.redirect(`/?error=${message}`);
    }
}