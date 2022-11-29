const express = require('express');
const controller = require('../controllers/Csign');
const passport = require('passport');
const router = express.Router();
const path = require('path');
const multer = require('multer');

//multer 설정
const uploadDetail = multer({
    storage: multer.diskStorage({
        destination(req, file, done) {
            done(null, 'profileImgs/'); //경로설정.
        },
        filename(req, file, done) {
            //file.originalname에서 "확장자" 추출하는 과정
            const ext = path.extname(file.originalname);

            console.log('file.originalname: ', file.originalname);
            console.log('ext: ', ext);
            console.log('basename: ', path.basename(file.originalname, ext));
            // console.log('아이디로 붙이기', req.body.user_id);

            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            // done(null, path.basename(req.body.user_id, ext) + Date.now() + ext);
        }
    }),
})

//localhost:8000/sign
// router.get('/', controller.main);

// GET /sign/signin
router.get('/signin', controller.getSignin);
router.post('/signin', controller.postSignin);
// GET /sign/signup
router.get('/signup', controller.getSignup);
router.post('/signup', controller.postSignup);

router.post('/signup/id', controller.postIdTest);
router.post('/signup/email', controller.postEmailTest);

router.post('/profile', controller.postProfile); //true가 뜨면 next() 실행. -> true이면 profile로 이동
router.post('/profile/edit', controller.postProfileEdit);
router.post('/profile/delete', controller.postProfileDelete);
router.post('/profile/dynamicFile', uploadDetail.single('profileImg'), controller.postProfileImg);

router.post('/profile/admin', controller.postAdmin);
// router.post('/profile/update', controller.postProfileImgUpdate); //사진정보 update

//[로그아웃 라우터]
// GET /sign/logout
router.get('/logout', controller.getLogout);

module.exports = router;