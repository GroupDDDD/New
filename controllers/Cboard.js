const models = require('../models/index');

// GET /study : 게시글 전체 조회 (페이징)
// getBoard 함수는 models의 Board 테이블에서 모든 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 전체를 조회
exports.getBoard = (req, res) => {
    res.render('study');
};

// GET /study/:id : 게시글 하나 조회
// getArticleById 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 하나를 조회해서 보여줌
exports.getArticleById = (req, res) => {};

// GET /study/write : 게시글 작성 페이지
// writeArticle 함수는 write.ejs를 렌더링
exports.writeArticle = (req, res) => {
    res.render('write');
};

// POST /study/post : 게시글 하나 추가
// postArticle 함수는 models의 Board 테이블에 데이터를 추가
// 추가한 후, res.redirect()로 /study 라우트로 이동
exports.postArticle = (req, res) => {
    console.dir('postArticle: ', req.body);
};

// GET /study/edit/:id : 수정할 게시물 input페이지
// editArticle 함수는 먼저 요청이 들어온 id를 참조하여 edit.ejs를 렌더링
// res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 input에 기본값으로 설정
exports.editArticle = (req, res) => {
    console.dir('editArticle: ', req.body);
};

// PATCH /study/edit/: : 게시글 수정
exports.doEdit = (req, res) => {
    console.dir('doEdit: ', req.body);
};

// GET /study/search : 게시글 검색
// searchArticle 함수는 models의 Board 테이블에서 title, description에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 해당 조건에 부합하는 게시글을 조회
exports.searchArticle = (req, res) => {
    let keyword = req.query.keyword;
    models.Board.findAll({
        where: {
            [Op.or]: [{
                    title: {
                        [Op.like]: '%' + keyword + '%'
                    }
                },
                {
                    description: {
                        [Op.like]: '%' + keyword + '%'
                    }
                }
            ]
        }
    }).then((result) => {
        console.dir('board controller: \nfindAll >> ', result); // [ {}, {}, {}, {} ]
        res.send(result);
    }).catch((err) => {
        console.dir('board controller: ' + err);
    });
};

// DELETE /board/delete : 게시글 하나 삭제
// deleteArticle 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 삭제
// 삭제한 후, res.redirect()로 /study 라우트로 이동
exports.deleteArticle = (req, res) => {
    console.dir('deleteArticle: ', req.body);

};