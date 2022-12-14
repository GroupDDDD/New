const express = require("express");
const controller = require("../controllers/Cchatcont");
const router = express.Router();

// GET localhost:PORT/chatcont/getChatcont
router.get("/getChatcont", controller.getChatcont);
router.post("/postChatcont", controller.postChatcont);

module.exports = router;