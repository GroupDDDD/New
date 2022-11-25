let Register = document.querySelector(".register");
let Signin = document.querySelector(".signIn");

let FormRegister = document.querySelector(".form-register");
let FormLogin = document.querySelector(".form-login");

Register.addEventListener("click", function () {
  FormLogin.classList.add("hide");
  FormRegister.classList.remove("hide");
});

Signin.addEventListener("click", function () {
  FormRegister.classList.add("hide");
  FormLogin.classList.remove("hide");
});
