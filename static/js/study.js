const titles = document.querySelectorAll(".title");
const underboxes = document.querySelectorAll(".title-underbox");
const study = document.querySelector(".study");
const study2 = document.querySelector(".study2");

const cards = document.querySelectorAll(".card");

for (const title of titles) {
  title.addEventListener("click", function () {
    for (let i = 0; i < titles.length; i++) {
      titles[i].classList.remove("title-opacity");
    }
    title.classList.toggle("title-opacity");
  });
}

// study.ejs의 게시글이 스크롤링하면서 보이는 효과
// 카드는 한 라인에 3개씩 배치되어있음
// 각 라인은 클래스로 line-n을 가지고 있으며, n은 1부터 시작
// 스크롤링하여 바닥에 닿을 때마다 3개의 line을 불러온다

addEventListener("scroll", function () {
  const scrollHeight = document.documentElement.scrollHeight;
  const scrollTop = document.documentElement.scrollTop;
  const clientHeight = document.documentElement.clientHeight;
  if (scrollTop + clientHeight >= scrollHeight) {
    const line = document.querySelectorAll(".line");
    const lastLine = line[line.length - 1];
    const lastLineNum = parseInt(
      lastLine.className.split(" ")[1].split("-")[1]
    );
    const nextLineNum = lastLineNum + 1;
    const nextLine = document.querySelector(`.line-${nextLineNum}`);
    if (nextLine) {
      nextLine.classList.remove("line-hidden");
    }
  }
});
