const models = require("../models/index"); // ../models/index.js

// part_id가져오기
exports.getpartid = (req, res) => {
  console.log(req.query);
  // SELECT *FROM chat_participants WHERE room_id=${req.query.roomId}
  // and user_index =${req.query.id}
  models.Part.findOne({
    where: {
      room_id: req.query.roomId,
      user_index: req.query.id,
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
    room_id: req.body.roomId,
    user_index: req.body.userIndex,
    pub_status: req.body.pubStatus,
  }).then((result) => {
    console.log("postPart create >> ", result);
    res.send(result);
  });
};
