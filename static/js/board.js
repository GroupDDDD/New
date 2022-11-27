const Board = document.getElementById("article-board");

// 선택된 article의 id를 가져와 article.ejs에 렌더링
function getArticle(id) {
    console.log("getArticle() called");
    console.log(id);

    // axios로 get 요청을 보냄
    axios({
            method: "get",
            url: "/study/" + id,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}