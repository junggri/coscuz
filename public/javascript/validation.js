import { registerBoxChange } from "./valiModule1.js";

let email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let pwd_reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
let korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
let inputId = document.querySelector("#input_id");
let inputPwd1 = document.querySelector("#input_pwd1");
let inputPwd2 = document.querySelector("#input_pwd2");
let inputEmail = document.querySelector("#input_email");
let pwdFlag = false;
let idFlag = false;
let emailFlag = false;
let timeflag = true;
let width = 500;
let height = 500;

$("#input_validation:text[numberOnly]").on("keyup", function() {
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
  );
});

$(".register_pwd1").on("propertychange change keyup paste input", e => {
  console.log(pwdFlag);
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

$(".register_pwd2").on("propertychange change keyup paste input", e => {
  console.log(pwdFlag);
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

$(".register_email").on("propertychange chagnge keyup paste input", e => {
  if (email_reg.test(inputEmail.value) === false) {
    registerBoxChange.stateEmail("이메일을 정확히 입력해주세요.");
    registerBoxChange.checkBoxEmailCertified("none", "#6775a3");
  } else {
    registerBoxChange.stateEmail("이메일 인증이 필요합니다.");
    registerBoxChange.checkBoxEmailCertified("all", "#304ae2");
  }
});

function sendAjaxId(url, inputdata) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${inputdata}`);
  xhr.addEventListener("load", () => {
    let result = JSON.parse(xhr.responseText);
    document.querySelector(".state_id").innerHTML = result.state;
    if (result.canEnrollment === true) {
      registerBoxChange.iconStateTrue(".icon-id");
      idFlag = true;
    } else {
      registerBoxChange.iconStateFalse(".icon-id");
      idFlag = false;
    }
    if ($("#input_id").val().length === 0) {
      registerBoxChange.iconStateFalse(".icon-id");
      idFlag = false;
    }
  });
}
$("#input_id").on("propertychange change keyup paste input", e => {
  let inputdata = $("#input_id").val();
  sendAjaxId("http://localhost:3000/auth/user", inputdata);
});

function timer(_time) {
  let time = _time;
  let min = "";
  let sec = "";
  let timer = setInterval(function() {
    min = parseInt(time / 60);
    sec = time % 60;
    $(".validation_timer").html(min + "분" + sec + "초");
    time--;
    if (time === -1) {
      timeflag = false;
      registerBoxChange.registerValidationBox("rgba(0,0,0,0.2)", "none");
      setTimeout(function() {
        alert(
          "시간이 초과되었습니다. 이메일 인증버튼을 다시눌러 새로운 인증번호를 발급받으세요!"
        );
      }, 500);
      clearInterval(timer);
    } else if (emailFlag) {
      clearInterval(timer);
      $(".validation_timer").html(" ");
    }
  }, 1000);
}

function sendAjaxEmail(url, inputdata) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`email=${inputdata}`);
  xhr.addEventListener("load", () => {
    let result = JSON.parse(xhr.responseText);
    document.querySelector(".state_email").innerHTML = result.state;
    console.log(result.validation_num);
    if (result.canEnrollment) {
      $(".register_emailValidation").css("display", "block");
    }
    $(".check_validation").on("click", () => {
      if ($("#input_emailValidation").val() === result.validation_num) {
        emailFlag = true;
        registerBoxChange.registerValidationBox("rgba(0,0,0,0.2)", "none");
        registerBoxChange.checkBoxEmailCertified("none", "#6775a3");
        registerBoxChange.stateEmail("인증이 완료됬습니다!");
        $(".check_validation").css("backgroundColor", "#6775a3");
        $(".register_email")
          .css("backgroundColor", "rgba(0,0,0,0.2)")
          .css("pointerEvents", "none");
        $(".state_email").css("color", "#25C125");
      } else {
        emailFlag = false;
        registerBoxChange.stateEmail("인증번호가 일치하지 않습니다!");
        $(".state_email").css("color", "#ff6665");
      }
    });
  });
}

$(".check_email").on("click", e => {
  let inputdata = $("#input_email").val();
  sendAjaxEmail("http://localhost:3000/auth/nodemailerTest", inputdata);
  if (timeflag === true) {
    timer(180);
  } else if (timeflag === false) {
    timer(180);
    registerBoxChange.registerValidationBox("white", "all");
  }
});

function execDaumPostcode() {
  new daum.Postcode({
    width: width,
    height: height,
    oncomplete: function(data) {
      let roadAddr = data.roadAddress;
      let extraRoadAddr = "";
      if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
        extraRoadAddr += data.bname;
      }
      if (data.buildingName !== "" && data.apartment === "Y") {
        extraRoadAddr +=
          extraRoadAddr !== "" ? ", " + data.buildingName : data.buildingName;
      }
      document.getElementById("postcode").value = data.zonecode;
      document.getElementById("roadAddress").value = roadAddr;
    }
  }).open({
    left: window.screen.width / 2 - width / 2,
    top: window.screen.height / 2 - height / 2
  });
}

function check() {
  if (idFlag && pwdFlag && emailFlag) {
    return true;
  } else {
    alert("필수항목을 입력해주시길 바랍니다.");
    return false;
  }
}

$("#adr_btn").on("click", () => execDaumPostcode());

$(".register_parentBox").on("submit", () => {
  return check();
});

// <-------------------------------------register_user------------------------------>
if ($("#oauth_name").val() === "required") {
  $("#oauth_name").val("");
  $(".user_name")
    .css("pointerEvents", "all")
    .css("backgroundColor", "white");
}
