const express = require("express");
const app = express();
// socket은 express가 아닌 http 모듈에 연결해야 사용 가능
// const http = require("http").Server(app);
// const io = require("socket.io")(http); // http-socket 연결
const PORT = 8500;

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use("/static/css", express.static(__dirname + "/static/css"));
app.use("/static/js", express.static(__dirname + "/static/js"));
app.use("/static/img", express.static(__dirname + "/static/img"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// app.get('/', (req, res) => {
//     res.render('index');
// });

// [라우터 분리]
const indexRouter = require("./routes"); // index는 생략 가능!
app.use("/", indexRouter); // localhost:PORT/ 경로를 기본으로 ./routes/index.js 파일에 선언한 대로 동작

// TODO: 404 에러 처리 아직은 안함
// app.get("*", (req, res) => {
//   res.render("404");
// });

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
