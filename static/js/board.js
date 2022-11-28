const Board = document.getElementById("article-board");

// 선택된 article의 id를 가져와 article.ejs에 렌더링
function getArticle(id) {
    console.log("getArticle() called");
    console.log("url: /study/" + id);

    document.location.href = "/study/" + id;
};

// input tag(class, id, name = search)에 입력된 값을 받아와 keyword에 저장
// keyword = req.query.keyword;
// keyword를 통해 Board 테이블에서 title, description에 해당하는 데이터를 조회
function searchArticle() {
    let keyword = document.getElementById("search").value;
    console.log("keyword: " + keyword);
    console.log("url: /study/search/" + keyword);
    document.location.href = "/study/search/" + keyword;
};