/* path 눌렀을 때 */
function openUserInfo() {
  const existingPopup = document.querySelector(".user-info-popup");
  if (existingPopup) {
    document.body.removeChild(existingPopup);
    return;
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
  popup.style.position = "relative";

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
  logoutLink.href = "#";
  logoutLink.textContent = "로그아웃";
  logoutLink.style.fontSize = "13px";
  logoutLink.style.color = "#FD5E53";
  linkContainer.appendChild(logoutLink);

  popup.appendChild(linkContainer);

  const svgIcon = document.querySelector("svg");
  const iconRect = svgIcon.getBoundingClientRect();

  popup.style.position = "absolute";
  popup.style.left = `${iconRect.right - 120}px`;
  popup.style.top = `${iconRect.bottom + 5}px`;

  document.body.appendChild(popup);
}
const pathButton = document.querySelector("path");
pathButton.addEventListener("click", openUserInfo);

/* 프로필사진 변경 */
const profileEditInput = document.getElementById("profile-edit-input");
const profileImg = document.querySelector(".profile-img");

profileEditInput.addEventListener("change", function () {
  const selectedFile = profileEditInput.files[0];

  const reader = new FileReader();
  reader.onload = function (event) {
    profileImg.src = event.target.result;
  };

  reader.readAsDataURL(selectedFile);
});

/* 중복확인 버튼 */
const duplicateCheckMsg = document.getElementById("duplicate-check-msg");
const duplicateCheckBtn = document.querySelector(".duplicate-check-btn");

duplicateCheckBtn.addEventListener("click", function () {
  // 중복 검사
  const nicknameInput = document.querySelector(".nickname-input");
  const enteredNickname = nicknameInput.value.trim();

  if (enteredNickname === "") {
    alert("닉네임을 입력해주세요.");
    return;
  }

  checkNicknameAvailability(enteredNickname)
    .then((isAvailable) => {
      if (isAvailable) {
        showDuplicateMessage(true);
        setButtonStyle("#C7C4C4");
      } else {
        showDuplicateMessage(false);
        restoreButtonStyle();
      }
      duplicateCheckMsg.style.display = "block";
    })
    .catch((error) => {
      console.error("Error checking nickname:", error);
    });
});

// 메세지 표시
function showDuplicateMessage(isAvailable) {
  if (isAvailable) {
    duplicateCheckMsg.innerHTML =
      '<i class="fa-solid fa-circle-check"></i> 사용 가능한 닉네임입니다.';
  } else {
    duplicateCheckMsg.innerHTML =
      '<i class="fa-solid fa-circle-xmark"></i> 사용 불가능한 닉네임입니다.';
  }
}
// 버튼 스타일 설정
function setButtonStyle(color) {
  duplicateCheckBtn.style.color = color;
  duplicateCheckBtn.style.borderColor = color;
}
// 버튼 스타일 복원
function restoreButtonStyle() {
  duplicateCheckBtn.style.color = "";
  duplicateCheckBtn.style.borderColor = "";
}

// api 호출 함수
function checkNicknameAvailability(nickname) {
  return;
}

/* 활동지역 버튼 */
document.querySelectorAll(".area-btn").forEach((button) => {
  button.addEventListener("click", function () {
    document.querySelectorAll(".area-btn").forEach((btn) => {
      btn.classList.remove("active");
    });

    this.classList.add("active");
  });
});

/* 크루 추가 및 탈퇴 */
const crews = ["크루1", "크루2"]; // 실제 데이터에 맞게 수정

function createCrewElement(crewName) {
  const crewElement = document.createElement("div");
  crewElement.classList.add("profileChange_middle-content");

  const inputField = document.createElement("input");
  inputField.type = "text";
  inputField.classList.add("crew-input");
  inputField.value = crewName;

  const leaveButton = document.createElement("button");
  leaveButton.classList.add("leave-crew-btn");
  leaveButton.textContent = "크루탈퇴";

  // 탈퇴 버튼 클릭 시
  leaveButton.addEventListener("click", function () {
    const confirmed = confirm("정말 탈퇴하시겠습니까?");

    if (confirmed) {
      leaveButton.textContent = "탈퇴완료";
      leaveButton.style.color = "#C7C4C4";
      leaveButton.style.borderColor = "#C7C4C4";
      // 실제 탈퇴 동작 추가
    }
  });

  crewElement.appendChild(inputField);
  crewElement.appendChild(leaveButton);

  return crewElement;
}

window.onload = function () {
  const crewListContainer = document.getElementById("crew-list");

  crews.forEach(function (crewName) {
    const crewElement = createCrewElement(crewName);
    crewListContainer.appendChild(crewElement);
  });
};
