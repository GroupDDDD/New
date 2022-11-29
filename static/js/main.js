let index = 0; //이미지에 접근하는 인덱스
window.onload = function () {
  slideShow();
};

function slideShow() {
  let i;

  let x = document.getElementsByClassName("Slide1"); //slide1에 대한 dom 참조
  let ButtonFirst = document.querySelector(".button-1");
  let ButtonSecond = document.querySelector(".button-2");
  let ButtonThird = document.querySelector(".button-3");

  for (i = 0; i < x.length; i++) {
    x[i].style.display = "none"; //처음에 전부 display를 none으로 한다.
  }

  document.querySelector(".button-1").addEventListener("click", button1);
  document.querySelector(".button-2").addEventListener("click", button2);
  document.querySelector(".button-3").addEventListener("click", button3);

  function ChangedButton1() {
    ButtonSecond.style.opacity = "50%";
    ButtonThird.style.opacity = "50%";
    ButtonFirst.style.opacity = "100%";
  }

  function ChangedButton2() {
    ButtonFirst.style.opacity = "50%";
    ButtonThird.style.opacity = "50%";
    ButtonSecond.style.opacity = "100%";
  }

  function ChangedButton3() {
    ButtonFirst.style.opacity = "50%";
    ButtonSecond.style.opacity = "50%";
    ButtonThird.style.opacity = "100%";
  }

  function button1() {
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    index = 0;
    x[index].style.display = "block";
    ChangedButton1();
  }
  function button2() {
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    index = 1;
    x[index].style.display = "block";
    ChangedButton2();
  }
  function button3() {
    for (i = 0; i < x.length; i++) {
      x[i].style.display = "none";
    }
    index = 2;
    x[index].style.display = "block";
    ChangedButton3();
  }

  index++;
  if (index > x.length) {
    index = 1; //인덱스가 초과되면 1로 변경
  }

  if (index == 1) {
    ChangedButton1();
  } else if (index == 2) {
    ChangedButton2();
  } else if (index == 3) {
    ChangedButton3();
  }

  x[index - 1].style.display = "block"; //해당 인덱스는 block으로
  setTimeout(slideShow, 4000); //함수를 4초마다 호출
}

