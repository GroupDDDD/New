const { Sign } = require('../models');
const {isLoggedIn, isNotLoggedIn} = require('../routes/signMiddlewares');
const models = require('../models');
const { isImportEqualsDeclaration } = require('typescript');

exports.main = (req, res) => {
    res.render('sign');
}

exports.getSignup = (req, res) => {
    res.render('signup');
};


exports.getSignin = (req, res) => {
    res.render('signin');
}

//회원가입
exports.postSignup = (isLoggedIn, (req, res) => {
    models.Sign.create({
        user_id: req.body.user_id,
        user_pw: req.body.user_pw,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        // user_adr: req.body.user_adr,
    }).then((result) => {
        console.log('중복 확인!create >> ', result);
        req.session.user = req.body.user_id;
        res.send(result); //then((res) => {

        
    }).catch((result) => {
        console.log('!!중복확인>>' , result);
        // console.log('!!중복확인 아이디>>', result.user_id);
        // console.log('!!중복확인 이메일>>', result.user_email);
    });
})

exports.getPosition = (req, res) => {
    // res.render('position', {user: req.session.user});
    const user = req.session.user;
    console.log('user', user);

    if(req.session.user !== undefined){
        console.log("&&&&&&&&&&&&&&&&&&&&&&&!");
        console.log('!= 일때, req.session.user>> ', req.session.user);
        res.render('position',{user: req.session.user});
      }
}

//사용자가 입력한 장소 테이블에 update 하기
exports.postPositionUpdate = (req, res) => {
    console.log('position의 req.body.user_sido 정보 보기 >> ', req.body.user_sido);
    console.log('position의 req.body.user_sigungu 정보 보기 >> ', req.body.user_sigungu);


    //UPDATE user SET user_Lat = 14.44 WHERE user_index = 1;
    //UPDATE user SET user_Lon = 14.44 WHERE user_index = 1;
    models.Sign.update({
        user_sido: req.body.user_sido,
        user_sigungu: req.body.user_sigungu,
        user_bename: req.body.user_bename,
        user_roadname: req.body.user_roadname
    },
    {
        where: {}
    }).then((result) => {
        console.log('update >>', result);

        res.send('update 성공');
    })
}
//
exports.postIdTest = (req, res) => {
    console.log('Csign에서 req.user_id', req.body.user_id);
    models.Sign.findOne({
        where: {user_id: req.body.user_id}
    }).then((result) => {
        console.log('result의 결과 : ', result); //null값
        //req.body.user_id는 사용자가 입력한 값
        console.log('PostIdTest Csign에서 res.body.user_id', req.body.user_id);
        
        if(result === null){ //없는 아이디
            res.send(true);
            return;
        }
        else{//존재하는 아이디
            res.send(false);
        }
    })
}

exports.postEmailTest = (req, res) => {
    console.log('Csign에서 email 확인으로 req.user_id', req.body.user_email);
    models.Sign.findOne({
        where: {user_email: req.body.user_email}
    }).then((result) => {
       console.log('email 확인으로 result의 결과: ', result);
       
       if(result === null){ //가입한 적 없는 이메일
            res.send(true);
            return;
       }
       else{ //이미 가입한 이메일
            res.send(false);
       }
    })
}


//로그인
exports.postSignin = (isNotLoggedIn, (req, res) => { //로그인
    console.log('postSingin의 req.body>>', req.body);
    console.log('postSigin의 user_id', req.body.user_id);
    console.log('user_pw', req.body.user_pw);
    console.log('user_email', req.body.user_email);
    // console.log('user_adr', req.body.user_adr);
    
    //로그인 -> 사용자가 입력(INSERT)한 값을 보기(SELECT)
    //사용자가 입력한 로그인 정보로 -> 아이디와 비밀번호가 같으면 로그인 성공
    //다르면 로그인 실패.
    //테이블에 저장된 user_id값이 사용자가 입력한 값(input 태그)과 같은지 비교
    //SELECT * FROM user WHERE user_id = `${data.user_id} AND user_pw = `${data.user_pw}` LIMIT 1`
    models.Sign.findOne({ //비밀번호와 아이디 비교.
        where: {
            user_email: req.body.user_email,
            user_id: req.body.user_id, //req.body.user_id는 사용자가 입력한 값
            user_pw: req.body.user_pw,
        }
    }).then((result) => {
        //여기서 result는 위 코드와 다르게 객체로 나와서 undefined가 아닌 null로 나온다.
        console.log('Csign의 postSignin. result 출력>> ', result);

        if(result == null){ // 로그인 실패
            res.send(false);
        }
        else{ //로그인 정보 일치한다면
            req.session.user = req.body.user_id;
            res.send(true);
        }
    })
})

exports.postProfile = (req, res) => {
    //select * from user where user_id = `${data.user_id}`
    models.Sign.findOne({
        where: {user_id: req.body.user_id}
    }).then((result) => {
        console.log('findOne >>', result);

        if(result != null){
            res.render('profile', {data: result, user: req.body.user_id});
        }
    })
}

exports.postProfileEdit = (req, res) => {
    //update user set user_id = `${data.name}`, user_pw, user_name, user_email, user_adr
    models.Sign.update({
        user_id: req.body.user_id,
        user_pw: req.body.user_pw,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        // user_adr: req.body.user_adr,
    },
    {
        where: {
            user_index: req.body.user_index,
        }
    }).then((result) => {
        console.log('result', result);
        
        res.send('수정 성공');
    })
}

exports.postProfileDelete = (req, res) => {
    //delete from user where id = ${id}
    const user = req.session.user;

    console.log('req.session.user >> ', user);
    
    models.Sign.destroy({
        where:{user_index: req.body.user_index}
    }).then((result) => {
        console.log('destroy>>', result);

        if(user !== undefined){
            req.session.destroy((err) => {
                if(err){
                    throw err;
                }


                res.redirect('/main2');
            })
        }else{
            // 유저가 브라우저에서 /logout 경로로 직접 접근
        // res.send()
        // - alert('잘못된 접근입니다');
        // - /경로로 이동
        res.send(
            `<script>
                alert('잘못된 접근입니다.);
                document.location.href = '/';
            </script>`
          );
        }


        //res.send('탈퇴성공');
    })
}

exports.postProfileImg = (req, res) => {
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!")
    console.log('req 보기> >> ', req.body);
    console.log('req.file >> ', req.file)
    console.log('req.file.path >> ', req.file.path);

    console.log(req.file);
    console.log(req.file.path)
    res.send(req.file);

    //update user set prof_img_url = ${data.prof_img_url}

}


//req.logout메서드는 req.user 객체를 제거하고, 
//req.session.destroy는 req.session의 내용의 제거한다.
//세션 정보를 지운 후 메인 페이지로 되돌아간다. 로그인이 헤제되어 있다.
exports.getLogout = (req, res) => {
    const user = req.session.user;
    console.log('req.session.user >> ', user);

    if(user !== undefined){
        req.session.destroy((err) => {
            if(err){
                throw err;
            }
            res.redirect('/main2');
        })
    }else{
        // 유저가 브라우저에서 /logout 경로로 직접 접근
    // res.send()
    // - alert('잘못된 접근입니다');
    // - /경로로 이동
    res.send(
        `<script>
            alert('잘못된 접근입니다.);
            document.location.href = '/';
        </script>`
      );
    }
}