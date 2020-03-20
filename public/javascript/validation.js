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
let scroll = false;
let width = 500;
let height = 500;

let registerBoxChange = {
  borderRed: function(e) {
    e.target.parentNode.style.border = "1px solid #ff6665";
  },
  borderBlue: function(e) {
    e.target.parentNode.style.border = "1px solid #66ccff";
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
  stateColor: function(target, color) {
    $(target).css("color", color);
  },
  borderRedAndStatePwd: function(e, ele) {
    this.borderRed(e);
    this.statePwd(ele);
  },
  borderBlueAndStatePwd: function(e, ele) {
    this.borderBlue(e);
    this.statePwd(ele);
  },
  borderRedAndStateEmail: function(e, ele) {
    this.borderRed(e);
    this.stateEmail(ele);
  },
  borderBlueAndStateEmail: function(e, ele) {
    this.borderBlue(e);
    this.stateEmail(ele);
  },
  borderRedAndStateID: function(e, ele) {
    this.borderRed(e);
    this.stateID(ele);
  },
  borderBlueAndStateID: function(e, ele) {
    this.borderBlue(e);
    this.stateID(ele);
  },

  checkBoxEmailCertified: function(state, color) {
    $(".check_email")
      .css("border", `1px solid ${color}`)
      .css("pointerEvents", state);
    $(".check_email span").css("color", color);
  },
  checkBoxPwdCertified: function(e) {
    if (inputPwd1.value.search(/\s/) !== -1) {
      registerBoxChange.borderRedAndStatePwd(
        e,
        "비밀번호에 공백이 존재합니다."
      );
    } else if (inputPwd1.value.search(korean) !== -1) {
      registerBoxChange.borderRedAndStatePwd(
        e,
        "비밀번호는 영문자(소문자,대문자)만 가능합니다."
      );
    }
  },
  validationBox: function(display, background, btnColor) {
    $("#validation_box").css("display", display);
    $("html").css("backgroundColor", background);
    $(".register-btn").css("backgroundColor", btnColor);
  },
  addressBackgroundColor: function(color) {
    $("adr_btn").css("backgroundColor", color);
    $("#detailAddress").css("backgroundColor", color);
  },
  canScroll: function(scroll) {
    if (scroll) {
      $("html, body").css({ overflow: "auto", height: "100%" });
      $("#element").off("scroll touchmove mousewheel");
    } else {
      $("html, body").css({ overflow: "hidden", height: "100%" });
      $("#element").on("scroll touchmove mousewheel", function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
      });
    }
  },
  emailCommonProcess: function(scroll) {
    this.validationBox("none", "white", "skyblue");
    this.addressBackgroundColor("white");
    this.canScroll(scroll);
  }
};

$("#input_validation:text[numberOnly]").on("keyup", function() {
  $(this).val(
    $(this)
      .val()
      .replace(/[^0-9]/g, "")
  );
});

$(".register_pwd1").on("propertychange change keyup paste input", e => {
  if (pwd_reg.test(inputPwd1.value) === false) {
    registerBoxChange.borderRedAndStatePwd(e, "비밀번호가 유효하지 않습니다.");
    registerBoxChange.checkBoxPwdCertified(e);
  } else {
    registerBoxChange.borderBlueAndStatePwd(e, " ");
    registerBoxChange.checkBoxPwdCertified(e);
  }
});

// pwd1에서 비밀번호를 수정했을때  pwd2의 상태도 바뀌어여 하니까 정리
$(".register_pwd2").on("propertychange change keyup paste input", e => {
  if (
    inputPwd1.value !== inputPwd2.value &&
    pwd_reg.test(inputPwd1.value) === false
  ) {
    pwdFlag = false;
    registerBoxChange.borderRedAndStatePwd(e, "비밀번호가 일치하지 않습니다.");
  } else if (inputPwd1.value === inputPwd2.value) {
    registerBoxChange.borderBlueAndStatePwd(e, " ");
    pwdFlag = true;
  }
});

$(".register_email").on("propertychange chagnge keyup paste input", e => {
  if (email_reg.test(inputEmail.value) === false) {
    registerBoxChange.borderRedAndStateEmail(
      e,
      "이메일을 정확히 입력해주세요."
    );
    registerBoxChange.checkBoxEmailCertified("none", "rgba(0, 0, 0, 0.2)");
  } else {
    registerBoxChange.borderBlueAndStateEmail(e, "이메일 인증이 필요합니다.");
    registerBoxChange.checkBoxEmailCertified("all", "rgba(0, 0, 0, 0.5)");
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
      if (inputId.value.search(korean) !== -1) {
        $(".register_id").css("border", "1px solid #ff6665");
      } else {
        $(".register_id").css("border", "1px solid #66ccff");
      }
      idFlag = true;
    } else {
      if (inputId.value.search(korean) !== -1) {
        $(".register_id").css("border", "1px solid #ff6665");
      } else {
        $(".register_id").css("border", "1px solid #ff6665");
      }
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
    document.querySelector(".state_email").innerHTML = result.state;
    console.log(result.validation_num);
    if (result.canEnrollment === true) {
      registerBoxChange.validationBox(
        "block",
        "rgba(0,0,0, 0.05)",
        "rgba(0,0,0, 0.1)"
      );
      registerBoxChange.addressBackgroundColor("rgba(0, 0, 0, 0.05)");
      registerBoxChange.canScroll(scroll);
      $(".confirm").on("click", e => {
        if ($("#input_validation").val() === result.validation_num) {
          scroll = true;
          emailFlag = true;
          registerBoxChange.emailCommonProcess(scroll);
          $(".state_email").html("");
        } else {
          $(".validation_timer").html("인증번호가 일치하지 않습니다.");
        }
      });
      $(".cancle").on("click", () => {
        scroll = true;
        registerBoxChange.emailCommonProcess(scroll);
      });
    } else {
      $(".register_email").css("border", "1px solid #ff6665");
    }
  });
}

$(".check_email").on("click", e => {
  let inputdata = $("#input_email").val();
  $("#validation_box").css({
    top:
      ($(window).height() - $("#validation_box").outerHeight()) / 2 +
      $(window).scrollTop() +
      "px",
    left:
      ($(window).width() - $("#validation_box").outerWidth()) / 2 +
      $(window).scrollLeft() +
      "px"
  });
  sendAjaxEmail("http://localhost:3000/auth/nodemailerTest", inputdata);
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
  console.log(idFlag && pwdFlag && emailFlag);
  if (idFlag && pwdFlag && emailFlag) {
    return true;
  } else {
    alert("필수항목을 입력해주시길 바랍니다.");
    return false;
  }
}
