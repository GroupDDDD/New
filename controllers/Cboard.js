const models = require('../models/index');
// const view = require('../views/study.ejs');
// const articleList = document.querySelector(".article-list");
let lineCount = 0;

// getArticles 내에서 실행되는 하위 함수
// 받아온 데이터를 html에 삽입
// function getArticleList() {
//     fetch("/study")
//         .then((res) => res.json())
//         .then((boards) => {
//             boards.forEach((board) => {
//                 // articleList에 article을 추가
//                 // 각 article에는 title, category_id, member_num, expr_dt 정보가 보여짐
//                 // 각 article에는 클릭 이벤트가 추가되어 있음
//                 // 클릭 이벤트가 발생하면 getArticle() 함수가 실행되고, 선택된 article의 id를 가져옴
//                 // div.line-n은 한 줄을 의미하며, 한 줄에는 3개의 article이 들어감
//                 // articleList에 article을 추가할 때마다 lineCount를 1씩 증가시킴
//                 // lineCount가 3이 되면 lineCount를 0으로 초기화하고, articleList에 div.line-n을 추가함
//                 const article = document.createElement("div");
//                 article.className = "article";
//                 article.innerHTML = `
//                 <div class="card" id="card1">
//                 <div class="card-deadline">
//                     <span class="article__info__item__title">모집기간</span>
//                     <span class="article__info__item__content">${board.expr_dt}</span>
//                 </div>
//                 <div class="card-title">
//                     <a href="/study/${board.id}">${board.title}</a>
//                 </div>
//                 <div class="card-badge">배지</div>
//             <div class="card-id">작성자 id</div>
//         </div>
//         `;
//                 articleList.appendChild(article);
//                 lineCount++;
//                 if (lineCount === 3) {
//                     lineCount = 0;
//                     const line = document.createElement("div");
//                     line.className = "line";
//                     articleList.appendChild(line);
//                 }
//             });
//         });
// }

exports.getBoard = (req, res) => {
    res.render("study");
};


// GET /study : 게시글 전체 조회 (페이징)
// getBoard 함수는 models의 Board 테이블에서 모든 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 전체를 조회
// 페이징 처리를 위해 limit와 offset을 사용
// limit는 한 페이지에 보여줄 게시글의 수, offset은 페이지 번호에 따라 보여줄 게시글의 시작 위치
// user(Sign.js) table의 user_index를 FK로 가지고 있음
// user table의 user_index를 통해 user table의 user_id를 조회
// 이 때, user table의 user_id를 조회하기 위해 include를 사용
// 이 값을 study.ejs에서 사용하기 위해 board.user.user_id로 접근
// Path: New/controllers/Cboard.js
// exports.getArticles = function(req, res) {
//     const limit = 9;
//     const offset = 0;
//     models.Board.findAndCountAll({
//         limit: limit,
//         offset: offset,
//         include: [{
//             model: models.User,
//             attributes: ['user_id']
//         }]
//     }).then(function(articles) {
//         let page = parseInt(req.query.page); // 페이지
//         if (!page) {
//             page = 1;
//         }
//         let pages = Math.ceil(data.count / limit);
//         res.render('study', {
//             articles: articles
//         });
//     }).then(function() {
//         getArticleList();
//     });
// };

// GET /study/:id : 게시글 하나 조회
// getArticleById 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 하나를 조회해서 보여줌
exports.getArticleById = (req, res) => {
    console.dir('getArticleById: ', req.body);
    models.Board.findOne({
        where: {
            article_id: req.params.article_id
        }
    }).then((board) => {
        res.render('article', {
            board: board
        });
    });
};

// GET /study/write : 게시글 작성 페이지
// writeArticle 함수는 write.ejs를 렌더링
// 로그인이 되지 않았으면 로그인 페이지로 이동
exports.writeArticle = (req, res) => {
    console.dir('writeArticle: ', req.body);
    res.render('write');
    // if (req.session.user) {
    //     res.render('write');
    // } else {
    //     res.redirect('/login');
    // };
};

// POST /study/post : 게시글 하나 추가
// postArticle 함수는 models의 Board 테이블에 데이터를 추가
// 추가한 후, res.redirect()로 /study 라우트로 이동
exports.postArticle = (req, res) => {
    console.dir('postArticle: ', req.body);
    models.Board.create({
        title: req.body.title,
        parity: req.body.parity,
        member_num: req.body.member_num,
        description: req.body.description,
        expr_dt: req.body.expr_dt,
        start_dt: req.body.start_dt,
        end_dt: req.body.end_dt,
        appo_time: req.body.appo_time,
        appo_place: req.body.appo_place
    }).then(() => {
        res.redirect('/study');
    });
};

// POST /study/category : 카테고리 추가
// postCategory 함수는 models의 SCategory 테이블에 데이터를 추가
// Scategory 테이블은 해당 게시글의 id와 선택된 카테고리의 id를 저장
// 추가한 후, res.redirect()로 /study/write 라우트로 이동


// GET /study/edit/:id : 수정할 게시물 input페이지
// editArticle 함수는 먼저 요청이 들어온 id를 참조하여 edit.ejs를 렌더링
// res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 input에 기본값으로 설정
exports.editArticle = (req, res) => {
    console.dir('editArticle: ', req.body);
    models.Board.findOne({
        where: {
            article_id: req.params.article_id
        }
    }).then((board) => {
        res.render('edit', {
            board: board
        });
    });
};

// PATCH /study/edit/: : 게시글 수정
exports.doEdit = (req, res) => {
    console.dir('doEdit: ', req.body);
    models.Board.update({
        title: req.body.title,
        parity: req.body.parity,
        member_num: req.body.member_num,
        description: req.body.description,
        expr_dt: req.body.expr_dt,
        start_dt: req.body.start_dt,
        end_dt: req.body.end_dt,
        appo_time: req.body.appo_time,
        appo_place: req.body.appo_place
    }, {
        where: {
            article_id: req.params.article_id
        }
    }).then(() => {
        res.redirect('/study');
    });
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
// 작성자가 아닌 경우, res.send()로 '작성자만 삭제할 수 있습니다.'를 전달
// 삭제한 후, res.redirect()로 /study 라우트로 이동
exports.deleteArticle = (req, res) => {
    console.log('board controller: \ndestroy >> ', req.body);
    if (req.session.user) {
        models.Board.destroy({
            where: {
                article_id: req.body.article_id
            }
        }).then(() => {
            res.redirect('/study');
        });
    } else {
        res.send('작성자만 삭제할 수 있습니다.');
    };
};