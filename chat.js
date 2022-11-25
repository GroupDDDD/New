const express = require("express");
const app = express();
// socket은 express가 아닌 http 모듈에 연결해야 사용 가능
const http = require("http").Server(app);
const io = require("socket.io")(http); // http-socket 연결
const PORT = 8500;

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// [라우터 분리]
const userRouter = require("./routes/user");
app.use("/", userRouter);

const chatRouter = require("./routes/chat");
app.use("/chat", chatRouter); // 기본 경로: localhost:PORT/chat

const chatcontRouter = require("./routes/chatcont");
app.use("/chatcont", chatcontRouter); // 기본 경로: localhost:PORT/chatcont

const partRouter = require("./routes/part");
app.use("/part", partRouter); // 기본 경로: localhost:PORT/part

//채팅소켓
io.on("connection", (socket) => {
  //   // 채팅창 입장 안내 문구 socket.id -> nickname
  socket.on("setNick", (nick) => {
    //     // 프론트에서 입력한 닉네임 값
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

// 주의!!!) 소켓을 사용하기 위해서는 http.listen()으로 포트를 열어야 함
http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
