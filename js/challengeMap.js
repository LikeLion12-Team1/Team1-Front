document.addEventListener("DOMContentLoaded", function () {
  let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
  const accessToken = getCookie("accessToken");

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
    document.cookie =
      name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
  }

  /* 로그아웃 버튼 이벤트 핸들러 */
  const logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      window.location.href = "/html/login.html";
    });
  }

  /* 지도 생성 */
  var mapContainer = document.getElementById("map");
  var mapOptions = {
    center: new kakao.maps.LatLng(37.54699, 127.09598), // 초기 지도 중심 좌표
    level: 3, // 지도의 초기 확대 레벨
  };

  var map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성

  var markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커 위치
  var markerImage = new kakao.maps.MarkerImage(
    "/img/marker.png",
    new kakao.maps.Size(39, 56),
    { offset: new kakao.maps.Point(27, 69) }
  );

  var marker = new kakao.maps.Marker({
    position: markerPosition,
    image: markerImage,
  });

  marker.setMap(map); // 마커를 지도에 표시

  /* 드롭다운 스타일 업데이트 */
  const dropdowns = document.querySelectorAll(".dropdown");

  dropdowns.forEach((dropdown) => {
    dropdown.addEventListener("change", function () {
      updateSelectedOptionStyle(this);
    });
  });

  function updateSelectedOptionStyle(dropdown) {
    dropdown.querySelectorAll("option").forEach((option) => {
      option.removeAttribute("selected");
    });

    const selectedOption = dropdown.options[dropdown.selectedIndex];
    selectedOption.setAttribute("selected", "");
  }

  /* sidebar item 새로고침 */
  const rotateIcon = document.getElementById("rotate-icon");
  rotateIcon.addEventListener("click", function () {
    refreshSidebarItems();
  });

  function refreshSidebarItems() {
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    sidebarItems.forEach((item) => {
      console.log("Refreshing sidebar item:", item);
    });
  }

  /* challenge-item-wrap 슬라이드 기능 */
  const prevButton = document.querySelector(".btn-prev");
  const nextButton = document.querySelector(".btn-next");
  const challengeItemWrap = document.querySelector(".challenge-item-wrap");
  const slides = document.querySelectorAll(".challenge-item");
  const slideWidth = 400;
  const visibleSlides = 3;
  let currentIndex = 0;

  updateButtonState();

  prevButton.addEventListener("click", function () {
    if (currentIndex > 0) {
      currentIndex--;
      updateSlide();
    }
  });

  nextButton.addEventListener("click", function () {
    if (currentIndex < slides.length - visibleSlides) {
      currentIndex++;
      updateSlide();
    }
  });

  function updateSlide() {
    challengeItemWrap.style.transform = `translateX(-${
      currentIndex * slideWidth
    }px)`;
    updateButtonState();
  }

  function updateButtonState() {
    prevButton.disabled = currentIndex === 0;
    nextButton.disabled = currentIndex >= slides.length - visibleSlides;

    prevButton.style.opacity = prevButton.disabled ? "0.5" : "1";
    nextButton.style.opacity = nextButton.disabled ? "0.5" : "1";
  }

  /* 챌린지 목록 조회 및 렌더링 */
  const challengeItemWrapSidebar = document.querySelector(".sidebar-item-wrap");

  fetchChallengeList();

  function fetchChallengeList() {
    fetch(API_SERVER_DOMAIN + `/api/v1/challenge`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          const challenges = data.result;
          renderSidebarChallenges(challenges);
        } else {
          console.error("Failed to fetch challenge list:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching challenge list:", error);
      });
  }

  function renderSidebarChallenges(challenges) {
    challengeItemWrapSidebar.innerHTML = "";

    challenges.forEach((challenge, index) => {
      const item = document.createElement("div");
      item.classList.add("sidebar-item");
      item.innerHTML = `
        <div class="item-title">${challenge.notice}</div>
        <div>
          <span class="info-click">정보보기</span>
          <span style="color: #c7c4c4">|</span>
          <span class="share-click">공유하기</span>
        </div>

        <div class="crew-selector">
          <ul>
            <li>
              <label><input type="radio" name="crew" value="A" /> A크루</label>
            </li>
            <li>
              <label><input type="radio" name="crew" value="B" /> B크루</label>
            </li>
            <li>
              <label><input type="radio" name="crew" value="C" /> C크루</label>
            </li>
            <button id="crew-selector-btn">공유</button>
          </ul>
        </div>
        <div class="info-display">
          <div>
            <i class="fa-solid fa-calendar-days"></i> ${challenge.startAt} ~ ${challenge.untilWhen}
          </div>
          <div>
            <i class="fa-solid fa-person-running"></i> ${challenge.notice}
          </div>
          <div>
            <i class="fa-solid fa-user-group"></i> 참여 인원: ${challenge.memberCount}명
          </div>
        </div>
      `;
      challengeItemWrapSidebar.appendChild(item);
      challengeItemWrapSidebar.style.overflowY = "auto";

      const shareButton = item.querySelector(".share-click");
      const crewSelector = item.querySelector(".crew-selector");
      const infoButton = item.querySelector(".info-click");
      const infoDisplay = item.querySelector(".info-display");

      shareButton.addEventListener("click", function (event) {
        event.stopPropagation();

        document.querySelectorAll(".crew-selector").forEach((selector) => {
          if (selector !== crewSelector) {
            selector.classList.remove("show");
          }
        });

        document.querySelectorAll(".info-display").forEach((display) => {
          if (display !== infoDisplay) {
            display.classList.remove("show");
          }
        });

        crewSelector.classList.toggle("show");
        infoDisplay.classList.remove("show");
      });

      infoButton.addEventListener("click", function (event) {
        event.stopPropagation();

        // 현재 정보보기 팝업이 열려 있는지 확인하고 열려 있다면 닫기
        if (infoDisplay.classList.contains("show")) {
          infoDisplay.classList.remove("show");
        } else {
          // 모든 정보보기 팝업 닫기
          document.querySelectorAll(".info-display").forEach((display) => {
            if (display !== infoDisplay) {
              display.classList.remove("show");
            }
          });

          // 팝업 열기
          infoDisplay.classList.add("show");
        }

        document.querySelectorAll(".crew-selector").forEach((selector) => {
          if (selector !== crewSelector) {
            selector.classList.remove("show");
          }
        });

        crewSelector.classList.remove("show");
      });

      document.addEventListener("click", function (event) {
        const isClickedOutsideCrew =
          !item.contains(event.target) && event.target !== shareButton;
        const isClickedOutsideInfo =
          !item.contains(event.target) && event.target !== infoButton;

        if (isClickedOutsideCrew) {
          crewSelector.classList.remove("show");
        }

        if (isClickedOutsideInfo) {
          infoDisplay.classList.remove("show");
        }
      });
    });
  }
});
