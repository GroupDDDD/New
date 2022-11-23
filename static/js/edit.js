// [변경] 버튼 클릭 시
// form에 입력된 데이터를 가져와서 ajax로 patch 요청을 보내는 함수
// /board/get으로 리디렉션
async function editDo() {
    const form = document.getElementById("article-form-edit");
    const formData = {
        title: form.title.value,
        parity: form.parity.value,
        member_number: form.member_number.value,
        description: form.description.value,
        expr_dt: form.expr_dt.value,
        start_dt: form.start_dt.value,
        end_dt: form.end_dt.value
    };

    axios({
            method: "patch",
            url: "/board/edit",
            data: formData,
        })
        .then((res) => {
            console.log(res);
            location.href = "/board/get/:id";
        })
        .catch((err) => {
            console.log(err);
        });
}

// [취소] 버튼 클릭 시
// /board/get:id 로 리디렉션
async function editCancel() {
    console.log('editCancel() called');
    location.href = "/board/get:id";
}