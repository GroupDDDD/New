const models = require('../models/index_board');

exports.board = (req, res) => {
    res.render('board');
};

// GET /board : 게시글 전체 조회 
// findAll() : 모든 데이터를 조회
// findAll을 통해 얻어진 결과는 배열로 반환
// 배열의 각 요소는 객체로 구성
// 배열의 각 요소는 테이블의 한 행을 나타냄
exports.getBoard = (req, res) => {
    models.TBoard.findAll().then((result) => {
        console.dir('board controller: findAll >> ', result); // [ {}, {}, {}, {} ]
        // findAll() 결과를 routes/board.js에 전달
        res.send(result);
    }).catch((err) => {
        console.dir('board controller: ' + err);
    });
};

// GET /board/get : 게시글 하나 조회
exports.getArticleById = (req, res) => {
    let id = req.params.id;
    models.TBoard.findOne({
        where: { id: id }
    }).then((result) => {
        console.dir('board controller: \nfindOne >> ', result); // { }
        res.send(result);
    }).catch((err) => {
        console.dir('board controller: ' + err);
    });
};

// GET /board/write : 게시글 작성 페이지
exports.writeArticle = (req, res) => {
    res.render('write');
};

// POST /board/post : 게시글 하나 추가
exports.postArticle = (req, res) => {
    console.dir('postArticle: ', req.body);
    const data = req.body;
    models.TBoard.create({
        title: data.title, // 폼에 입력한 title
        parity: data.parity, // 폼에서 선택한 parity
        member_number: data.member_number, // 폼에 입력한 member_num
        description: data.description, // 폼에 입력한 description
        expr_dt: data.expr_dt, // 게시물 만료일자
        start_dt: data.start_dt, // 모집 시작일자
        end_dt: data.end_dt, // 모집 종료일자
        // appo_time: data.appo_time, // 스터디 진행 약속 시간
        // appo_aria: data.appo_aria // 스터디 진행 약속 장소
    }).then((result) => {
        console.dir('board controller: \ncreate >> ', result); // {}
        res.send(result);
    }).catch((err) => {
        console.dir('board controller: ', err);
    });
};

// PATCH /board/edit : 게시글 하나 수정
exports.editArticle = (req, res) => {
    console.dir('editArticle: ', req.body);
    models.TBoard.update({
        title: data.title, // 폼에 입력한 title
        parity: data.parity, // 폼에서 선택한 parity
        member_num: data.member_num, // 폼에 입력한 member_num
        description: data.description, // 폼에 입력한 description
        created_dt: data.created_dt, // 게시물 생성일자
        expr_dt: data.expr_dt, // 게시물 만료일자
        start_dt: data.start_dt, // 모집 시작일자
        end_dt: data.end_dt, // 모집 종료일자
        // appo_time: data.appo_time, // 스터디 진행 약속 시간
        // appo_aria: data.appo_aria // 스터디 진행 약속 장소
    }, {
        where: { article_id: req.query.article_id }
    }).then((result) => {
        console.dir('board controller: \nupdate >> ', result); // {}
        res.send('수정사항이 저장되었습니다.');
    }).catch((err) => {
        console.dir('board controller: ', err);
    });
};

// GET /board/edit/:id : 게시글 수정 페이지
exports.editArticlePage = (req, res) => {
    let id = req.params.id;
    models.TBoard.findOne({
        where: { id: id }
    }).then((result) => {
        console.dir('board controller: \nfindOne >> ', result); // { }
        res.render('edit', { data: result });
    }).catch((err) => {
        console.dir('board controller: ' + err);
    });
};

// GET /board/search : 게시글 검색

// DELETE /board/delete : 게시글 하나 삭제
exports.deleteArticle = (req, res) => {
    models.TBoard.destroy({
        where: { article_id: req.query.article_id }
    }).then((result) => {
        console.dir('board controller: \ndestroy >> ' + result); // {}
        res.send('게시글이 삭제되었습니다.');
    }).catch((err) => {
        console.dir('board controller: ', err);
    });
};