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
        openUserInfo(userIcon);
      } else {
        closeUserInfo();
      }
    });
  }
});

/* 쿠키 관련 함수들 */
function setCookie(name, value, days) {
  var expires = "";
  if (days) {
    var date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + value + expires + "; path=/";
}

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

function deleteCookie(name) {
  document.cookie = name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}

// 사용자 정보를 가져오고 팝업을 여는 함수
function openUserInfo(triggerElement) {
  let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
  const accessToken = getCookie("accessToken");

  fetch(API_SERVER_DOMAIN + "/api/v1/user/profile", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      if (data.isSuccess) {
        const result = data.result;
        const nickname = result.nickname;
        const profileImg = result.profileImg || "/img/user-profile.png";
        const crewName =
          result.crewPreviewList.crewPreviewList.length > 0
            ? result.crewPreviewList.crewPreviewList[0].crewName
            : "";

        createUserInfoPopup(triggerElement, nickname, profileImg, crewName);
      } else {
        console.error("API request failed");
      }
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
}

// 사용자 정보를 표시하는 팝업을 생성하는 함수
function createUserInfoPopup(triggerElement, nickname, profileImg, crewName) {
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
  nicknameElement.textContent = nickname;
  nicknameElement.style.fontSize = "16px";
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
  profileChangeLink.href = "/html/profileChange.html";
  profileChangeLink.textContent = "프로필 변경";
  profileChangeLink.style.fontSize = "13px";
  profileChangeLink.style.color = "#666666";
  linkContainer.appendChild(profileChangeLink);

  const logoutLink = document.createElement("a");
  logoutLink.href = "/html/login.html";
  logoutLink.textContent = "로그아웃";
  logoutLink.style.fontSize = "13px";
  logoutLink.style.color = "#FD5E53";
  linkContainer.appendChild(logoutLink);

  popup.appendChild(linkContainer);

  const iconRect = triggerElement.getBoundingClientRect();
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
