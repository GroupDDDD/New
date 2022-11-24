// TODO: 라우트 설정
const express = require("express");
const controller = require("../controllers/Cchat");
const router = express.Router();

// GET localhost:PORT/chat/getChatlistpage
router.get("/getChatlistpage", controller.getChatlistpage);

module.exports = router;
