const models = require('../models');

exports.board = (req, res) => {
    res.render('board');
};

// GET /board : 게시글 전체 조회 
exports.getBoard = (req, res) => {
    models.Board.findAll().then((result) => {
        console.log('board controller: \nfindAll >> ' + result); // [ {}, {}, {}, {} ]
        res.render('board', { data: result });
    }).catch((err) => {
        console.log('board controller: ' + err);
    });
};

// GET /board/get : 게시글 하나 조회
exports.getArticle = (req, res) => {
    console.log('requested id: ' + req.params.id);
    models.Board.findOne({
        where: { board_id: req.query.board_id }
    }).then((result) => {
        console.log('board controller: \nfindOne >> ' + result); // {}
        res.send(result);
    }).catch((err) => {
        console.log('board controller: ' + err);
    });
};

// POST /board/write : 게시글 하나 추가
exports.postArticle = (req, res) => {
    console.log('postArticle: ' + req.body);
    models.Board.create({
        title: data.title, // 폼에 입력한 title
        parity: data.parity, // 폼에서 선택한 parity
        member_num: data.member_num, // 폼에 입력한 member_num
        description: data.description, // 폼에 입력한 description
        created_dt: data.created_dt, // 게시물 생성일자
        expr_dt: data.expr_dt, // 게시물 만료일자
        start_dt: data.start_dt, // 모집 시작일자
        end_dt: data.end_dt, // 모집 종료일자
        appo_time: data.appo_time, // 스터디 진행 약속 시간
        appo_aria: data.appo_aria // 스터디 진행 약속 장소
    }).then((result) => {
        console.log('board controller: \ncreate >> ' + result); // {}
        res.send(result);
    }).catch((err) => {
        console.log('board controller: ' + err);
    });
};

// PATCH /board/edit : 게시글 하나 수정
exports.editArticle = (req, res) => {
    console.log('editArticle: ' + req.body);
    models.Board.update({
        title: data.title, // 폼에 입력한 title
        parity: data.parity, // 폼에서 선택한 parity
        member_num: data.member_num, // 폼에 입력한 member_num
        description: data.description, // 폼에 입력한 description
        created_dt: data.created_dt, // 게시물 생성일자
        expr_dt: data.expr_dt, // 게시물 만료일자
        start_dt: data.start_dt, // 모집 시작일자
        end_dt: data.end_dt, // 모집 종료일자
        appo_time: data.appo_time, // 스터디 진행 약속 시간
        appo_aria: data.appo_aria // 스터디 진행 약속 장소
    }, {
        where: { board_id: req.query.board_id }
    }).then((result) => {
        console.log('board controller: \nupdate >> ' + result); // {}
        res.send('수정사항이 저장되었습니다.');
    }).catch((err) => {
        console.log('board controller: ' + err);
    });
};

// DELETE /board/delete : 게시글 하나 삭제
exports.deleteArticle = (req, res) => {
    models.Board.destroy({
        where: { board_id: req.query.board_id }
    }).then((result) => {
        console.log('board controller: \ndestroy >> ' + result); // {}
        res.send('게시글이 삭제되었습니다.');
    }).catch((err) => {
        console.log('board controller: ' + err);
    });
};