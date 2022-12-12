// write.ejs와 edit.ejs에서 사용하는 스크립트
// form의 정보를 검증하는 스크립트

function createError(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

// title: 0<=title.length<=100
// member_num: int 0<=member_num<=30
// expr_dt: expr_dt>=createdAt
// start_dt: start_dt>=createdAt
// end_dt: end_dt>=start_dt
// description: 0<=description.length<=5000
// appo_area: 0<=appo_area.length<=100

function validateArticle(data) {
  const {
    title,
    member_num,
    expr_dt,
    start_dt,
    end_dt,
    description,
    appo_area,
  } = data;
  if (title.length === 0 || title.length > 100) {
    throw createError(400, "title length should be 0<=title.length<=100");
  }
  if (member_num < 0 || member_num > 30) {
    throw createError(400, "member_num should be 0<=member_num<=30");
  }
  if (expr_dt < data.createdAt) {
    throw createError(400, "expr_dt should be expr_dt>=createdAt");
  }
  if (start_dt < data.createdAt) {
    throw createError(400, "start_dt should be start_dt>=createdAt");
  }
  if (end_dt < start_dt) {
    throw createError(400, "end_dt should be end_dt>=start_dt");
  }
  if (description.length > 5000) {
    throw createError(
      400,
      "description length should be 0<=description.length<=5000"
    );
  }
  if (appo_area.length > 100) {
    throw createError(
      400,
      "appo_area length should be 0<=appo_area.length<=100"
    );
  }
}
