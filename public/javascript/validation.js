let email_reg = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
let pwd_reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
let korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
let inputId = document.querySelector("#input_id");
let inputPwd1 = document.querySelector("#input_pwd1");
let inputPwd2 = document.querySelector("#input_pwd2");
let inputEmail = document.querySelector("#input_email");
let inputDisplayName = document.querySelector("#input_displayName");
let inputBrandName = document.querySelector("#input_brandName");
let pwdFlagVal = false;
let idFlag = false;
let displayNameFlag = false;
let brandNameFlag = false;

let authStateChange = {
  borderRed: function(e) {
    e.target.parentNode.style.border = "1px solid #ff6665";
  },
  borderGray: function(e) {
    e.target.parentNode.style.border = "1px solid rgba(0, 0, 0, 0.2)";
  },
  statePwd: function(ele) {
    $(".state_pwd").html(ele);
  },
  stateEmail: function(ele) {
    $(".state_email").html(ele);
  },
  stateID: function(ele) {
    $(".state_id").html(ele);
  },

  checkBoxEmailNoneCertified: function(state) {
    $(".check_email")
      .css("border", "1px solid rgba(0, 0, 0, 0.2)")
      .css("pointerEvents", state);
    $(".check_email span").css("color", "rgba(0, 0, 0, 0.2)");
  },
  checkBoxEmailCertified: function(state) {
    $(".check_email")
      .css("border", "1px solid rgba(0, 0, 0, 0.5)")
      .css("pointerEvents", state);
    $(".check_email span").css("color", "rgba(0, 0, 0, 0.5)");
  },
  borderRedAndStatePwd: function(e, ele) {
    this.borderRed(e);
    this.statePwd(ele);
  },
  borderGrayAndStatePwd: function(e, ele) {
    this.borderGray(e);
    this.statePwd(ele);
  },
  borderRedAndStateEmail: function(e, ele) {
    this.borderRed(e);
    this.stateEmail(ele);
  },
  borderGrayAndStateEmail: function(e, ele) {
    this.borderGray(e);
    this.stateEmail(ele);
  },
  borderRedAndStateID: function(e, ele) {
    this.borderRed(e);
    this.stateID(ele);
  },
  borderGrayAndStateID: function(e, ele) {
    this.borderGray(e);
    this.stateID(ele);
  }
};

$(".register_pwd1").on("propertychange change keyup paste input", e => {
  if (pwd_reg.test(inputPwd1.value) === false) {
    authStateChange.borderRedAndStatePwd(e, "비밀번호가 유효하지 않습니다.");
    if (inputPwd1.value.search(/\s/) !== -1) {
      authStateChange.borderRedAndStatePwd(e, "비밀번호에 공백이 존재합니다.");
    } else if (inputPwd1.value.search(korean) !== -1) {
      authStateChange.borderRedAndStatePwd(
        e,
        "비밀번호는 영문자(소문자,대문자)만 가능합니다."
      );
    }
  } else {
    authStateChange.borderGrayAndStatePwd(e, " ");
    if (inputPwd1.value.search(/\s/) !== -1) {
      authStateChange.borderRedAndStatePwd(e, "비밀번호에 공백이 존재합니다.");
    } else if (inputPwd1.value.search(korean) !== -1) {
      authStateChange.borderRedAndStatePwd(
        e,
        "비밀번호는 영문자(소문자,대문자)만 가능합니다."
      );
    }
    pwdFlagVal = true;
  }
});

// pwd1에서 비밀번호를 수정했을때  pwd2의 상태도 바뀌어여 하니까 정리
$(".register_pwd2").on("propertychange change keyup paste input", e => {
  if (inputPwd1.value !== inputPwd2.value) {
    authStateChange.borderRedAndStatePwd(e, "비밀번호가 일치하지 않습니다.");
  } else if (inputPwd1.value === inputPwd2.value && pwdFlagVal) {
    authStateChange.borderGrayAndStatePwd(e, " ");
  }
});

$(".register_email").on("propertychange chagnge keyup paste input", e => {
  if (email_reg.test(inputEmail.value) === false) {
    authStateChange.borderRedAndStateEmail(e, "이메일을 정확히 입력해주세요.");
    authStateChange.checkBoxEmailNoneCertified("none");
  } else {
    authStateChange.borderGrayAndStateEmail(e, "이메일 인증이 필요합니다.");
    authStateChange.checkBoxEmailCertified("all");
  }
});

function sendAjaxId(url, inputId) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`id=${inputId}`);
  xhr.addEventListener("load", () => {
    let result = JSON.parse(xhr.responseText);

    document.querySelector(".state_id").innerHTML = result.state;
    if (result.canEnrollment === true) {
      idFlag = true;
      $(".register_id").css("border", "1px solid rgba(0,0,0,0.2)");
    } else {
      $(".register_id").css("border", "1px solid #ff6665");
    }
  });
}
$(".check_id").on("click", e => {
  let inputdata = $("#input_id").val();
  sendAjaxId("http://localhost:3000/auth/user", inputdata);
});

function sendAjaxEmail(url, inputdata) {
  let xhr = new XMLHttpRequest();
  xhr.open("POST", url);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(`email=${inputdata}`);
  xhr.addEventListener("load", () => {
    let result = JSON.parse(xhr.responseText);
    console.log(result);
  });
}
$(".check_email").on("click", e => {
  let inputdata = $("#input_email").val();
  sendAjaxEmail("http://localhost:3000/auth/nodemailerTest", inputdata);
});

// $("#email").on("propertychange change keyup paste input", function() {
//   if (email_reg.test(email.value) === false) {
//     emailBox.style.border = "2px solid red";
//   } else {
//     emailBox.style.border = "2px solid green";
//   }
// });

// $("#pwd1").on("propertychange change keyup paste input", function() {
//   if (pwd_reg.test(pwd1.value) === false && pwd1.value.length <= 8) {
//     console.log(pwdBox1);
//     pwdBox1.style.border = "2px solid red";
//   } else {
//     pwdBox1.style.border = "2px solid green";
//   }
// });
// // $("#pwd2").on("propertychange change keyup paste input", function() {
// //   if (pwd1.value !== pwd2.value) {
// //     checkPwd.innerHTML = "비밀번호가 일치하지 않습니다.";
// //     checkPwd.style.color = "red";
// //     pwd1.addEventListener("click", () => {
// //       checkPwd.innerHTML = "";
// //       checkPwd.style.color = "black";
// //     });
// //     pwd2.addEventListener("click", () => {
// //       checkPwd.innerHTML = "";
// //       checkPwd.style.color = "black";
// //     });
// //   } else {
// //     checkPwd.style.color = "blue";
// //     checkPwd.innerHTML = "비밀번호가 일치합니다.";
// //     pwdCheck = true;
// //   }
// // });

// registerBtn.addEventListener("click", () => {
//   if (emailCheck && brandName !== "null" && pwdCheck) {
//     $("form").submit();
//   }
// });
