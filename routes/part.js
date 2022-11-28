// TODO: 라우트 설정
const express = require("express");
const controller = require("../controllers/Cpart");
const router = express.Router();

// GET / => localhost:PORT/
// part_id받아오기
router.get("/getpartid", controller.getpartid);

router.post("/postPart", controller.postPart);
module.exports = router;
