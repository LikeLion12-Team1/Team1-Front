document.addEventListener("DOMContentLoaded", function () {
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
});

/* 지역, 스포츠타입 드롭다운 */
document.addEventListener("DOMContentLoaded", function () {
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
});

/* rotate-icon 눌렀을 때 -> sidebar item 새로고침 */
document.addEventListener("DOMContentLoaded", function () {
  const rotateIcon = document.getElementById("rotate-icon");
  rotateIcon.addEventListener("click", function () {
    refreshSidebarItems();
  });

  function refreshSidebarItems() {
    const sidebarItems = document.querySelectorAll(".sidebar-item");
    sidebarItems.forEach((item) => {
      //  각 sidebar-item을 새로고침하는 로직 추가
      console.log("Refreshing sidebar item:", item);
    });
  }
});

/* sidebar에서 정보보기 or 공유하기 클릭할 때 */
document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item) => {
    const shareButton = item.querySelector(".share-click");
    const crewSelector = item.querySelector(".crew-selector");
    const infoButton = item.querySelector(".info-click");
    const infoDisplay = item.querySelector(".info-display");

    /* 공유하기 눌렀을 때 -> 크루선택 */
    shareButton.addEventListener("click", function () {
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

    /* 정보보기 눌렀을 때 -> 챌린지 설명 보이도록 */
    infoButton.addEventListener("click", function () {
      document.querySelectorAll(".info-display").forEach((display) => {
        if (display !== infoDisplay) {
          display.classList.remove("show");
        }
      });

      document.querySelectorAll(".crew-selector").forEach((selector) => {
        if (selector !== crewSelector) {
          selector.classList.remove("show");
        }
      });

      infoDisplay.classList.toggle("show");
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
});
