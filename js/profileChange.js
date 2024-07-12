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

// 프로필 정보 불러오기
function fetchProfileInfo() {
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
        updateProfileUI(data.result);
      } else {
        console.error("데이터를 가져오는데 실패했습니다:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));
}

function updateProfileUI(profileData) {
  const { profileImg, nickname, region, crewPreviewList } = profileData;

  document.querySelector(".profile-img").src = profileImg;
  document.querySelector(".nickname-input").value = nickname;

  const areaBtns = document.querySelectorAll(".area-btn");
  areaBtns.forEach((btn) => {
    if (btn.textContent === region) {
      btn.style.backgroundColor = "#fd5e53";
      btn.style.color = "white";
    }
  });

  const crewListContainer = document.getElementById("crew-list");
  crewListContainer.innerHTML = "";
  crewPreviewList.crewPreviewList.forEach((crew) => {
    const crewElement = createCrewElement(crew.crewName);
    crewListContainer.appendChild(crewElement);
  });
}

// 프로필 이미지 변경 시 이벤트 처리
const profileEditInput = document.getElementById("profile-edit-input");

profileEditInput.addEventListener("change", function () {
  const selectedFile = profileEditInput.files[0];
  const reader = new FileReader();
  reader.onload = function (event) {
    document.querySelector(".profile-img").src = event.target.result;
    uploadProfileImage(selectedFile);
  };
  reader.readAsDataURL(selectedFile);
});

// 프로필 이미지 업로드 함수
function uploadProfileImage(file) {
  const formData = new FormData();
  formData.append("file", file);

  fetch(API_SERVER_DOMAIN + "/api/v1/user/profile-image", {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
    body: formData,
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        console.log("프로필 이미지가 성공적으로 업데이트되었습니다.");
      } else {
        console.error("프로필 이미지 업데이트 실패:", data.message);
      }
    })
    .catch((error) => {
      console.error("프로필 이미지 업데이트 중 오류 발생:", error);
    });
}

// 닉네임 중복 확인
const duplicateCheckBtn = document.querySelector(".duplicate-check-btn");
duplicateCheckBtn.addEventListener("click", function () {
  const nickname = document.querySelector(".nickname-input").value.trim();

  if (nickname === "") {
    alert("닉네임을 입력해주세요.");
    return;
  }

  checkNickname(nickname)
    .then((isAvailable) => {
      showDuplicateMessage(isAvailable);
      setButtonStyle(isAvailable ? "#C7C4C4" : "");
    })
    .catch((error) => {
      console.error("닉네임 확인 중 오류가 발생했습니다.", error);
    });
});

// 중복확인 메세지 표시
function showDuplicateMessage(isAvailable) {
  if (isAvailable) {
    duplicateCheckMsg.innerHTML =
      '<i class="fa-solid fa-circle-check"></i> 사용 가능한 닉네임입니다.';
  } else {
    duplicateCheckMsg.innerHTML =
      '<i class="fa-solid fa-circle-xmark"></i> 사용 불가능한 닉네임입니다.';
  }
}

// 닉네임 확인 함수
function checkNickname(nickname) {
  return fetch(API_SERVER_DOMAIN + `/api/v1/user/check/${nickname}`, {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        return data.result === "해당 닉네임을 사용할 수 있습니다.";
      } else {
        throw new Error("API 응답 실패");
      }
    })
    .catch((error) => {
      console.error("닉네임 확인 오류: ", error);
      throw error;
    });
}

function showDuplicateMessage(isAvailable) {
  const duplicateCheckMsg = document.getElementById("duplicate-check-msg");
  duplicateCheckMsg.innerHTML = isAvailable
    ? '<i class="fa-solid fa-circle-check"></i> 사용 가능한 닉네임입니다.'
    : '<i class="fa-solid fa-circle-xmark"></i> 사용 불가능한 닉네임입니다.';
  duplicateCheckMsg.style.display = "block";
}

function setButtonStyle(color) {
  duplicateCheckBtn.style.color = color;
  duplicateCheckBtn.style.borderColor = color;
}

// 크루 관련 함수
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
  leaveButton.addEventListener("click", () =>
    showLeaveCrewModal(crewName, leaveButton)
  );

  crewElement.appendChild(inputField);
  crewElement.appendChild(leaveButton);

  return crewElement;
}

function showLeaveCrewModal(crewName, leaveButton) {
  const modal = document.querySelector(".modal");
  modal.style.display = "block";

  document.getElementById("confirmSecession").onclick = function () {
    leaveCrew(crewName, leaveButton)
      .then((success) => {
        if (success) {
          leaveButton.textContent = "탈퇴완료";
          leaveButton.style.color = "#C7C4C4";
          leaveButton.style.borderColor = "#C7C4C4";
          leaveButton.disabled = true;
        }
      })
      .catch((error) => console.error("크루 탈퇴 오류:", error));
    modal.style.display = "none";
  };

  document.getElementById("cancelSecession").onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}

// 크루 탈퇴 요청 함수
function leaveCrew(crewName, leaveButton) {
  return fetch(API_SERVER_DOMAIN + `/api/v1/user/profile/${crewName}`, {
    method: "POST",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => response.json())
    .then((data) => {
      return data.isSuccess && data.result === "탈퇴 완료";
    });
}

// 프로필 변경 저장
document
  .querySelector(".profileChange-complete-btn")
  .addEventListener("click", saveProfileChanges);

function saveProfileChanges() {
  const nickname = document.querySelector(".nickname-input").value.trim();
  const userRegion = document
    .querySelector(".area-btn[style*='background-color: rgb(253, 94, 83)']")
    .textContent.trim();
  const quitCrewName =
    Array.from(document.querySelectorAll(".crew-input"))
      .find((input) => input.value.trim() !== "")
      ?.value.trim() || "";

  fetch(API_SERVER_DOMAIN + "/api/v1/user/profile", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + accessToken,
    },
    body: JSON.stringify({ nickname, region: userRegion, quitCrewName }),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        console.log("프로필 정보가 성공적으로 저장되었습니다.");
        window.location.href = "/html/home.html";
      } else {
        console.error("프로필 정보 저장에 실패했습니다:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));
}

// 로그아웃
document.querySelector(".logout-button")?.addEventListener("click", () => {
  deleteCookie("accessToken");
  deleteCookie("refreshToken");
  window.location.href = "/html/login.html";
});

// 초기화
document.addEventListener("DOMContentLoaded", function () {
  fetchProfileInfo();

  const areaBtns = document.querySelectorAll(".area-btn");
  areaBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      areaBtns.forEach((btn) => {
        btn.style.backgroundColor = "";
        btn.style.color = "";
      });
      this.style.backgroundColor = "#fd5e53";
      this.style.color = "white";
    });
  });
});
