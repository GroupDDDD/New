// TODO: 라우트 설정
const express = require("express");
const router = express.Router();

const controller = require("../controllers/Cmain");
const conBoard = require("../controllers/Cboard");

router.get("/", controller.start);

router.get("/main", controller.main);

//김예나 메인 코드
router.get("/main2", controller.main2);

// *** 스터디 모집글 게시판 관련 기능 ***
// GET /study => localhost:PORT/study
router.get('/study', conBoard.getBoard);

// GET /study/:id => localhost:PORT/study/1
// id는 article_id, id에 해당하는 게시글을 가져옴
router.get('/study/:id', conBoard.getArticleById);

// GET /study/write => localhost:PORT/study/write
router.get('/study/write', conBoard.writeArticle);

// POST /study/post => localhost:PORT/study/post
router.post('/study/post', conBoard.postArticle);

// GET /study/edit/:id => localhost:PORT/study/edit/1
router.get('/study/edit/:id', conBoard.editArticle);

// PATCH /study/edit/:id => localhost:PORT/study/edit/1
router.patch('/study/edit/do', conBoard.doEdit);

// DELETE /study/delete/:id => localhost:PORT/study/delete/1
router.delete('/study/delete', conBoard.deleteArticle);

// GET /study/search => localhost:PORT/study/search
// router.get('/study/search', conBoard.searchArticle);

router.get("/login", controller.login);

router.get("/chat", controller.chat);

router.get("/mypage", controller.mypage);

router.get("/chatlink", controller.chatStart);

router.get("/profile", controller.profile);

router.get("/article", controller.article);

router.get("/write", controller.write);

module.exports = router;

