const express = require("express");
const controller = require("../controllers/Cboard");
const router = express.Router();

// *** 스터디 모집글 게시판 관련 기능 ***
// route 설정을 통해 controller의 함수를 호출

// GET /study => localhost:PORT/study
// study 라우트에 대한 요청이 들어오면, controller의 getBoard 함수를 호출
// getBoard 함수는 models의 Board 테이블에서 모든 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 전체를 조회
router.get("/", controller.getBoard);

// GET /study/write => localhost:PORT/study/write
// study 라우트에 대한 요청이 들어오면, controller의 writeArticle 함수를 호출
// writeArticle 함수는 write.ejs를 렌더링
router.get("/write", controller.writeArticle);

// POST /study/post => localhost:PORT/study/post
// study 라우트에 대한 요청이 들어오면, controller의 postArticle 함수를 호출
// postArticle 함수는 models의 Board 테이블에 데이터를 추가
// 추가한 후, res.redirect()로 /study 라우트로 이동
router.post("/post", controller.postArticle);

// GET /study/:id => localhost:PORT/study/1
// study 라우트에 대한 요청이 들어오면, controller의 getArticleById 함수를 호출
// getArticleById 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 하나를 조회해서 보여줌
router.get("/:id", controller.getArticleById);

// GET /study/edit/:id => localhost:PORT/study/edit/1
// study 라우트에 대한 요청이 들어오면, controller의 editArticle 함수를 호출
// editArticle 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 조회한 후,
// res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 input에 기본값으로 설정
router.get("/edit/:id", controller.editArticle);

// PATCH /study/edit/:id => localhost:PORT/study/edit/1
// study 라우트에 대한 요청이 들어오면, controller의 doEdit 함수를 호출
// doEdit 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 수정
// 수정한 후, res.redirect()로 /study 라우트로 이동
router.patch("/edit/:id", controller.doEdit);

// DELETE /study/delete/:id => localhost:PORT/study/delete/1
// study 라우트에 대한 요청이 들어오면, controller의 deleteArticle 함수를 호출
// deleteArticle 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 삭제
// 삭제한 후, res.redirect()로 /study 라우트로 이동
router.delete("/delete/:id", controller.deleteArticle);

// GET /study/search => localhost:PORT/study/search
// study 라우트에 대한 요청이 들어오면, controller의 searchArticle 함수를 호출
// searchArticle 함수는 models의 Board 테이블에서 title, description에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 해당 조건에 부합하는 게시글을 조회
router.get("/search/:keyword", controller.searchArticle);

// GET /study/category/:id => localhost:PORT/study/category/1
// study 라우트에 대한 요청이 들어오면, controller의 getBoardByCategory 함수를 호출
router.get("/category/:id", controller.getBoardByCategory);

// GET /study/category/:id/search/:keyword => localhost:PORT/study/category/1/search/keyword
// study 라우트에 대한 요청이 들어오면, controller의 searchArticleByCategory 함수를 호출
router.get("/category/:id/search/:keyword", controller.searchArticleByCategory);

module.exports = router;
