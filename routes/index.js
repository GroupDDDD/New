// TODO: 라우트 설정
const express = require("express");
const router = express.Router();
const controller = require("../controllers/Cmain");

router.get("/", controller.main);

//김예나 메인 코드
router.get('/main2', controller.main2);

router.get("/index", controller.index);


router.get("/study", controller.study); // 전체 조회

router.get("/login", controller.login);

<<<<<<< HEAD
module.exports = router;
=======
router.get("/chat", controller.chat);

module.exports = router;

>>>>>>> e0fc2b4d6e29d51e9384e2c775ba9d493aa89269
