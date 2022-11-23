// TODO: 라우트 설정
const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");

router.get("/", controller.main);

//김예나 메인 코드
router.get('/main2', controller.main2);

router.get("/study", controller.study); // 전체 조회

router.get("/login", controller.login);

router.get("/chat", controller.chat);



module.exports = router;
