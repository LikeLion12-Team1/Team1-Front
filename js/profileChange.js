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

/* 크루탈퇴 버튼 */
const leaveCrewBtn = document.querySelector(".leave-crew-btn");
leaveCrewBtn.addEventListener("click", function () {
  const confirmed = confirm("정말 탈퇴하시겠습니까?");

  if (confirmed) {
    leaveCrewBtn.textContent = "탈퇴완료";
    leaveCrewBtn.style.color = "#C7C4C4";
    leaveCrewBtn.style.borderColor = "#C7C4C4";
  }
});
