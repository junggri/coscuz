export function login() {
  $(document).ready(() => {
    $(".saveId_slo").on("click", () => {
      if ($("#userIdSave").is(":checked") === false) {
        $("#userIdSave").attr("checked", true);
      } else if ($("#userIdSave").is(":checked") === true) {
        $("#userIdSave").attr("checked", false);
      }
    });

    let userInputId = getCookie("userInputId");
    $("input[name='saveId']").val(userInputId);

    if ($("input[name='saveId']").val() !== " ") {
      //공백이 아니라면 공백이라면
      $("#userIdSave").attr("checked", true);
    }
    $("#userIdSave").change(() => {
      if ($("#userIdSave").is(":checked")) {
        let userInputId = $("input[name='saveId']").val();
        setCookie("userInputId", userInputId, 7);
      } else {
        deleteCookie("userInputId");
      }
    });
    $("input[name='saveId']").keyup(() => {
      if ($("#userIdSave").is(":checked")) {
        // ID 저장하기를 체크한 상태라면,
        var userInputId = $("input[name='saveId']").val();
        setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
      }
    });
  });

  function setCookie(cookieName, value, exdays) {
    let exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue =
      escape(value) +
      (exdays == null ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
  }

  function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie =
      cookieName + "= " + "; expires=" + expireDate.toGMTString();
  }

  function getCookie(cookieName) {
    cookieName = cookieName + "=";
    var cookieData = document.cookie;
    var start = cookieData.indexOf(cookieName);
    var cookieValue = "";
    if (start != -1) {
      start += cookieName.length;
      var end = cookieData.indexOf(";", start);
      if (end == -1) end = cookieData.length;
      cookieValue = cookieData.substring(start, end);
    }
    return unescape(cookieValue);
  }
}
