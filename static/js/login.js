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

// ===================signin====================
async function login() {
  const form_login = document.forms["form_login"];
  console.log(form_login);

  if (!form_login.checkValidity()) {
    form_login.reportValidity();
    return;
  }

  axios({
    method: "POST",
    url: "/sign/signin",
    data: {
      user_id: form_login.user_id.value,
      user_pw: form_login.user_pw.value,
      user_email: form_login.user_email.value,
    },
  })
    .then((res) => {
      return res.data;
    })
    .then((data) => {
      if (data) {
        //data = true라면 => res.send(true)라면
        alert("로그인 성공");

        const form_info = document.forms["form_info"];
        form_info.user_id.value = form_login.user_id.value;
        form_info.submit(); //POST /sign/profile 요청을 수행
      } else {
        //data = false라면 => res.send(false);
        alert("로그인 실패");
        form_login.reset();
      }
    });
}
