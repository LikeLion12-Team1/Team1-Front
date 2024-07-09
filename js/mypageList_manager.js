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
      currentListItem.remove();
      modal.style.display = "none";
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
      const listItem = this.closest("li");
      const postId = listItem.getAttribute("id");
      if (postId) {
        window.location.href = `/community/${postId}`;
      }
    });
  });
});
