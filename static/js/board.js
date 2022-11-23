const title = document.querySelector('#title');
const formData = new FormData(form);

// board table 내에 저장된 데이터를 가져오는 함수
function getArticle() {
    console.log("getArticle() called");

    // ajax로 get 요청을 보냄
    axios({
            method: "get",
            url: "/board/get",
        })
        .then((res) => {
            console.log(res);
            title.value = res.data.title;
            content.value = res.data.content;
        })
        .catch((err) => {
            console.log(err);
        });
}