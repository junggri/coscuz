export let isValidationFlag = false;
export let idFlag = false;
export let emailFlag = false;
let korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
let inputPwd1 = document.querySelector("#input_pwd1");
let width = 500;
let height = 500;

export let registerBoxChange = {
  statePwd: function (ele) {
    $(".state_pwd").html(ele);
  },
  stateEmail: function (ele) {
    $(".state_email").html(ele);
  },
  stateID: function (ele) {
    $(".state_id").html(ele);
  },
  stateColor: function (target, color) {
    $(target).css("color", color);
  },
  iconStateFalse: function (target) {
    $(target).removeClass("icon-smile").addClass("icon-frown");
  },
  iconStateTrue: function (target) {
    $(target).removeClass("icon-frown").addClass("icon-smile");
  },
  checkBoxEmailCertified: function (state, color) {
    $(".check_email").css("pointerEvents", state).css("backgroundColor", color);
  },
  checkBoxPwdCertified: function () {
    if (inputPwd1.value.search(/\s/) !== -1) {
      this.statePwd("비밀번호에 공백이 존재합니다.");
      this.iconStateFalse(".icon-pwd1");
    } else if (inputPwd1.value.search(korean) !== -1) {
      this.iconStateFalse(".icon-pwd1");
      this.statePwd("비밀번호는 영문자(소문자,대문자)만 가능합니다.");
    }
  },
  registerValidationBox: function (color, state) {
    $(".register_emailValidation")
      .css("backgroundColor", color)
      .css("pointerEvents", state);
  },
};

export function sendAjaxId(url, inputdata) {
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
$("#input_id").on("propertychange change keyup paste input", (e) => {
  let inputdata = $("#input_id").val();
  sendAjaxId("http://localhost:3000/auth/userId", inputdata);
});

export function sendAjaxEmail(url, inputdata) {
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
      $(".check_email").css("display", "none");
      $(".cancel_validation").css("display", "block");
    }
    $(".cancel_validation").on("click", () => {
      $(".check_email").css("display", "block");
      $(".cancel_validation").css("display", "none");
      isValidationFlag = true;
      result.validation_num = null;
    });
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

export function execDaumPostcode() {
  new daum.Postcode({
    width: width,
    height: height,
    oncomplete: function (data) {
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
    },
  }).open({
    left: window.screen.width / 2 - width / 2,
    top: window.screen.height / 2 - height / 2,
  });
}
