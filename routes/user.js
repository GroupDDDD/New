// TODO: 라우트 설정
const express = require("express");
const controller = require("../controllers/Cuser");
// const controller = require('../controller/Cuser');
const router = express.Router();

// GET / => localhost:PORT/
router.get("/", controller.main);

router.get("/user/get", controller.getUsername);
// router.post('/practice30', controller.practice30);

module.exports = router;
