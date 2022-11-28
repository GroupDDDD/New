// 현재 /study:id 페이지의 id를 가져오는 함수
function getArticleId() {
    console.log('getArticleId() called');
    const url = location.href;
    const id = url.split("/")[4];
    console.log(id);
    return id;
}

// [수정] 버튼 클릭 시
// /edit/:id로 리디렉션
// id는 해당 게시글의 id이며, 해당 게시글의 정보를 가져와서 수정할 수 있도록 함
function editArticle() {
    console.log("editArticle() called");
    const id = getArticleId();
    console.log(id);
    document.location.href = "/study/edit/" + id;
}

// [삭제] 버튼 클릭 시
// axios로 delete 요청을 보내는 함수
// /study로 리디렉션
function deleteArticle() {
    console.log("deleteArticle() called");
    const article_id = getArticleId();
    console.log("delete article index: " + article_id);

    if (!confirm("정말 삭제하시겠습니까?")) {
        return;
    };

    axios.delete("/study/delete/" + article_id)
        .then(function(response) {
            console.log(response);
            alert("삭제되었습니다.");
            document.location.href = "/study";
        })
        .catch(function(error) {
            console.log(error);
        });
}