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
// const nickArray = {}; // 유저 목록

// // [실습46] DM 기능 구현
// // 유저 목록 업데이트 (유저 입장, 퇴장)
// function updateList() {
//   io.emit("updateNicks", nickArray); // { socket.id: nick1, socket.id: nick2, ... }
// }

// io.on()
// : socket과 관련된 통신작업을 처리
// io.on("connection", (socket) => {
//   // "connection" event
//   // : 클라이언트가 접속했을 때 발생, 콜백으로 socket 객체를 제공!

//   console.log("**** ⭕ Server Socket Connected >> ", socket.id);
//   // socket.id: 소켓 고유 아이디 -> socket은 웹 페이지 별로 생김!!

//   // [실습44] 채팅창 입장 안내 문구
//   // io.emit('notice', `${socket.id.slice(0, 5)}님이 입장하셨습니다.`);

//   // [실습44-2] 채팅창 입장 안내 문구 socket.id -> nickname
//   socket.on("setNick", (nick) => {
//     // 프론트에서 입력한 닉네임 값
//     console.log("socket on setNick >> ", nick);

// nickArray: { socketId1: nick1, socketId2: nick2, ... }
// -> Object.values(): [ nick1, nick2, nick2, ... ]
// -> indexOf(): nick 이 존재하는지
// 힌트: method1().method2().method3()
// if (Object.values(nickArray).indexOf(nick) > -1) {
//   // 닉네임 중복이 있다면
//   socket.emit("error", "이미 존재하는 닉네임입니다. 다시 시도해주세요.");
// } else {
// 닉네임 중복이 없다면
//   nickArray[socket.id] = nick; // { socket.id: nick }
//   console.log("접속 유저 목록 >> ", nickArray);
//   io.emit("notice", `${nick}님이 입장하셨습니다.`);
//   socket.emit("entrySuccess", nick);
//   updateList(); // 유저목록 업데이트
// // }
// });

// [실습44-3] 접속자 퇴장시
// "notice" 이벤트로 퇴장 공지
// socket.on("disconnect", () => {
//   // 1. socket.id 콘솔로그 찍기
//   console.log("**** ❌ Server Socket Disconnect >> ", socket.id);
//   // 2. 전체 공지 ('notice' , 퇴장메세지(유저 닉네임포함해서))
//   io.emit("notice", `${nickArray[socket.id]}님이 퇴장하셨습니다.`);
//   //  ex. aa님이 퇴장하셨습니다.
//   // 3. nickArray에서 해당 유저 삭제 (객체에서 key-value 쌍 삭제)
//   // delete 연산자 활용
//   // delete nickArray[socket.id];

//   // updateList(); // 유저목록 업데이트
// });

//   // [실습45] 채팅창 메세지 전송 Step1
//   socket.on("send", (data) => {
//     console.log("socket on send >> ", data); //  { myNick: 'a', dm: '전체|특정닉네임', msg: 'cc' }
//     console.log(data.dm);
//     //전체: { myNick: '333', dm: 'all', msg: 'fff' }
//     // 특정 id:  { myNick: '333', dm: 'cI9Hazby3VP4SHNtAAAF', msg: 'fff' }
//     if (data.dm !== "all") {
//       // [실습 46] dm 기능
//       let dmSocketId = data.dm; //특정 유저의 socket id
//       const sendData = { nick: data.myNick, msg: data.msg, dm: "(속닥속닥)" };
//       // console.log(socket.id);
//       // 나에게 메시지 전송 시 2번 메시지 전송 부분 수정
//       if (socket.id === data.dm) {
//         io.to(dmSocketId).emit("newMessage", sendData); //특정 아이디에게만 메세지 전송
//       } else {
//         io.to(dmSocketId).emit("newMessage", sendData); //특정 아이디에게만 메세지 전송
//         socket.emit("newMessage", sendData); //자기 자신에게도 DM메세지 전송
//       }
//     } else {
//       // 전체 메세지 전송
//       // data.dm: 특정 유저의 socket id
//       // [실습45] 채팅창 메세지 전송 Step2
//       const sendData = { nick: data.myNick, msg: data.msg };
//       io.emit("newMessage", sendData);
//     }
//   });
// });

// 주의!!!) 소켓을 사용하기 위해서는 http.listen()으로 포트를 열어야 함
http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
