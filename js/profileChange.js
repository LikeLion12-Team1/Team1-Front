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

/* 활동지역 선택 */
document.addEventListener("DOMContentLoaded", function () {
  const areaBtns = document.querySelectorAll(".area-btn");

  areaBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      areaBtns.forEach(function (btn) {
        btn.style.backgroundColor = "";
        btn.style.color = "";
      });

      btn.style.backgroundColor = "#fd5e53";
      btn.style.color = "white";
    });
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
    const modal = document.querySelector(".modal");
    const confirmButton = document.getElementById("confirmSecession");
    const cancelButton = document.getElementById("cancelSecession");

    // 모달 열기
    modal.style.display = "block";

    confirmButton.onclick = function () {
      leaveButton.textContent = "탈퇴완료";
      leaveButton.style.color = "#C7C4C4";
      leaveButton.style.borderColor = "#C7C4C4";
      // 실제 탈퇴 동작 추가
      modal.style.display = "none"; // 모달 닫기
    };

    cancelButton.onclick = function () {
      modal.style.display = "none"; // 모달 닫기
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none"; // 모달 닫기
      }
    };
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
