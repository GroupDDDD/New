// [수정] 버튼 클릭 시
// /edit:id로 리디렉션
// id는 해당 게시글의 id이며, 해당 게시글의 정보를 가져와서 수정할 수 있도록 함
function editArticle(id) {
    console.log("editArticle() called");
    console.log(id);
    location.href = "/edit/" + id;
}

// [삭제] 버튼 클릭 시
// ajax로 delete 요청을 보내는 함수
// /board로 리디렉션
async function deleteArticle(obj, id) {
    console.log("deleteArticle() called");
    console.log(obj);
    console.log(id);

    if (!confirm("정말 삭제하시겠습니까?")) {
        return;
    };

    axios({
            method: "delete",
            url: "/board/delete",
            data: {
                id: id,
            },
        })
        .then((res) => {
            console.log(res);
            alert("글이 삭제되었습니다.");
            location.href = "/board";
        })
        .catch((err) => {
            console.log(err);
        });
}