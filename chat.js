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

//소켓 잠깐 주석처리!!!

// // [실습46] DM 기능 구현
// // 유저 목록 업데이트 (유저 입장, 퇴장)
// function updateList() {
// }

// io.on()
// : socket과 관련된 통신작업을 처리
io.on("connection", (socket) => {
  //   // "connection" event
  //   // : 클라이언트가 접속했을 때 발생, 콜백으로 socket 객체를 제공!
  //   console.log("**** ⭕ Server Socket Connected >> ", socket.id);
  //   // socket.id: 소켓 고유 아이디 -> socket은 웹 페이지 별로 생김!!
  //   // [실습44] 채팅창 입장 안내 문구
  //   // io.emit('notice', `${socket.id.slice(0, 5)}님이 입장하셨습니다.`);
  //   // [실습44-2] 채팅창 입장 안내 문구 socket.id -> nickname
  socket.on("setNick", (nick) => {
    //     // 프론트에서 입력한 닉네임 값
    console.log("socket on 유저네임가져오기 >> ", nick);

    io.emit("notice", `${nick}님이 입장하셨습니다.`);
    socket.emit("entrySuccess", nick);
    // updateList(); // 유저목록 업데이트
    // [실습44-3] 접속자 퇴장시
    // "notice" 이벤트로 퇴장 공지
    // socket.on("disconnect", () => {
    //   // 1. socket.id 콘솔로그 찍기
    //   console.log("**** ❌ Server Socket Disconnect >> ", socket.id);
    //   // 2. 전체 공지 ('notice' , 퇴장메세지(유저 닉네임포함해서))
    //   io.emit("notice", `${ㅌㅌㅌ}님이 퇴장하셨습니다.`);
    //   //  ex. aa님이 퇴장하셨습니다.
    // });
    // [실습45] 채팅창 메세지 전송 Step1
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
