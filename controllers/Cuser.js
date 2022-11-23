const models = require("../models/chatindex"); // ../models/index.js

exports.main = (req, res) => {
  res.render("chatindex");
};
exports.getUsername = (req, res) => {
  console.log(req.query);
  // SELECT *FROM user WHERE user_id=${req.query.userId}
  models.Sign.findOne({
    where: {
      user_index: req.query.id,
    },
  }).then((result) => {
    console.log("findOne >> ", result);
    res.send(result);
  });
};
