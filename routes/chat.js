const express = require("express");
const controller = require("../controllers/Cchat");
const router = express.Router();

// GET localhost:PORT/chat/getChatlistpage
router.get("/getChatlistpage", controller.getChatlistpage);

// 게시자용 채팅방존재여부 조회
router.get("/pubroom", controller.pubroom);

// 채팅신청자용 채팅방존재여부 조회
router.get("/conroom", controller.conroom);

// 채팅방정보 DB저장 chat_room테이블 입력
router.post("/postChat", controller.postChat);

module.exports = router;