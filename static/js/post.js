// form 등록 버튼 클릭 시
// form에 입력된 데이터를 가져와서 ajax로 post 요청을 보내는 함수
// board table에 데이터를 추가하는 함수
function postArticle() {
    console.log("postArticle() called");

    // form에 입력된 데이터를 가져옴
    const form = document.forms["article-form"];
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
    console.dir(form);
    console.dir(formData);

    // axios로 post 요청을 보냄
    axios({
            method: "post",
            url: "/study/post",
            data: formData,
        })
        .then((res) => {
            console.log('article posted', res);
            // 게시글 등록 후 해당 게시글로 이동
            location.href = "/study/:" + res.data.id;
        })
        .catch((err) => {
            console.log(err);
        });
}