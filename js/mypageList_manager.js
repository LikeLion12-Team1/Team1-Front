let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
accesstoken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaml5ZW9uMjdAbmF2ZXIuY29tIiwiaWF0IjoxNzIwNjA4Mzk5LCJleHAiOjE3MjA2OTQ3OTl9.XFE_tEyPfGl2jkaIaOZqgR840rwX5FHX-SaTV2TA7Hk";

/* 크루원 삭제 */
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".member-delet-btn");
  const modal = document.querySelector(".modal");
  const confirmDeleteButton = document.getElementById("confirmDelete");
  const cancelDeleteButton = document.getElementById("cancelDelete");

  let currentListItem = null;

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      currentListItem = this.closest("li");
      modal.style.display = "block";
    });
  });

  cancelDeleteButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

  confirmDeleteButton.addEventListener("click", function () {
    if (currentListItem) {
    }
  });

  window.addEventListener("click", function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  });
});

/* 각 커뮤니티 게시물로 이동 */

document.addEventListener("DOMContentLoaded", function () {
  const moveToCommunityButtons = document.querySelectorAll(".moveToCommunity");

  moveToCommunityButtons.forEach((button) => {
    button.addEventListener("click", function () {
      window.location.href = "/html/community_manager.html";
    });
  });
});
