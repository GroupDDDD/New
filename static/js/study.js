const titles = document.querySelectorAll(".title");
const underboxes = document.querySelectorAll(".title-underbox");

const cards = document.querySelectorAll(".card");
const modals = document.querySelectorAll(".window-modal");

for (const title of titles) {
  title.addEventListener("click", function () {
    for (let i = 0; i < titles.length; i++) {
      titles[i].classList.remove("title-opacity");
    }
    title.classList.toggle("title-opacity");
  });
}

for (const card of cards) {
  card.addEventListener("click", function () {
    for (const modal of modals) {
      modal.classList.toggle("visible");
    }
  });
  modal.addEventListener("click", function () {
    for (const modal of modals) {
      modal.classList.toggle("visible");
    }
  });
}

// for (const card of cards) {
//   card.addEventListener("click", function () {
//     for(i=0; i< cards.length; i++) {
//     cards[i].classList.toggle("visible");
//   });
// }

// modal.addEventListener("click", function () {
//   modal.classList.toggle("visible");
// });
