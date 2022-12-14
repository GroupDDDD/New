// form 등록 버튼 클릭 시
// form에 입력된 데이터를 가져와서 axios로 post 요청을 보내는 함수


// board table에 데이터를 추가하는 함수
function postArticle() {
  console.log("postArticle() called");

  // form에 입력된 데이터를 가져옴
  const form = document.getElementById("article-form");
  const formData = {
    title: form.title.value,
    category_id: form.category_id.value,
    parity: form.parity.value,
    member_num: form.member_num.value,
    description: form.description.value,
    expr_dt: form.expr_dt.value,
    start_dt: form.start_dt.value,
    end_dt: form.end_dt.value,
    appo_area: form.appo_area.value,
  };
  console.dir(formData);


  if (validation(formData)) {
    // form에 입력된 데이터를 검증
    console.log("validation success");
    // axios로 post 요청을 보냄
    axios({
      method: "post",
      url: "/study/post",
      data: formData,
    })
      .then((res) => {
        console.log("article posted", res);
        location.href = "/study";
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("validation failed");
  }
}

// form에 입력된 데이터를 검증하는 함수
function validation(formData) {
  console.log("validation() called");
  // title 검증: 1~50자
  if (formData.title.length < 1 || formData.title.length > 50) {
    alert("제목은 1~50자로 입력해주세요.");
    throw new Error("title validation error");
    return false;
  }
  // member_num 검증: 정수값. 2~30명
  // 먼저 string을 int로 변환하고 불가능하면 alert
  formData.member_num = parseInt(formData.member_num);
  if (isNaN(formData.member_num)) {
    alert("인원은 숫자로 입력해주세요.");
    throw new Error("member_num validation error");
    return false;
  }
  if (formData.member_num < 2 || formData.member_num > 30) {
    alert("인원은 2~30명으로 입력해주세요.");
    throw new Error("member_num validation error");
    return false;
  }
  // description 검증: 1~500자
  if (formData.description.length < 1 || formData.description.length > 500) {
    alert("내용은 1~500자로 입력해주세요.");
    throw new Error("description validation error");
    return false;
  }
  // expr_dt 검증: 현재 시간보다 미래
  console.log("현재시간: ", new Date());
  if (!isFutureDate(formData.expr_dt)) {
    alert("모집 마감일은 현재 시간보다 미래여야 합니다.");
    throw new Error("expr_dt validation error");
    return false;
  }
  // start_dt 검증: 현재 시간, 아니면 현재 시간보다 미래
  if (new Date() >= new Date(formData.start_dt)) {
    alert("스터디 시작일은 과거여서는 안됩니다.");
    throw new Error("start_dt validation error");
    return false;
  }
  // end_dt 검증: 현재 시간보다 미래
  if (!isFutureDate(formData.end_dt)) {
    alert("스터디 종료일은 현재 시간보다 미래여야 합니다.");
    throw new Error("end_dt validation error");
    return false;
  }
  // appo_area 검증: 0~50자
  if (formData.appo_area.length > 50) {
    alert("만날 장소는 50자 안으로 입력해주세요.");
    throw new Error("appo_area validation error");
    return false;
  }
  // start_dt != end_dt
  if (formData.start_dt === formData.end_dt) {
    alert("스터디 시작일과 종료일은 같을 수 없습니다.");
    throw new Error("start_dt == end_dt validation error");
    return false;
  }
  return true;
}

// 인자로 받은 date 타입 데이터가 현재 시간보다 미래인지 검증하는 함수
function isFutureDate(date) {
  const now = new Date();
  const future = new Date(date);
  return now < future;
}

// form의 [취소] 버튼 클릭 시
// 전 페이지로 이동
function postCancel() {
  console.log("postCancel() called");
  history.back();
}

// form에서 parity가 OFFLINE으로 선택되면, appo_area가 보이도록 함
// 반대로 ONLINE으로 선택되면, appo_area가 안보이도록 함
function showAppo(event) {
  const parity = event.target.value;
  const appo_area = document.getElementById("appo-area");

  if (parity == "OFF") {
    appo_area.style.display = "";
  } else {
    appo_area.style.display = "none";
  }
}
