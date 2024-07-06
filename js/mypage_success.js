document.addEventListener("DOMContentLoaded", function () {
  var overlay = document.getElementById("overlay");
  var closePopup = document.querySelector(".closePopup");
  var moveToPlantbook = document.querySelector(".moveToPlantbook");

  overlay.style.visibility = "visible";

  closePopup.addEventListener("click", function () {
    overlay.style.visibility = "hidden";
  });

  moveToPlantbook.addEventListener("click", function () {
    window.location.href = "/html/plantbook.html";
  });
});
