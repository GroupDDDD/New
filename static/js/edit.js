// 해당 게시물 id를 가져오는 함수
function getArticleId() {
  console.log("getArticleId() called");
  const url = location.href;
  const id = url.split("/")[4];
  console.log(id);
  return id;
}

// [변경] 버튼 클릭 시
// form에 입력된 데이터를 가져와서 axios로 patch 요청을 보내는 함수
// /board/get으로 리디렉션
async function editDo() {
  console.log("editDo() called");
  const form = document.getElementById("article-form-edit");
  const formData = {
    title: form.title.value,
    parity: form.parity.value,
    member_num: form.member_num.value,
    description: form.description.value,
    expr_dt: form.expr_dt.value,
    start_dt: form.start_dt.value,
    end_dt: form.end_dt.value,
    appo_area: form.appo_area.value,
  };
  const article_id = getArticleId();

  if (validation(formData)) {
    console.log("validation success");
    // axios로 patch 요청을 보냄
    axios({
      method: "patch",
      url: "/study/edit/do",
      data: formData,
    })
      .then((res) => {
        console.log(res);
        document.location.href = "/study/" + article_id;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log("validation failed");
  }
}

// [취소] 버튼 클릭 시
// 전 페이지로 이동
async function editCancel() {
  console.log("editCancel() called");
  history.back();
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
  // start_dt 검증: 수정할 때에는 필요 없음
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
