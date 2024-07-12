let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
const accessToken = getCookie("accessToken");
let availableTokens = 0;
let plantUnlocked = false;

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

// token 개수 업데이트 함수
function updateTokenCount(userCount) {
  availableTokens = userCount;
  const tokenElement = document.querySelector(".mypage-token span");
  const giftIcon = document.querySelector(".fa-solid.fa-gift");

  if (tokenElement && giftIcon) {
    tokenElement.textContent = `${userCount}/1`;
    if (userCount >= 1) {
      tokenElement.style.color = "#114232";
      giftIcon.style.color = "#114232";
    } else {
      tokenElement.style.color = "#c7c4c4";
      giftIcon.style.color = "#c7c4c4";
    }
  } else {
    console.error("Token element or gift icon not found.");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  if (!accessToken) {
    window.location.href = "/html/login.html";
    return;
  }

  // 서버에서 사용자 보유 토큰 수와 식물 목록 가져오기
  fetch(API_SERVER_DOMAIN + "/api/v1/plants", {
    method: "GET",
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok " + response.statusText);
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      if (data.isSuccess) {
        updateTokenCount(data.result.userCount); // token 개수 업데이트 호출

        let unlockedPlants = data.result.plantPreviewDtoList;
        console.log(unlockedPlants);

        populatePlants(unlockedPlants); // 식물 목록 업데이트 호출
      } else {
        console.error("데이터를 가져오는데 실패했습니다:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));

  // UI에 잠금 해제된 식물 목록 표시 함수
  function populatePlants(unlockedPlants) {
    const plantContainer = document.querySelector(".plant-container");

    unlockedPlants.forEach((plantId) => {
      const imgElement = document.querySelector(
        `img[plant_id="${plantId.plantId}"]`
      );
      imgElement.src = "/img/plant_unlock/" + plantId.plantId + ".png";
    });

    // radio 버튼 이벤트 핸들러 설정
    const radios = document.querySelectorAll('input[type="radio"]');

    radios.forEach((radio) => {
      radio.addEventListener("change", function () {
        // 사용 가능한 토큰이 있고, 데이터 언락 소스가 있으며, 식물이 해금되지 않은 상태인 경우
        if (availableTokens > 0 && this.dataset.unlockSrc && !plantUnlocked) {
          const selectedImg = this.previousElementSibling;
          selectedImg.src = this.dataset.unlockSrc;
          unlockPlant(this.getAttribute("plant_id"));
          availableTokens--;
          plantUnlocked = true;
          updateTokenCount(availableTokens);
          disableAllInputs();
        } else {
          this.checked = false;
          if (plantUnlocked) {
            console.log(
              "이미 식물을 해제했습니다. 더 이상 해제할 수 없습니다."
            );
          } else if (availableTokens === 0) {
            console.log("사용 가능한 토큰이 없습니다.");
          }
        }
      });
    });
  }

  // 식물 해금 함수
  function unlockPlant(plant_id) {
    fetch(API_SERVER_DOMAIN + `/api/v1/plants/unlock/${plant_id}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          console.log("식물이 성공적으로 해금되었습니다.");
          plantUnlocked = true;
        } else {
          console.error("식물 해금에 실패했습니다:", data.message);
          plantUnlocked = false;
          availableTokens++;
          updateTokenCount(availableTokens);
          enableAllInputs();
        }
      })
      .catch((error) => {
        console.error("에러:", error);
        plantUnlocked = false;
        availableTokens++;
        updateTokenCount(availableTokens);
        enableAllInputs();
      });
  }

  // 로그아웃 버튼 이벤트 핸들러 설정
  const logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      window.location.href = "/html/login.html";
    });
  }

  function disableAllInputs() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      if (radio.dataset.unlockSrc) {
        radio.disabled = true;
      }
    });
  }

  function enableAllInputs() {
    const radios = document.querySelectorAll('input[type="radio"]');
    radios.forEach((radio) => {
      if (radio.dataset.unlockSrc) {
        radio.disabled = false;
      }
    });
  }
});
