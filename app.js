// modules
const express = require("express");
const path = require("path");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");

// router
const { sequelize } = require("./models/index"); // 시퀄라이즈
const indexRouter = require("./routes/index");
const boardRouter = require("./routes/board");
const signRouter = require("./routes/sign");
const chatRouter = require("./routes/chat");
const chatcontRouter = require("./routes/chatcont");
const partRouter = require("./routes/part");
const passportConfig = require("./passport");

// app
const app = express();

// 패스포트 설정
passportConfig();

// socket
const http = require("http").Server(app);
const io = require("socket.io")(http); // http-socket 연결

// port number setting
app.set("port", process.env.PORT || 8500);
// view engine setting
app.set("view engine", "ejs");
// static file setting
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/static/css", express.static(__dirname + "/static/css"));
app.use("/static/js", express.static(__dirname + "/static/js"));
app.use("/static/img", express.static(__dirname + "/static/img"));
app.use(
  "/static/img/favicon",
  express.static(__dirname + "/static/img/favicon")
);
app.use("/profileImgs", express.static(__dirname + "/profileImgs"));

// 서버 실행시 MYSQL과 연결
sequelize
  .sync({ force: false }) // 서버 실행시마다 테이블을 재생성할건지에 대한 여부
  .then(() => {
    console.log("데이터베이스 연결 성공");
  })
  .catch((err) => {
    console.error(err);
  });
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// passport setting
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 세션을 저장할지에 대한 여부
    secret: process.env.COOKIE_SECRET,
    // secret: "secret",
    store: new session.MemoryStore(),
    cookie: {
      httpOnly: true,
      secure: false,
      maxAge: 600 * 1000,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// router setting
app.use("/", indexRouter);
app.use("/sign", signRouter);
app.use("/study/", boardRouter);
app.use("/chat", chatRouter); // 기본 경로: localhost:PORT/chat
app.use("/chatcont", chatcontRouter); // 기본 경로: localhost:PORT/chatcont
app.use("/part", partRouter); // 기본 경로: localhost:PORT/part

// unidentified router
app.use((req, res, next) => {
  const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
  error.status = 404;
  next(error);
});

//채팅소켓
io.on("connection", (socket) => {
  // 채팅창 입장 안내 문구 socket.id -> nickname
  socket.on("setNick", (nick) => {
    // 프론트에서 입력한 닉네임 값
    console.log("socket on 유저네임가져오기 >> ", nick);

    io.emit("notice", `${nick}님이 입장하셨습니다.`);
    socket.emit("entrySuccess", nick);

    // 채팅창 메세지 전송 Step1
    socket.on("send", (data) => {
      console.log("socket on send >> ", data); //  { myNick: 'a', dm: '전체|특정닉네임', msg: 'cc' }
      console.log(data.myNick);
      //{ myNick: '333', msg: 'fff' }
      // 전체 메세지 전송
      // [실습45] 채팅창 메세지 전송 Step2
      const sendData = { nick: data.myNick, msg: data.msg };
      io.emit("newMessage", sendData);
    });
  });
});

// error handler
app.use((err, req, res, next) => {
  res.locals.message = err.message;
  res.locals.error = process.env.NODE_ENV !== "production" ? err : {};
  res.status(err.status || 500);
  res.render("error");
});

// session 사용을 위해서는 http-socket 연결
http.listen(app.get("port"), () => {
  let p = app.get("port");
  console.log(p, "번 포트에서 대기 중");
  console.log("~~~~~~~~~~~~~~~~~~~~~");
  console.log(`http://localhost:${p}`);
  console.log("~~~~~~~~~~~~~~~~~~~~~");
});
