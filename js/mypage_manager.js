document.addEventListener("DOMContentLoaded", function () {
  var managerIcons = document.querySelectorAll(".manager-icon");

  managerIcons.forEach(function (icon) {
    icon.addEventListener("click", function () {
      var managerPageUrl = "/html/mypageList_manager.html";
      window.location.href = managerPageUrl;
    });
  });
});
