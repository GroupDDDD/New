const express = require("express");
const controller = require("../controllers/Csign");
const passport = require("passport");
const router = express.Router();

const path = require("path");
const multer = require("multer");

//multer 설정
const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      done(null, "profileImgs/"); //경로설정.
    },
    filename(req, file, done) {
      //file.originalname에서 "확장자" 추출하는 과정
      const ext = path.extname(file.originalname);

      console.log("file.originalname: ", file.originalname);
      console.log("ext: ", ext);
      console.log("basename: ", path.basename(file.originalname, ext));
      // console.log('아이디로 붙이기', req.body.user_id);

      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
    },
  }),
});

//localhost:8000/sign
// router.get('/', controller.main);

// GET /sign/signin
router.get("/signin", controller.getSignin);
router.post("/signin", controller.postSignin);
// GET /sign/signup
router.get("/signup", controller.getSignup);
router.post("/signup", controller.postSignup);

router.get("/position", controller.getPosition);
router.post("/position/update", controller.postPositionUpdate); //위치정보 update

router.post("/signup/id", controller.postIdTest);
router.post("/signup/email", controller.postEmailTest);

router.post("/profile", controller.postProfile); //true가 뜨면 next() 실행. -> true이면 profile로 이동
router.post("/profile/edit", controller.postProfileEdit);
router.post("/profile/delete", controller.postProfileDelete);
router.post(
  "/profile/dynamicFile",
  uploadDetail.single("profileImg"),
  controller.postProfileImg
);

router.post("/profile/admin", controller.postAdmin);
// router.post('/profile/update', controller.postProfileImgUpdate); //사진정보 update

//[로그아웃 라우터]
// GET /sign/logout
router.get("/logout", controller.getLogout);

//[카카오 로그인]
//GET /sign/kakao로 접근하면 카카오 로그인 과정이 시작된다.
//main.ejs의 카카오톡 버튼에 /sign/kakao 링크가 붙어있다.

//처음에는 카카오 로그인 창으로 리다이렉트 함.
//그 창에서 로그인 후 성공 여부 결과는 GET /sign/kakao/callback으로 받음.
//이 라우터에서는 로그인 전략을 다시 수행함.
//콜백함수 대신 로그인에 실패했을 때 어디로 이동할지를 failureRedirect 속성에 적고,
//성공 시에도 어디로 이동할지를 다음 미들웨어에 적음.

// GET localhost:8000/sign/kakao
router.get("/kakao", passport.authenticate("kakao"));

// GET localhost:8000/sign/kakao/callbak
router.get(
  "/kakao/callback",
  passport.authenticate("kakao", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

//google Login
router.get("/google", passport.authenticate("kakao"));

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/",
  }),
  (req, res) => {
    res.redirect("/");
  }
);
// 채팅에서 user_name값 가져오기
// GET /sign/getUsername
router.get("/getUsername", controller.getUsername);

module.exports = router;

module.exports = router;
