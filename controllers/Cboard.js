const models = require("../models/index");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;
const operatorsAliases = {
  $eq: Op.eq,
  $or: Op.or,
  $like: Op.like,
};

// GET /study : 게시글 전체 조회 (페이징)
// getBoard 함수는 models의 Board 테이블에서 모든 데이터를 조회
// user_index를 참조하여 Sign 테이블에서 user_id를 조회
// category_id를 참조하여 Category 테이블에서 category_img와 category_name을 조회
// res.render()로 렌더와 동시에 전달받은 데이터를 view에 전달
exports.getBoard = (req, res) => {
  models.Board.findAll({
    include: [
      {
        model: models.Sign,
        attributes: ["user_id"],
        required: true,
      },
      {
        model: models.Category,
        attributes: ["category_img", "category_name"],
        required: true,
      },
    ],
  })
    .then((result) => {
      res.render("study", {
        data: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET /study/:id : 게시글 하나 조회
// getArticleById 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 게시글 하나를 조회해서 보여줌
// user_id를 통해 Sign 테이블에서 user_index를 조회
exports.getArticleById = (req, res) => {
  console.dir("getArticleById: ", req.body);
  models.Board.findOne({
    where: {
      article_id: req.params.id,
    },
    include: [
      {
        model: models.Sign,
        attributes: ["user_id"],
      },
      {
        model: models.Category,
        attributes: ["category_img", "category_name"],
      },
    ],
  })
    .then((result) => {
      res.render("article", {
        article: result,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET /study/write : 게시글 작성 페이지
// writeArticle 함수는 write.ejs를 렌더링
// 로그인이 되지 않았으면 로그인 페이지로 이동
exports.writeArticle = (req, res) => {
  console.dir("writeArticle: ", req.body);
  res.render("write");
  // if (req.session.user) {
  //     res.render('write');
  // } else {
  //     res.redirect('/login');
  // };
};

// POST /study/post : 게시글 하나 추가
// postArticle 함수는 models의 Board 테이블에 데이터를 추가
// 추가한 데이터의 article_id를 통해 SCategory 테이블에 데이터를 추가
// 추가한 후, 방금 생성한 게시글의 id를 따와 /study/:id 라우트로 이동
exports.postArticle = (req, res) => {
  console.dir("postArticle: ", req.body);
  const user_index = result.session.user_index;
  console.log("user_index", user_index);
  models.Board.create({
    user_index: user_index, // 임시
    title: req.body.title,
    category_id: req.body.category_id,
    parity: req.body.parity,
    member_num: req.body.member_num,
    description: req.body.description,
    expr_dt: req.body.expr_dt,
    start_dt: req.body.start_dt,
    end_dt: req.body.end_dt,
    appo_area: req.body.appo_area,
  })
    .then((result) => {
      res.redirect("/study/" + result.article_id);
    })
    .catch((err) => {
      console.log(err);
    });
};

// GET /study/edit/:id : 수정할 게시물 input페이지
// editArticle 함수는 먼저 요청이 들어온 id를 참조하여 edit.ejs를 렌더링
// res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 input에 기본값으로 설정
exports.editArticle = (req, res) => {
  console.dir("editArticle: ", req.body);
  models.Board.findOne({
    where: {
      article_id: req.params.id,
    },
  }).then((article) => {
    res.render("edit", {
      article: article,
    });
  });
};

// PATCH /study/edit/: : 게시글 수정
exports.doEdit = (req, res) => {
  console.dir("doEdit: ", req.body);
  models.Board.update(
    {
      title: req.body.title,
      category_id: req.body.category_id,
      parity: req.body.parity,
      member_num: req.body.member_num,
      description: req.body.description,
      expr_dt: req.body.expr_dt,
      start_dt: req.body.start_dt,
      end_dt: req.body.end_dt,
      appo_area: req.body.appo_area,
    },
    {
      where: {
        article_id: req.params.id,
      },
    }
  ).then(() => {
    res.redirect("/study/" + req.params.id);
  });
};

// GET /study/:keyword : 게시글 검색
// searchArticle 함수는 models의 Board 테이블에서 title, description에 해당하는 데이터를 조회한 후, res.send()로 전달받은 데이터를 view에 전달
// view에서는 전달받은 데이터를 통해 해당 조건에 부합하는 게시글을 조회
// Op.
exports.searchArticle = (req, res) => {
  console.dir("searchArticle: ", req.body);
  models.Board.findAll({
    where: {
      [Op.or]: [
        {
          title: {
            [Op.like]: "%" + req.params.keyword + "%",
          },
        },
        {
          description: {
            [Op.like]: "%" + req.params.keyword + "%",
          },
        },
        {
          appo_area: {
            [Op.like]: "%" + req.params.keyword + "%",
          },
        },
      ],
    },
    include: [
      {
        model: models.Sign,
        attributes: ["user_id"],
      },
      {
        model: models.Category,
        attributes: ["category_name", "category_img"],
      },
    ],
  }).then((articles) => {
    res.render("search", {
      data: articles,
      keyword: req.params.keyword,
    });
  });
};

// DELETE /board/delete : 게시글 하나 삭제
// deleteArticle 함수는 models의 Board 테이블에서 id에 해당하는 데이터를 삭제
// 작성자가 아닌 경우, res.send()로 '작성자만 삭제할 수 있습니다.'를 전달
// 삭제한 후, res.redirect()로 /study 라우트로 이동
exports.deleteArticle = (req, res) => {
  console.dir("deleteArticle: ", req.body);
  models.Board.findOne({
    where: {
      article_id: req.params.id,
    },
  }).then((article) => {
    if (article.user_id === req.user.user_id) {
      models.Board.destroy({
        where: {
          article_id: req.params.id,
        },
      }).then(() => {
        res.redirect("/study");
      });
    } else {
      res.send("작성자만 삭제할 수 있습니다.");
    }
  });
};
