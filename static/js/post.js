// form 등록 버튼 클릭 시
// form에 입력된 데이터를 가져와서 ajax로 post 요청을 보내는 함수

const { cloneDeep } = require("sequelize/types/utils");

// board table에 데이터를 추가하는 함수
function postArticle() {
    console.log("postArticle() called");

    // form에 입력된 데이터를 가져옴
    const form = document.getElementById("article-form");
    const formData = new FormData(form);
    console.dir(form);
    console.dir(formData);

    // ajax로 post 요청을 보냄
    axios({
            method: "post",
            url: "/board/write",
            data: formData,
        })
        .then((res) => {
            console.log(res);
            alert("글이 등록되었습니다.");
            location.href = "/board";
        })
        .catch((err) => {
            console.log(err);
        });
}