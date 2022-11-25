// TODO: 라우트 설정
const express = require("express");
const controller = require("../controllers/Cchatcont");
const router = express.Router();

// GET localhost:PORT/chatcont/getChatcont
router.get("/getChatcont", controller.getChatcont);

module.exports = router;
