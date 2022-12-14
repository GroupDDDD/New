const { getLineAndCharacterOfPosition } = require("typescript");
const models = require("../models/index"); // ../models/index.js

// 채팅창 내용조회
exports.getChatcont = (req, res) => {
  console.log("getChatcont", req.query);
  const query = `SELECT *  
    FROM chat_contents AS c
    
    JOIN chat_participants AS p
    ON c.part_id = p.part_id
    
    JOIN user AS u
    ON p.user_index = u.user_index
  
    WHERE (p.room_id = ${req.query.roomId}
    and p.user_index =${req.query.pubId}) or (p.room_id = ${req.query.roomId}
    and p.user_index =${req.query.thisId})
    ORDER BY c.createdAt asc;`;
  models.sequelize
    .query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then((result) => {
      // * Chrome 브라우저의 경우, JSONVue 확장프로그램 설치시 데이터 출력 결과를 가독성있게 볼 수 있음
      // https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc

      res.render("chat", {
        data: result,
        pubId: req.query.pubId,
        partId: req.query.partId,
        roomId: req.query.roomId,
        thisId: req.query.thisId,
        user: req.session.user.user_id,
        isLogin: req.session.user.isLogin,
      });
    });
};
// 채팅내용 DB저장 chat_contents테이블
// INSERT INTO chat_contents (part_id, message, createdAt, updatedAt) VALUES ('2', '스터디참가하고싶습니다.', '20221122', '20221122');
exports.postChatcont = (req, res) => {
  models.Chatcont.create({
    part_id: req.body.partId,
    message: req.body.message,
  }).then((result) => {
    console.log("create >> ", result);
    res.send(result);
  });
};
