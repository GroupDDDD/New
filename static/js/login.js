let Register = document.querySelector(".register");
let FormRegister = document.querySelector(".form-register");

Register.addEventListener("click", function () {
  FormRegister.classList.toggle("hide");
  console.log("클릭 되었습니다!!!!!!");
});
