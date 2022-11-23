// title, category_id, member_number, appo_aria, expr_dt 정보가 게시판에서 보여야 함

const articleList = document.getElementById("article-list");

// function that brings all the articles from the 'board' database
// every field of board table should be stored in array of objects
// and then rendered as a table body in board.ejs
// use axios to get the data from the server
// 즉시실행함수(IIFE)로 구현
(function getBoard() {
    console.log("getBoard() called");
    axios.get('/board')
        .then((response) => {
            console.log(response.data);
            const articles = response.data;
            articles.forEach((article) => {
                const articleRow = document.createElement("tr");
                articleRow.innerHTML = `
                <td>${article.article_id}</td>
                <td><a onclick="getArticle(${article.article_id});">${article.title}</a></td>
                <td>${article.member_number}</td>
                <td>${article.createdAt}</td>
                <td>${article.expr_dt}</td>
                `;
                articleList.appendChild(articleRow);
            });
        })
        .catch((error) => {
            console.log(error);
        });
})();

// 선택된 article의 id를 가져와 article.ejs에 렌더링
function getArticle(id) {
    console.log("getArticle() called");
    console.log(id);

    // axios로 get 요청을 보냄
    axios({
            method: "get",
            url: "/board/get/:" + id,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}