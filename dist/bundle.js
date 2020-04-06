/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./public/javascript/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./public/javascript/index.js":
/*!************************************!*\
  !*** ./public/javascript/index.js ***!
  \************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _login__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./login */ "./public/javascript/login.js");

Object(_login__WEBPACK_IMPORTED_MODULE_0__["login"])(); // window.onload = function() {
//   $("html,body").animate({ scrollTop: 0 }, 300);
//   slide();
// };

$(".nav-bar_login").on("click", function () {
  location.href = "/auth/login";
});
$(".icon-torso").on("click", function () {
  location.href = "/auth/logout_process";
});
$(".nav-bar_name").on("click", function () {
  location.href = "/";
});
$(".nav-bar_register").on("click", function () {
  location.href = "/auth/register_previous";
});
$(".carousel").carousel({
  interval: 2000
});

/***/ }),

/***/ "./public/javascript/login.js":
/*!************************************!*\
  !*** ./public/javascript/login.js ***!
  \************************************/
/*! exports provided: login */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "login", function() { return login; });
function login() {
  $(document).ready(function () {
    $(".saveId_slo").on("click", function () {
      if ($("#userIdSave").is(":checked") === false) {
        $("#userIdSave").attr("checked", true);
      } else if ($("#userIdSave").is(":checked") === true) {
        $("#userIdSave").attr("checked", false);
      }
    });
    var userInputId = getCookie("userInputId");
    $("input[name='saveId']").val(userInputId);

    if ($("input[name='saveId']").val() !== " ") {
      //공백이 아니라면 공백이라면
      $("#userIdSave").attr("checked", true);
    }

    $("#userIdSave").change(function () {
      if ($("#userIdSave").is(":checked")) {
        var _userInputId = $("input[name='saveId']").val();

        setCookie("userInputId", _userInputId, 7);
      } else {
        deleteCookie("userInputId");
      }
    });
    $("input[name='saveId']").keyup(function () {
      if ($("#userIdSave").is(":checked")) {
        // ID 저장하기를 체크한 상태라면,
        var userInputId = $("input[name='saveId']").val();
        setCookie("userInputId", userInputId, 7); // 7일 동안 쿠키 보관
      }
    });
  });

  function setCookie(cookieName, value, exdays) {
    var exdate = new Date();
    exdate.setDate(exdate.getDate() + exdays);
    var cookieValue = escape(value) + (exdays == null ? "" : "; expires=" + exdate.toGMTString());
    document.cookie = cookieName + "=" + cookieValue;
  }

  function deleteCookie(cookieName) {
    var expireDate = new Date();
    expireDate.setDate(expireDate.getDate() - 1);
    document.cookie = cookieName + "= " + "; expires=" + expireDate.toGMTString();
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

/***/ })

/******/ });
//# sourceMappingURL=bundle.js.map