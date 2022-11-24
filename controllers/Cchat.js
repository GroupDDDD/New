const models = require("../models/chatindex"); // ../models/index.js

// 채팅방 리스트 페이지 렌더해서 조회
// 게시자일 경우에만 리스트 페이지 조회돼서 pub_status=2인것만 가져옴
exports.getChatlistpage = (req, res) => {
  const query = `SELECT r.room_id, u.prof_img_url, u.user_index, u.user_name, b.title  
  FROM chat_room AS r
  
  JOIN board AS b
  ON r.article_id = b.article_id
  
  JOIN chat_participants AS p
  ON r.room_id = p.room_id

  JOIN user AS u
  ON r.contactor_id = u.user_index
  
  WHERE p.pub_status = '2' 
  and b.user_index =${req.query.id};`;
  models.sequelize
    .query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then((result) => {
      // * Chrome 브라우저의 경우, JSONVue 확장프로그램 설치시 데이터 출력 결과를 가독성있게 볼 수 있음
      // https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc

      res.render("chatlist", { data: result, pubId: req.query.id });
    });
};

// 채팅내용 DB저장 chat_contents테이블
//INSERT INTO chat_room (article_id, contactor_id, chat_kind, createdAt, updatedAt) VALUES ('1', '2', '1', '20221122', '20221122');
exports.postChat = (req, res) => {
  models.Chat.create({
    article_id: req.body.article_id,
    contactor_id: req.body.contactor_id,
    chat_kind: req.body.chat_kind,
  }).then((result) => {
    console.log("Chat create >> ", result);
    res.send(result);
  });
};
