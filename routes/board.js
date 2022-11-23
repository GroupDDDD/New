// TODO: 라우트 설정
const express = require('express');
const controllerB = require('../controllers/Cboard');
const controllerM = require('../../study_group/controllers/Cmain');
const router = express.Router();

// GET / => localhost:PORT/
router.get('/', controllerM.main);

// *** 스터디 모집글 게시판 관련 기능 ***

// GET /board => localhost:PORT/board
router.get('/board', async(req, res) => {
    // controllers/Cboard에서 sequelize.findAll()로 반환된 데이터를 board.ejs에 전달
    const result = await controllerB.getBoard(req, res);
    res.render('board', { result });
}); // 전체 조회

// GET /board/get + id => localhost:PORT/board/get + id
router.get('/board/get/id', function(req, res, next) {
    let id = req.params.id;
    controllerB.getArticleById(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send
        } else {
            res.render('article', { data: result });
        }
    });
}); // 하나 조회

// GET /board/write => localhost:PORT/board/write
router.get('/board/write', controllerB.writeArticle); // 게시글 작성 페이지: done

// POST /board/write => localhost:PORT/board/write
router.post('/board/post', controllerB.postArticle); // 하나 추가: done

// GET /board/edit => localhost:PORT/board/edit
router.get('/board/edit/id', function(req, res, next) {
    let id = req.params.id;
    controllerB.editArticlePage(id, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send
        } else {
            res.render('edit', { data: result });
        }
    });
}); // 하나 수정

// PATCH /board/edit => localhost:PORT/board/edit
router.patch('/board/edit', controllerB.editArticle); // 하나 수정

// DELETE /board/delete => localhost:PORT/board/delete
router.delete('/board/delete', controllerB.deleteArticle); // 하나 삭제


module.exports = router;