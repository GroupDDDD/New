// TODO: 컨트롤러 코드
// Path: study_group/controllers/Cmain.js

exports.start = (req, res) => {
  res.render("start");
};

exports.main = (req, res) => {
  res.render("main");
};

exports.main2 = (req, res) => {
  const user = req.session.user;
  console.log("req.session.user >> ", user);

  if (req.session.user !== undefined) {
    console.log("&&&&&&&&&&&&&&&&&&&&&&&!");
    console.log("!= 일때, req.session.user>> ", req.session.user);
    res.render("main2", { isLogin: true, user: req.session.user });
  } else {
    //세션 값이 없으면
    res.render("main2", { isLogin: false });
  }
  // res.render('main2');
};

// exports.study = (req, res) => {
//     res.render("study");
// };

exports.login = (req, res) => {
  res.render("login");
};

exports.chat = (req, res) => {
  res.render("chatindex");
};

exports.frontBoard = (req, res) => {
  res.render("front-board");
};

exports.mypage = (req, res) => {
  res.render("mypage");
};

exports.profile = (req, res) => {
  res.render("profile");
};

exports.article = (req, res) => {
  res.render("article");
};

exports.write = (req, res) => {
  res.render("write");
};
