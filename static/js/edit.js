// 해당 게시물 id를 가져오는 함수
function getArticleId() {
    console.log('getArticleId() called');
    const url = location.href;
    const id = url.split("/")[4];
    console.log(id);
    return id;
}

// [변경] 버튼 클릭 시
// form에 입력된 데이터를 가져와서 axios로 patch 요청을 보내는 함수
// /board/get으로 리디렉션
async function editDo() {
    const form = document.getElementById("article-form-edit");
    const formData = {
        title: form.title.value,
        parity: form.parity.value,
        member_num: form.member_num.value,
        description: form.description.value,
        expr_dt: form.expr_dt.value,
        start_dt: form.start_dt.value,
        end_dt: form.end_dt.value,
        appo_time: form.appo_time.value,
        appo_aria: form.appo_aria.value
    };
    const article_id = getArticleId();
    axios({
            method: "patch",
            url: "/study/edit",
            data: formData,
        })
        .then((res) => {
            console.log(res);
            location.href = "/study/:" + article_id;
        })
        .catch((err) => {
            console.log(err);
        });
}

// [취소] 버튼 클릭 시
// 전 페이지로 이동
async function editCancel() {
    console.log('editCancel() called');
    history.back();
}