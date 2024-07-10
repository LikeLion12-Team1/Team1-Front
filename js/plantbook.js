let API_SERVER_DOMAIN = "http://15.164.41.239:8080";

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

document.addEventListener("DOMContentLoaded", function () {
  const accessToken = getCookie("accessToken");

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
      if (data.isSuccess) {
        updateTokenCount(data.result.holdingTokens); // token 개수 업데이트 호출
        populatePlants(data.result.plantPreviewDtoList); // 식물 목록 업데이트 호출
      } else {
        console.error("데이터를 가져오는데 실패했습니다:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));

  // token 개수 업데이트 함수
  function updateTokenCount(tokenCount) {
    const tokenElement = document.querySelector(".mypage-token span");
    tokenElement.textContent = `${tokenCount}/1`;
    if (tokenCount >= 1) {
      tokenElement.style.color = "#114232";
    }
  }

  // 식물 목록 업데이트 함수
  function populatePlants(plantList) {
    const plantContainers = {
      TREE: document.querySelector(".pb-green ul"),
      FLOWER: document.querySelector(".pb-white ul"),
      FRUIT: document.querySelector(".pb-green2 ul"),
      VEGETABLE: document.querySelector(".pb-white2 ul"),
    };

    // 식물 목록을 각 카테고리에 맞게 채움
    plantList.forEach((plant) => {
      const li = document.createElement("li");

      const img = document.createElement("img");
      img.src =
        plant.isLocked === "1"
          ? `/img/plant_unlock/${plant.type}.png`
          : `/img/plant_lock/${plant.type}_lock.png`;

      const radio = document.createElement("input");
      radio.type = "radio";
      radio.value = plant.type;
      if (plant.isLocked === "0") {
        radio.dataset.unlockSrc = `/img/plant_unlock/${plant.type}.png`;
      }

      li.appendChild(img);
      li.appendChild(radio);
      plantContainers[plant.type.toUpperCase()].appendChild(li);
    });
  }

  // radio 버튼 이벤트 핸들러 설정
  const radios = document.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const selectedImg = this.previousElementSibling;
      const selectedUnlockSrc = this.dataset.unlockSrc;
      if (selectedUnlockSrc) {
        selectedImg.src = selectedUnlockSrc;
        unlockPlant(this.value);
      }
    });
  });

  // 식물 해금 함수
  function unlockPlant(plantId) {
    fetch(API_SERVER_DOMAIN + `/api/v1/plants/unlock/${plantId}`, {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          console.log("식물이 성공적으로 해금되었습니다.");
        } else {
          console.error("식물 해금에 실패했습니다:", data.message);
        }
      })
      .catch((error) => console.error("에러:", error));
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
});
