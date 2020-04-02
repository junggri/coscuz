let korean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;
let inputPwd1 = document.querySelector("#input_pwd1");
let pwdFlag = false;
let idFlag = false;
let emailFlag = false;
let timeflag = true;
let width = 500;
let height = 500;

export let registerBoxChange = {
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
  iconStateFalse: function(target) {
    $(target)
      .removeClass("icon-smile")
      .addClass("icon-frown");
  },
  iconStateTrue: function(target) {
    $(target)
      .removeClass("icon-frown")
      .addClass("icon-smile");
  },
  checkBoxEmailCertified: function(state, color) {
    $(".check_email")
      .css("pointerEvents", state)
      .css("backgroundColor", color);
  },
  checkBoxPwdCertified: function() {
    if (inputPwd1.value.search(/\s/) !== -1) {
      this.statePwd("비밀번호에 공백이 존재합니다.");
      this.iconStateFalse(".icon-pwd1");
    } else if (inputPwd1.value.search(korean) !== -1) {
      this.iconStateFalse(".icon-pwd1");
      this.statePwd("비밀번호는 영문자(소문자,대문자)만 가능합니다.");
    }
  },
  registerValidationBox: function(color, state) {
    $(".register_emailValidation")
      .css("backgroundColor", color)
      .css("pointerEvents", state);
  }
};
