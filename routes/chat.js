// TODO: 라우트 설정
const express = require("express");
const controller = require("../controllers/Cchat");
// const controller = require('../controller/Cuser');
const router = express.Router();

// 기본 경로: localhost:PORT/chat

// router.get("/chat", controller.main);
// // router.post('/practice30', controller.practice30);

// GET localhost:PORT/chat/getChatlistpage
router.get("/getChatlistpage", controller.getChatlistpage);

module.exports = router;
