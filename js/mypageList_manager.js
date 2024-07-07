/* 크루원 삭제 */
document.addEventListener("DOMContentLoaded", function () {
  const deleteButtons = document.querySelectorAll(".member-delet-btn");

  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const listItem = this.closest("li");
      if (confirm("정말 크루원을 삭제하시겠습니까?")) {
        listItem.remove();
      }
    });
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
