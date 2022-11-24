const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
// const path = require('path');
const session = require("express-session");
const dotenv = require("dotenv");
dotenv.config();
const passport = require("passport");
const PORT = 8500;

//라우터 분리
const indexRouter = require("./routes/index");
const signRouter = require("./routes/sign"); //localhost:8000/sign
const { sequelize } = require("./models");
const passportConfig = require("./passport");

const app = express();
passportConfig(); // 패스포트 설정
app.set("view engine", "ejs");

app.use(morgan("dev"));
app.use("/views", express.static(__dirname + "/views"));
app.use("/static", express.static(__dirname + "/static"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
      httpOnly: true,
      secure: false,
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use("/", indexRouter);
app.use("/sign", signRouter);

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});
