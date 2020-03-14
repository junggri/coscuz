// window.onload = function() {
// $("html,body").animate({ scrollTop: 0 }, 300);
// };
$(".nav-bar_login").on("click", function() {
  location.href = "/auth/login";
});
$(".nav-bar_register").on("click", function() {
  location.href = "/auth/register";
});
$(".icon-torso").on("click", function() {
  location.href = "/auth/logout_process";
});
$(".nav-bar_name").on("click", () => {
  location.href = "/";
});
