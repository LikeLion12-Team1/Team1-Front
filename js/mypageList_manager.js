let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
const accessToken = getCookie("accessToken");

// 기존에 제공된 쿠키 설정 함수
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

// 기존에 제공된 쿠키 가져오는 함수
function getCookie(name) {
  var nameEQ = name + "=";
  var cookies = document.cookie.split(";");
  for (var i = 0; i < cookies.length; i++) {
    var cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1, cookie.length);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return cookie.substring(nameEQ.length, cookie.length);
    }
  }
  return null;
}

// 쿠키 삭제 함수 추가
function deleteCookie(name) {
  document.cookie = name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}

/* 크루원 삭제 */
document.addEventListener("DOMContentLoaded", function () {
  loadCrewMembers();

  // 로그아웃 버튼 이벤트 핸들러 추가
  const logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      window.location.href = "/html/login.html";
    });
  }
});
const deleteButtons = document.querySelectorAll(".member-delet-btn");
const modal = document.querySelector(".modal");
const confirmDeleteButton = document.getElementById("confirmDelete");
const cancelDeleteButton = document.getElementById("cancelDelete");

let currentListItem = null;

// 크루원 삭제 버튼 클릭 이벤트 처리
deleteButtons.forEach((button) => {
  button.addEventListener("click", function () {
    currentListItem = this.closest("li");
    modal.style.display = "block";
  });
});

// 크루원 목록 가져오기 및 표시
function loadCrewMembers() {
  fetch(API_SERVER_DOMAIN + `/api/v1/user/my/crew/${crew_name}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        const members =
          data.result.adminMemberPreviewList.adminMemberPreviewList;
        displayCrewMembers(members);
      } else {
        console.error("크루원 목록 조회 실패:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));
}

// 크루원 목록 UI에 표시하기
function displayCrewMembers(members) {
  const ul = document.querySelector(".member ul");
  ul.innerHTML = ""; // 기존 목록 비우기

  members.forEach((member) => {
    const li = document.createElement("li");
    li.classList.add("member-content");

    const img = document.createElement("img");
    img.src = `/img/mypage-yellow.png`;
    li.appendChild(img);

    const nickname = document.createElement("div");
    nickname.classList.add("member-content-nickname");
    nickname.textContent = member.nickname;
    li.appendChild(nickname);

    const deleteBtn = document.createElement("span");
    deleteBtn.classList.add("member-delet-btn");
    deleteBtn.innerHTML = `<i class="fa-solid fa-circle-xmark"></i>`;
    li.appendChild(deleteBtn);

    ul.appendChild(li);
  });

  // 삭제 버튼 이벤트 다시 연결
  const deleteButtons = document.querySelectorAll(".member-delet-btn");
  deleteButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const currentListItem = this.closest("li");
      const nickname = currentListItem
        .querySelector(".member-content-nickname")
        .textContent.trim();
      deleteCrewMember(nickname);
    });
  });
}

// 크루원 삭제 요청 함수
function deleteCrewMember(nickname) {
  fetch(API_SERVER_DOMAIN + `/api/v1/user/my/crew/${crew_name}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({
      nickname: nickname,
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        currentListItem.remove();
        console.log(`${nickname} 크루원이 삭제되었습니다.`);
      } else {
        console.error("크루원 삭제 실패:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));
}

// 취소 버튼 클릭 이벤트 처리
cancelDeleteButton.addEventListener("click", function () {
  modal.style.display = "none";
});
// 확인 버튼 클릭 이벤트 처리
confirmDeleteButton.addEventListener("click", function () {
  if (currentListItem) {
    const nickname = currentListItem
      .querySelector(".member-content-nickname")
      .textContent.trim();
    deleteCrewMember(nickname);
  }
  modal.style.display = "none";
});

// 모달 외부 클릭 시 모달 닫기
window.addEventListener("click", function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
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
