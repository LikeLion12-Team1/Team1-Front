let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
accesstoken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaml5ZW9uMjdAbmF2ZXIuY29tIiwiaWF0IjoxNzIwNjA4Mzk5LCJleHAiOjE3MjA2OTQ3OTl9.XFE_tEyPfGl2jkaIaOZqgR840rwX5FHX-SaTV2TA7Hk";

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
  const nicknameInput = document.querySelector(".nickname-input");
  const nickname = nicknameInput.value.trim();

  if (nickname === "") {
    alert("닉네임을 입력해주세요.");
    return;
  }

  checkNickname(nickname)
    .then((isAvailable) => {
      showDuplicateMessage(isAvailable);
      if (isAvailable) {
        setButtonStyle("#C7C4C4");
      } else {
        restoreButtonStyle();
      }
      duplicateCheckMsg.style.display = "block";
    })
    .catch((error) => {
      console.error("닉네임 확인 중 오류가 발생했습니다.", error);
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
function checkNickname(nickname) {
  return fetch(API_SERVER_DOMAIN + `/api/v1/user/check/${nickname}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accesstoken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to check nickname");
      }
      return response.json();
    })
    .then((data) => {
      if (data.isSuccess) {
        if (data.result === "해당 닉네임을 사용할 수 있습니다.") {
          console.log("중복확인 성공");
          return true;
        } else if (data.result === "이미 존재하는 닉네임입니다.") {
          console.log("중복확인 실패");
          return false;
        } else {
          throw new Error("Unexpected response format");
        }
      } else {
        throw new Error("API 응답 실패");
      }
    })
    .catch((error) => {
      console.error("닉네임 확인 오류: ", error);
      throw error;
    });
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

function leaveCrew(crewName) {
  console.log("leaveCrew 호출됨:", crewName);
  return fetch(API_SERVER_DOMAIN + `/api/v1/user/profile/${crewName}`, {
    method: "DELETE",
    headers: {
      Authorization: "Bearer " + accesstoken,
    },
  })
    .then((response) => {
      console.log("서버 응답 상태 코드:", response.status);
      if (!response.ok) {
        throw new Error("크루 탈퇴에 실패했습니다.");
      }
      return response.json();
    })
    .then((data) => {
      console.log("서버 응답 데이터:", data);
      if (data.isSuccess) {
        return true;
      } else {
        return false;
      }
    })
    .catch((error) => {
      console.error("크루 탈퇴 오류: ", error);
      throw error;
    });
}

window.onload = function () {
  const crewListContainer = document.getElementById("crew-list");

  crews.forEach(function (crewName) {
    const crewElement = createCrewElement(crewName);
    crewListContainer.appendChild(crewElement);
  });
};

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
    modal.style.display = "block";

    const confirmButton = document.getElementById("confirmSecession");
    const cancelButton = document.getElementById("cancelSecession");

    confirmButton.onclick = function () {
      leaveCrew(crewName)
        .then((success) => {
          if (success) {
            leaveButton.textContent = "탈퇴완료";
            leaveButton.style.color = "#C7C4C4";
            leaveButton.style.borderColor = "#C7C4C4";
          } else {
            console.error("크루 탈퇴 실패");
          }
        })
        .catch((error) => {
          console.error("크루 탈퇴 오류:", error);
        });

      modal.style.display = "none";
    };

    cancelButton.onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  });

  crewElement.appendChild(inputField);
  crewElement.appendChild(leaveButton);

  return crewElement;
}
