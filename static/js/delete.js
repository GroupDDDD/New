// board table에 해당하는 id의 데이터를 삭제하는 함수
function deleteArticle() {
    console.log('deleteArticle() called');
    axios({
            method: "delete",
            url: "/study/delete",
            data: {
                id: id
            }
        })
        .then((res) => {
            console.log(res);
            location.href = "/study";
        })
        .catch((err) => {
            console.log(err);
        });
};