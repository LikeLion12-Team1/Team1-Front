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
    center: new kakao.maps.LatLng(37.6017, 126.9553), // 초기 지도 중심 좌표
    level: 7, // 지도의 초기 확대 레벨
  };

  var map = new kakao.maps.Map(mapContainer, mapOptions); // 지도 생성

  // 각 도시의 마커 정보 배열
  var markerData = [
    { position: new kakao.maps.LatLng(37.5663, 126.9778), title: "서울시청" },
    {
      position: new kakao.maps.LatLng(37.6017, 126.9553),
      title: "상명대 서울캠퍼스",
    },
    {
      position: new kakao.maps.LatLng(36.8242, 127.1652),
      title: "상명대 천안캠퍼스",
    },
    {
      position: new kakao.maps.LatLng(37.3245, 127.0948),
      title: "수지 성복역",
    },
    {
      position: new kakao.maps.LatLng(38.2016, 128.5606),
      title: "속초 해수욕장",
    },
    { position: new kakao.maps.LatLng(36.3333, 127.4344), title: "대전역" },
    {
      position: new kakao.maps.LatLng(35.1633, 129.1605),
      title: "부산 해운대해수욕장",
    },
    { position: new kakao.maps.LatLng(35.8776, 128.6289), title: "대구역" },
  ];

  var markerImage = new kakao.maps.MarkerImage(
    "/img/marker.png",
    new kakao.maps.Size(39, 56),
    { offset: new kakao.maps.Point(27, 69) }
  );

  markerData.forEach(function (data) {
    var marker = new kakao.maps.Marker({
      position: data.position,
      image: markerImage,
    });

    marker.setMap(map); // 마커를 지도에 표시
  });

  /* 드롭다운 스타일 업데이트 */
  const areaDropdown = document.getElementById("area-dropdown");
  const sportDropdown = document.getElementById("sport-dropdown");

  areaDropdown.addEventListener("change", function (event) {
    // const selectedArea = event.target.value;
    // console.log("Selected area:", selectedArea);
    updateSelectedOptionStyle(this);
    updateQueryString();
    fetchChallengeList();
  });

  sportDropdown.addEventListener("change", function (event) {
    // const selectedSport = event.target.value;
    // console.log("Selected sport type:", selectedSport);
    updateSelectedOptionStyle(this);
    updateQueryString();
    fetchChallengeList();
  });

  function updateSelectedOptionStyle(dropdown) {
    dropdown.querySelectorAll("option").forEach((option) => {
      option.removeAttribute("selected");
    });

    const selectedOption = dropdown.options[dropdown.selectedIndex];
    if (selectedOption) {
      selectedOption.setAttribute("selected", "");
    }
  }

  function updateQueryString() {
    const { area, sport } = getDropdownValues();
    const params = new URLSearchParams();
    if (area) params.set("region", area);
    if (sport) params.set("sports-category", sport);

    const newUrl = `${window.location.pathname}${
      params.toString() ? "?" + params.toString() : ""
    }`;
    history.pushState({}, "", newUrl);
  }

  function getDropdownValues() {
    const areaValue = areaDropdown.value;
    const sportValue = sportDropdown.value;

    console.log("Area dropdown value:", areaValue);
    console.log("Sport dropdown value:", sportValue);

    return {
      area: areaValue,
      sport: sportValue,
    };
  }

  /* sidebar item 새로고침 */
  const rotateIcon = document.getElementById("rotate-icon");
  rotateIcon.addEventListener("click", function () {
    refreshSidebarItems();
  });

  function refreshSidebarItems() {
    areaDropdown.value = "";
    sportDropdown.value = "";

    updateSelectedOptionStyle(areaDropdown);
    updateSelectedOptionStyle(sportDropdown);

    updateQueryString();

    fetchChallengeList();

    console.log("Refreshed sidebar items");
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
    const { area, sport } = getDropdownValues();
    console.log("Fetching challenges with area:", area, "and sport:", sport);

    const params = new URLSearchParams();
    if (area) params.append("region", area);
    if (sport) params.append("sports-category", sport);

    fetch(API_SERVER_DOMAIN + `/api/v1/challenge?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          const challenges = data.result;
          console.log("Received challenges:", challenges);
          renderSidebarChallenges(challenges);
        } else {
          console.error("Failed to fetch challenge list:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching challenge list:", error);
      });
  }

  const challengeInfo = document.querySelector(".challenge-info");

  function renderSidebarChallenges(challenges) {
    console.log("Rendering challenges:", challenges);
    challengeItemWrapSidebar.innerHTML = "";

    if (!challenges || challenges.length === 0) {
      console.log("No challenges to display");
      return;
    }

    challenges.forEach((challenge, index) => {
      const item = document.createElement("div");
      item.classList.add("sidebar-item");
      item.innerHTML = `
        <div class="item-title">${challenge.challengeName}</div>
        <div>
          <span class="info-click">정보보기</span>
          <span style="color: #c7c4c4">|</span>
          <span class="share-click">공유하기</span>
        </div>
      `;
      challengeItemWrapSidebar.appendChild(item);

      const shareButton = item.querySelector(".share-click");
      const infoButton = item.querySelector(".info-click");

      shareButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showPopup("crew-selector", challenge, item);
      });

      infoButton.addEventListener("click", (event) => {
        event.stopPropagation();
        showPopup("info-display", challenge, item);
      });

      item.addEventListener("click", () => {
        fetchChallengeDetail(challenge.challengeId);
      });
    });
  }

  function fetchChallengeDetail(challengeId) {
    fetch(API_SERVER_DOMAIN + `/api/v1/challenge/detail/${challengeId}`, {
      method: "GET",
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          renderChallengeInfo(data.result.challengingCrewPreviewDtoList);
          challengeInfo.style.display = "block";
        } else {
          console.error("Failed to fetch challenge detail:", data.message);
        }
      })
      .catch((error) => {
        console.error("Error fetching challenge detail:", error);
      });
  }

  function renderChallengeInfo(crewList) {
    challengeItemWrap.innerHTML = "";

    crewList.forEach((crew) => {
      const crewItem = document.createElement("div");
      crewItem.classList.add("challenge-item");
      crewItem.innerHTML = `
        <img src="${crew.crewImgUrl}" alt="${crew.crewName}">
        <div class="crew-name">${crew.crewName}</div>
      `;
      challengeItemWrap.appendChild(crewItem);
    });

    updateButtonState();
  }

  function showPopup(type, challenge, sidebarItem) {
    const popupContainer = document.getElementById("popup-container");
    popupContainer.innerHTML = "";

    const popup = document.createElement("div");
    popup.classList.add("popup", "show");

    if (type === "crew-selector") {
      popup.innerHTML = `
        <div class="crew-selector show">
          <ul>
            <li><label><input type="radio" name="crew" value="A" /> A크루</label></li>
            <li><label><input type="radio" name="crew" value="B" /> B크루</label></li>
            <li><label><input type="radio" name="crew" value="C" /> C크루</label></li>
            <button id="crew-selector-btn">공유</button>
          </ul>
        </div>
      `;
    } else if (type === "info-display") {
      popup.innerHTML = `
        <div class="info-display show">
          <div><i class="fa-solid fa-calendar-days"></i> ${challenge.startAt} ~ ${challenge.untilWhen}</div>
          <div><i class="fa-solid fa-person-running"></i> ${challenge.notice}</div>
          <div><i class="fa-solid fa-user-group"></i> 참여 인원: ${challenge.memberCount}명</div>
        </div>
      `;
    }

    // 팝업 위치 설정
    const sidebarItemRect = sidebarItem.getBoundingClientRect();
    popup.style.top = `${sidebarItemRect.top}px`;
    popup.style.left = `${sidebarItemRect.right}px`;

    popupContainer.appendChild(popup);

    // 팝업 외부 클릭 시 닫기
    document.addEventListener("click", closePopup);
  }

  function closePopup(event) {
    const popupContainer = document.getElementById("popup-container");
    const popup = popupContainer.querySelector(".popup");

    if (popup && !popup.contains(event.target)) {
      popupContainer.innerHTML = "";
      document.removeEventListener("click", closePopup);
    }
  }
});
