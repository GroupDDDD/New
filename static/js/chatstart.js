// 게시글 상세페이지에서 게시자인지 아닌지 값 받아오기
let publisherOrnot;
let roomExistsOrnot;
let roomId;
let partId;
// div에 나타나도록
const roomResult = document.querySelector(".room-result");
roomResult.textContent = `채팅방존재여부: ${roomExistsOrnot}`;
const publisherResult = document.querySelector(".publisher-result");
publisherResult.textContent = `게시자여부: ${publisherOrnot}`;
// 로그인 아이디 확인용 div class login-result
const loginResult = document.querySelector(".login-result");
let socket = io.connect(); // socket 사용을 위한 객체 생성
// let myId;
// let myNick; // 내 닉네임 설정
async function chatStart(id, articleId, pubId, publisherOrnot) {
  // 로그인한 사용자가 게시아인지 아닌지 값 가져오기
  publisherOrnot = publisherOrnot;
  console.log("chatStart!!!");
  console.log(id, articleId, pubId); //로그인 id(pk), room_id값, 게시자 아이디값
  // 게시자용 채팅방존재여부조회
  if (publisherOrnot === true) {
    let result = await axios({
      method: "GET",
      url: `/chat/pubroom?articleId=${articleId}&id=${id}`,
    }).then((res) => {
      console.log("5.room있는지 조회: ", res.data);
      return res.data;
    });
    console.log("'게시자용 채팅방 조회 결과: ", result);
    loginResult.textContent = `채팅방개수: ${result.length}`;
    // 채팅방존재여부값에 true
    if (result.data.length > 0) {
      roomExistsOrnot = true;
    } else {
      // 아무일도 일어나지 않음...alert창 추가..
      roomExistsOrnot = false;
      alert("개설된 채팅방이 없습니다.");
    }
    console.log("'게시자용 채팅방 조회 결과: ", roomExistsOrnot);
  }
  // 채팅신청자용 채팅방존재여부조회
  // 게시자용과 채팅신청자용 채팅방 존재여부 조회 쿼리가 다름
  if (publisherOrnot === false) {
    let result = await axios({
      method: "GET",
      url: `/chat/conroom?articleId=${articleId}&id=${id}`,
    }).then((res) => {
      console.log("2chatroom: ", res.data);
      return res.data;
    });
    // 채팅방존재여부값에 true
    if (result.data.length > 0) {
      roomExistsOrnot = true;
      // 채팅룸아이디가져오기
      roomId = result.data[0].room_id;
      console.log("result(true", roomId);
    } else {
      roomExistsOrnot = false;
    }
  }
  console.log("채팅신청자용 채팅방존재여부조회room존재여부:", roomExistsOrnot);
  // 게시자이고 채팅방 존재하면 채팅방리스트 조회페이지로 이동
  if (publisherOrnot === true && roomExistsOrnot === true) {
    window.location.href = `/chat/getChatlistpage?id=${id}`;
  }
  // 게시자가 아니고 채팅방 존재하면 채팅창페이지로 이동
  else if (publisherOrnot === false && roomExistsOrnot === true) {
    // socket.emit("setNick", result.user_name);//소켓에 전달해야...나중에
    console.log("게시자가 아니고 채팅방 존재", roomId, pubId, id);
    // part_id조회
    let result3 = await axios({
      method: "GET",
      url: `/part/getpartid?roomId=${roomId}&id=${id}`,
    }).then((res) => {
      console.log("3partid조회: ", res.data);
      return res.data;
    });
    console.log("'2 part 조회 결과: ", result3);
    loginResult.textContent = `part_id값: ${result3.part_id}`;
    // partid값 넣기
    partId = result3.part_id;
    console.log("'3 part 입력 결과: ", partId);
    window.location.href = `/chatcont/getChatcont?roomId=${roomId}&pubId=${pubId}&thisId=${id}&partId=${partId}`;
  }
  // 게시자가 아니고 채팅방 없으면
  // 1: 채팅방테이블값생성(chat_room) 후
  // 2: 채팅방정보조회 후
  // 3: 참가자테이블값생성(chat_participants) 후 채팅창페이지로 이동
  if (publisherOrnot === false && roomExistsOrnot === false) {
    // 채팅방 테이블 chat_room insert
    // chatKind('1'): 채팅방종류 일단 1:1만
    let result5 = await axios({
      method: "POST",
      url: "/chat/postChat",
      data: {
        articleId: articleId,
        contactorId: id,
        chatKind: "1",
      },
    });
    console.log("8생성된 채팅방번호 채팅방조회", result5.data.room_id);
    roomId = result5.data.room_id;
    // 2-1: 참가자테이블값생성(chat_participants)
    // pubStatus: 게시자여부(비게시자)
    axios({
      method: "POST",
      url: "/part/postPart",
      data: {
        roomId: roomId,
        userIndex: id,
        pubStatus: "2",
      },
    });
    // 2-2: 참가자테이블값생성(chat_participants)
    // 게시자 아이디 insert
    // pubStatus: 게시자여부(비게시자)
    axios({
      method: "POST",
      url: "/part/postPart",
      data: {
        roomId: roomId,
        userIndex: pubId,
        pubStatus: "1",
      },
    });
    // partid값 넣기(조회안됨...임시값'0')
    partId = "0";
    console.log("6: part 조회 결과", partId);
    // 채팅창페이지로 이동
    window.location.href = `/chatcont/getChatcont?roomId=${roomId}&pubId=${pubId}&thisId=${id}&partId=${partId}`;
  }
}
