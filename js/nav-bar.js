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

function openUserInfo(triggerElement) {
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
  profileImage.src = "/img/user-profile.png";
  profileImage.style.width = "89px";
  profileImage.style.height = "89px";
  profileImage.style.marginBottom = "15px";
  popup.appendChild(profileImage);

  const nickname = document.createElement("div");
  nickname.textContent = "SCREW1";
  nickname.style.fontSize = "32px";
  nickname.style.fontWeight = 700;
  nickname.style.color = "#FD5E53";
  nickname.style.marginBottom = "15px";
  popup.appendChild(nickname);

  const crewName = document.createElement("div");
  crewName.textContent = "상명크루";
  crewName.style.fontSize = "16px";
  crewName.style.fontWeight = 400;
  crewName.style.color = "#666666";
  crewName.style.marginBottom = "30px";
  popup.appendChild(crewName);

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
