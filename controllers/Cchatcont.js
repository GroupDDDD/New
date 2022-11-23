const { getLineAndCharacterOfPosition } = require("typescript");
const models = require("../models/chatindex"); // ../models/index.js

// exports.main = (req, res) => {
//   res.render("chatcont");
// };
exports.getChatconst = (req, res) => {
  const query = `SELECT *  
    FROM chat_contents AS c
    
    JOIN chat_participants AS p
    ON c.part_id = p.part_id
    
    JOIN user AS u
    ON p.user_index = u.user_index
  
    WHERE (p.room_id = ${req.query.roomId}
    and p.user_index =${req.query.pubId}) or (p.room_id = ${req.query.roomId}
    and p.user_index =${req.query.thisId})
    ORDER BY c.createdAt desc;`;
  models.sequelize
    .query(query, { type: models.sequelize.QueryTypes.SELECT })
    .then((result) => {
      // * Chrome 브라우저의 경우, JSONVue 확장프로그램 설치시 데이터 출력 결과를 가독성있게 볼 수 있음
      // https://chrome.google.com/webstore/detail/jsonvue/chklaanhfefbnpoihckbnefhakgolnmc

      res.render("chatcont", { data: result });
    });
};

// exports.getChatcont = (req, res) => {
//   // [Before]
//   // console.log(req.query); // { id: '1' }
//   // console.log(req.query.id); // '1'
//   // Visitor.getVisitor(req.query.id, (result) => {
//   //   console.log('Cvisitor.js', result);
//   //   res.send(result);
//   // });

//   // [After]
//   // SELECT room_id FROM chat_room WHERE room_id=${req.query.chatId} and board_id=${req.query.boardId} and contactor_id = ${req.query.contactorId}
//   models.Chat.findOne({
//     where: {
//       room_id: req.query.chatId,
//       board_id: req.query.boardId,
//       contactor_id: req.query.contactorId,
//     },
//   }).then((result) => {
//     console.log("findOne >> ", result);
//     res.send(result);
//   });
// };

// exports.postChatcont = (req, res) => {
//   // [Before]
//   // console.log('postvisitor: ', req.body);
//   // // postvisitor:  { name: '빅파이', comment: '맛있다' }
//   // Visitor.postVisitor(req.body, (result) => {
//   //   console.log('Cvisitor.js', result); // Cvisitor.js 10
//   //   res.send({
//   //     id: result, // pk(id) -> 10
//   //     name: req.body.name, // 폼에 입력한 name
//   //     comment: req.body.comment, // 폼에 입력한 comment
//   //   });
//   // });

//   // [After]
//   // INSERT INTO visitor (name, comment) VALUES('${data.name}', '${data.comment}')
//   // INSERT INTO visitor (name, comment) VALUES('${req.body.name}', '${req.body.comment}')
//   models.Chat.create({
//     room_id: req.body.room_id,
//     board_id: req.body.board_id,
//     contactor_id: req.body.contactor_id,
//     created_dt: req.body.created_dt,
//     chat_kind: req.body.chat_kind,
//   }).then((result) => {
//     console.log("create >> ", result);
//     res.send(result);
//   });
// };

// exports.patchVisitor = (req, res) => {
//   // [Before]
//   // console.log(req.body);

//   // Visitor.patchVisitor(req.body, (result) => {
//   //   console.log('Cvisitor.js:', result);
//   //   res.send('수정 성공!!!');
//   // });

//   // [After]
//   // UPDATE visitor SET name='${data.name}', comment='${data.comment}' WHERE id=${data.id}
//   // UPDATE visitor SET name='${req.body.name}', comment='${req.body.comment}' WHERE id=${req.body.id}
//   models.Visitor.update(
//     {
//       name: req.body.name,
//       comment: req.body.comment,
//     },
//     {
//       where: {
//         id: req.body.id,
//       },
//     }
//   ).then((result) => {
//     console.log("update >> ", result);
//     res.send("수정 성공!!!");
//   });
// };

// exports.deleteVisitor = (req, res) => {
//   // [Before]
//   // console.log(req.body); // { id: '1' }
//   // console.log(req.body.id); // 1

//   // Visitor.deleteVisitor(req.body.id, (result) => {
//   //   console.log('Cvisitor.js: ', result);
//   //   res.send('삭제 성공!!!');
//   // });

//   // [After]
//   // DELETE FROM visitor WHERE id=${id}
//   // DELETE FROM visitor WHERE id=${req.body.id}
//   models.Visitor.destroy({
//     where: { id: req.body.id },
//   }).then((result) => {
//     console.log("destroy >> ", result);
//     res.send("삭제 성공!!!!");
//   });
// };
