// TODO: 라우트 설정
const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");

router.get("/", controller.main);

router.get("/index", controller.index);

router.get("/study", controller.study); // 전체 조회

router.get("/login", controller.login);

router.get("/chat", controller.chat);

module.exports = router;