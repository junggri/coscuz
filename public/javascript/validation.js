import {
  registerBoxChange,
  sendAjaxId,
  sendAjaxEmail,
  execDaumPostcode,
  isValidationFlag,
  idFlag,
  emailFlag,
} from "./valiModule1.js";

let email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let pwd_reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
let inputPwd1 = document.querySelector("#input_pwd1");
let inputPwd2 = document.querySelector("#input_pwd2");
let inputEmail = document.querySelector("#input_email");
let pwdFlag = false;

$("#input_validation:text[numberOnly]").on("keyup", function () {
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
  );
});

$(".register_pwd1").on("propertychange change keyup paste input", (e) => {
  if (pwd_reg.test(inputPwd1.value) === false) {
    registerBoxChange.iconStateFalse(".icon-pwd1");
    registerBoxChange.statePwd("비밀번호가 유효하지 않습니다.");
    registerBoxChange.checkBoxPwdCertified();
  } else {
    registerBoxChange.iconStateTrue(".icon-pwd1");
    registerBoxChange.statePwd(" ");
    registerBoxChange.checkBoxPwdCertified();
  }
  if (inputPwd1.value !== inputPwd2.value) {
    pwdFlag = false;
    registerBoxChange.statePwd("비밀번호가 일치하지 않습니다.");
    registerBoxChange.iconStateFalse(".icon-pwd2");
  }
});

$(".register_pwd2").on("propertychange change keyup paste input", (e) => {
  if (
    inputPwd1.value !== inputPwd2.value &&
    pwd_reg.test(inputPwd1.value) === false
  ) {
    pwdFlag = false;
    registerBoxChange.statePwd("비밀번호가 일치하지 않습니다.");
    registerBoxChange.iconStateFalse(".icon-pwd2");
  } else if (
    inputPwd1.value === inputPwd2.value &&
    pwd_reg.test(inputPwd1.value) === true
  ) {
    registerBoxChange.statePwd("");
    pwdFlag = true;
    registerBoxChange.iconStateTrue(".icon-pwd2");
  } else if (inputPwd1.value !== inputPwd2.value) {
    pwdFlag = false;
    registerBoxChange.statePwd("비밀번호가 일치하지 않습니다.");
    registerBoxChange.iconStateFalse(".icon-pwd2");
  }
});

$(".register_email").on("propertychange chagnge keyup paste input", (e) => {
  if (email_reg.test(inputEmail.value) === false) {
    registerBoxChange.stateEmail("이메일을 정확히 입력해주세요.");
    registerBoxChange.checkBoxEmailCertified("none", "#6775a3");
  } else {
    registerBoxChange.stateEmail("이메일 인증이 필요합니다.");
    registerBoxChange.checkBoxEmailCertified("all", "#304ae2");
  }
});

$("#input_id").on("propertychange change keyup paste input", (e) => {
  let inputdata = $("#input_id").val();
  sendAjaxId("http://localhost:3000/auth/userId", inputdata);
});

$(".check_email").on("click", (e) => {
  let inputdata = $("#input_email").val();
  sendAjaxEmail("http://localhost:3000/auth/nodemailerTest", inputdata);
  if (isValidationFlag) {
    alert("새로운 인증번호를 발송하였습니다.");
  }
});

$("#adr_btn").on("click", () => execDaumPostcode());

function check() {
  //else에서는 false를 찾아서 각기다른 알러트 창 켜줘야한다
  if (idFlag && pwdFlag && emailFlag) {
    return true;
  } else {
    alert("필수항목을 입력해주시길 바랍니다.");
    return false;
  }
}

$(".register_parentBox").on("submit", () => {
  return check();
});

// <-------------------------------------register_user------------------------------>
if ($("#oauth_name").val() === "required") {
  $("#oauth_name").val("");
  $(".user_name").css("pointerEvents", "all").css("backgroundColor", "white");
}
