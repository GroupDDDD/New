const express = require("express");
const router = express.Router();

const controller = require("../controllers/Cmain");
const conBoard = require("../controllers/Cboard");

router.get("/", controller.start);

router.get("/main", controller.main);

//김예나 메인 코드
router.get("/main2", controller.main2);

router.get("/chat", controller.chat);

router.get("/mypage", controller.mypage);

// router.get("/chatlink", controller.chatStart);

router.get("/profile", controller.profile);

module.exports = router;
