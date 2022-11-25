const models = require("../models/chatindex"); // ../models/index.js

// part_id가져오기
exports.getPartid = (req, res) => {
  console.log(req.query);
  // SELECT *FROM chat_participants WHERE room_id=${req.query.roomId}
  // and user_index =${req.query.id}
  models.Sign.findOne({
    where: {
      roomId: req.query.roomId,
      id: req.query.id,
    },
  }).then((result) => {
    console.log("findOne >> ", result);
    res.send(result);
  });
};

// 참가자테이블값생성(chat_participants)
// INSERT INTO chat_participants (room_id, user_index, pub_status, createdAt) VALUES ('1', '1', '1', '20221122');

exports.postPart = (req, res) => {
  models.Part.create({
    roomId: req.body.roomId,
    userIndex: req.body.userIndex,
    pubStatus: req.body.pubStatus,
  }).then((result) => {
    console.log("postPart create >> ", result);
    res.send(result);
  });
};
