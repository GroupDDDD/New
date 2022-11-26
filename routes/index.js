// TODO: 라우트 설정
const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");
const controllerB = require("../controllers/Cboard");

router.get("/", controller.start);

router.get("/main", controller.main);

//김예나 메인 코드
router.get("/main2", controller.main2);

// router.get("/study", controllerB.getArticles);

router.get("/login", controller.login);

router.get("/chat", controller.chat);

router.get("/mypage", controller.mypage);

module.exports = router;