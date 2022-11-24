// TODO: 컨트롤러 코드
// Path: study_group/controllers/Cmain.js

exports.start = (req, res) => {
  res.render("start");
};

exports.main = (req, res) => {
  res.render("main");
};

exports.main2 = (req, res) => {
  res.render("main2");
};

exports.index = (req, res) => {
  res.render("index");
};

exports.study = (req, res) => {
  res.render("study");
};

exports.login = (req, res) => {
  res.render("login");
};

exports.chat = (req, res) => {
  res.render("chat");
};

exports.frontBoard = (req, res) => {
  res.render("front-board");
};
