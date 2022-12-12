// Path: study_group/controllers/Cmain.js

exports.start = (req, res) => {
  res.render("start");
};

exports.main = (req, res) => {
  const user = req.session.user;

  res.render("main", { user: user.user_id, isLogin: user.isLogin });

  // if (req.session.user !== undefined) {
  //   res.render("main", { isLogin: true, user: req.session.user });
  // } else {
  //   res.render("main", { isLogin: false });
  // }
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
};

exports.mypage = (req, res) => {
  res.render("mypage");
};

// exports.profile = (req, res) => {
//   res.render("profile", {
//     user: req.session.user.user_id,
//     isLogin: req.session.user.isLogin,
//   });
// };
