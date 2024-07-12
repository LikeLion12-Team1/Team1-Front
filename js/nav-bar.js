//let API_SERVER_DOMAIN = "http://15.164.41.239:8080";

/* 네비게이션 링크 클릭 이벤트 */
document.addEventListener("DOMContentLoaded", function () {
  const navLinks = document.querySelectorAll(".nav-link");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const href = this.getAttribute("href");
      if (href) {
        window.location.href = href;
      }
    });
  });

  /* 사용자 아이콘 눌렀을 때 */
  const userIcon = document.querySelector(".user-icon");
  if (userIcon) {
    let isClicked = false;

    userIcon.addEventListener("click", function () {
      isClicked = !isClicked;
      userIcon
        .querySelector("path")
        .setAttribute("fill", isClicked ? "#fd5e53" : "#1C1C1C");
      if (isClicked) {
        displayUserInfo(userIcon);
      } else {
        closeUserInfo();
      }
    });
  }
});

function fetchUserProfile() {
  fetch(API_SERVER_DOMAIN + "/api/v1/user/profile")
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        const { nickname, profileImg, crewPreviewList } = data.result;
        const crewName = crewPreviewList?.crewPreviewList[0]?.crewName || "";
        const displayProfileImg = profileImg
          ? API_SERVER_DOMAIN + profileImg
          : "/img/user-profile.png";

        displayUserInfo(nickname, profileImg, crewName);
      } else {
        console.error("사용자 프로필 가져오기 실패:", data.message);
      }
    })
    .catch((error) => {
      console.error("사용자 프로필 가져오기 에러:", error);
    });
}

function displayUserInfo(nickname, profileImg, crewName) {
  const existingPopup = document.querySelector(".user-info-popup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }

  const popup = document.createElement("div");
  popup.className = "user-info-popup";
  popup.style.width = "204px";
  popup.style.height = "270px";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid #C7C4C4";
  popup.style.borderRadius = "5px";
  popup.style.display = "flex";
  popup.style.flexDirection = "column";
  popup.style.alignItems = "center";
  popup.style.justifyContent = "center";
  popup.style.padding = "40px";
  popup.style.boxSizing = "border-box";
  popup.style.position = "absolute";

  const profileImage = document.createElement("img");
  profileImage.src = profileImg;
  profileImage.style.width = "89px";
  profileImage.style.height = "89px";
  profileImage.style.marginBottom = "15px";
  popup.appendChild(profileImage);

  const nicknameElement = document.createElement("div");
  nicknameElement.textContent = "SCREW1";
  nicknameElement.style.fontSize = "32px";
  nicknameElement.style.fontWeight = 700;
  nicknameElement.style.color = "#FD5E53";
  nicknameElement.style.marginBottom = "15px";
  popup.appendChild(nicknameElement);

  const crewNameElement = document.createElement("div");
  crewNameElement.textContent = crewName;
  crewNameElement.style.fontSize = "16px";
  crewNameElement.style.fontWeight = 400;
  crewNameElement.style.color = "#666666";
  crewNameElement.style.marginBottom = "30px";
  popup.appendChild(crewNameElement);

  const linkContainer = document.createElement("div");
  linkContainer.style.display = "flex";
  linkContainer.style.justifyContent = "space-between";
  linkContainer.style.width = "136px";

  const profileChangeLink = document.createElement("a");
  profileChangeLink.href = API_SERVER_DOMAIN + "/html/profileChange.html";
  profileChangeLink.textContent = "프로필 변경";
  profileChangeLink.style.fontSize = "13px";
  profileChangeLink.style.color = "#666666";
  linkContainer.appendChild(profileChangeLink);

  const logoutLink = document.createElement("a");
  logoutLink.href = API_SERVER_DOMAIN + "/html/login.html";
  logoutLink.textContent = "로그아웃";
  logoutLink.style.fontSize = "13px";
  logoutLink.style.color = "#FD5E53";
  linkContainer.appendChild(logoutLink);

  popup.appendChild(linkContainer);

  const iconRect = document.querySelector(".user-icon").getBoundingClientRect();
  const popupWidth = 204;
  const popupHeight = 270;
  const popupLeft = iconRect.left - 50 + (iconRect.width - popupWidth) / 2;
  const popupTop = iconRect.bottom + 10;

  popup.style.left = `${popupLeft}px`;
  popup.style.top = `${popupTop}px`;

  popup.style.zIndex = "999";

  document.body.appendChild(popup);
}

function closeUserInfo() {
  const existingPopup = document.querySelector(".user-info-popup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
  }
}
