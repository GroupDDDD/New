// TODO: 컨트롤러 코드
// Path: study_group/controllers/Cmain.js

exports.main = (req, res) => {
    res.render("main");
  };
  
exports.main2 = (req, res) => {
  const user = req.session.user;
  console.log('req.session.user >> ', user);

  if(req.session.user !== undefined){
    console.log("&&&&&&&&&&&&&&&&&&&&&&&!");
    console.log('!= 일때, req.session.user>> ', req.session.user);
    res.render('main2', {isLogin: true, user: req.session.user});
  }else{
    //세션 값이 없으면
    res.render('main2', {isLogin: false});
  }
    // res.render('main2');
  }
  
  exports.index = (req, res) => {
    res.render('index');
}

  exports.study = (req, res) => {
    res.render("study");
  };
  
  exports.login = (req, res) => {
    res.render("login");
  };
  
  exports.chat = (req, res) => {
    res.render("chat");
  };
  

