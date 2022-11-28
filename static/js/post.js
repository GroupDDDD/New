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
        appo_area: form.appo_area.value
    };
    console.dir(formData);

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