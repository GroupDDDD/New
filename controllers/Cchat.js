const models = require("../models/chatindex"); // ../models/index.js

// 채팅방 컨트롤러

// 채팅방 리스트 페이지 렌더
// exports.getChatlistpage = (req, res) => {
//   res.render("chat_list");
// };

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

exports.getChat = (req, res) => {
  // [Before]
  // console.log(req.query); // { id: '1' }
  // console.log(req.query.id); // '1'
  // Visitor.getVisitor(req.query.id, (result) => {
  //   console.log('Cvisitor.js', result);
  //   res.send(result);
  // });

  // [After]
  // SELECT room_id FROM chat_room WHERE room_id=${req.query.chatId} and board_id=${req.query.boardId} and contactor_id = ${req.query.contactorId}
  models.Chat.findOne({
    where: {
      room_id: req.query.chatId,
      board_id: req.query.boardId,
      contactor_id: req.query.contactorId,
    },
  }).then((result) => {
    console.log("findOne >> ", result);
    res.send(result);
  });
};

exports.postChat = (req, res) => {
  // [Before]
  // console.log('postvisitor: ', req.body);
  // // postvisitor:  { name: '빅파이', comment: '맛있다' }
  // Visitor.postVisitor(req.body, (result) => {
  //   console.log('Cvisitor.js', result); // Cvisitor.js 10
  //   res.send({
  //     id: result, // pk(id) -> 10
  //     name: req.body.name, // 폼에 입력한 name
  //     comment: req.body.comment, // 폼에 입력한 comment
  //   });
  // });
  // [After]
  // INSERT INTO visitor (name, comment) VALUES('${data.name}', '${data.comment}')
  // INSERT INTO visitor (name, comment) VALUES('${req.body.name}', '${req.body.comment}')
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
};
