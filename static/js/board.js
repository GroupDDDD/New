// title, category_id, member_number, appo_aria, expr_dt 정보가 게시판에서 보여야 함

const articleList = document.getElementById("article-board");

// function that brings all the articles from the 'board' database
// sequelize의 findAll() 메소드를 사용하여 board 테이블의 모든 데이터를 가져옴
// controllers의 Cboard에서 res.render('study', { boards: boards, pages: pages, current: page })로 보냄
// boards는 board 테이블의 모든 데이터를 의미
// boards를 forEach() 메소드를 사용하여 각각의 데이터를 articleList에 추가
// /study 라우터에 get 요청을 보내면 getArticleList() 함수가 실행됨

let lineCount = 0;

function getArticleList() {
    fetch("/study")
        .then((res) => res.json())
        .then((boards) => {
            boards.forEach((board) => {
                // articleList에 article을 추가
                // 각 article에는 title, category_id, member_num, expr_dt 정보가 보여짐
                // 각 article에는 클릭 이벤트가 추가되어 있음
                // 클릭 이벤트가 발생하면 getArticle() 함수가 실행되고, 선택된 article의 id를 가져옴
                // div.line-n은 한 줄을 의미하며, 한 줄에는 3개의 article이 들어감
                // articleList에 article을 추가할 때마다 lineCount를 1씩 증가시킴
                // lineCount가 3이 되면 lineCount를 0으로 초기화하고, articleList에 div.line-n을 추가함
                lineCount++;
                if (lineCount === 3) {
                    lineCount = 0;
                    const line = document.createElement("div");
                    line.className = "line";
                    articleList.appendChild(line);
                }
                const article = document.createElement("div");
                article.className = "article";
                article.innerHTML = `
                <div class="card" id="card1" onclick="getArticle(${board.article_id});">
                <div class="card-deadline">
                    <span class="article__info__item__title">모집기간</span>
                    <span class="article__info__item__content">${board.expr_dt}</span>
                </div>
                <div class="card-title">
                    ${board.title}
                </div>
                <div class="card-badge">배지</div>
            <div class="card-id">${board.user_id}</div>
        </div>
        `;
                articleList.appendChild(article);

            });
        });
}


// 선택된 article의 id를 가져와 article.ejs에 렌더링
function getArticle(id) {
    console.log("getArticle() called");
    console.log(id);

    // axios로 get 요청을 보냄
    axios({
            method: "get",
            url: "/study:" + id,
        })
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log(err);
        });
}