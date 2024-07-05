/* 지도 */
var container = document.getElementById("map"); //지도를 담을 영역의 DOM 레퍼런스
var options = {
  //지도를 생성할 때 필요한 기본 옵션
  center: new kakao.maps.LatLng(37.566826, 126.9786567), //지도의 중심좌표
  level: 3, //지도의 레벨(확대, 축소 정도)
};

var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

/* 마커 표시 */
var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.54699, 127.09598), // 지도의 중심좌표
    level: 4, // 지도의 확대 레벨
  };

var map = new kakao.maps.Map(mapContainer, mapOption); // 지도 생성

var imageSrc = "./img/marker.png",
  imageSize = new kakao.maps.Size(39, 56),
  imageOption = { offset: new kakao.maps.Point(27, 69) }; // 마커이미지 옵션(마커의 좌표와 일치시킬 이미지 안에서의 좌표를 설정)

// 마커의 이미지정보를 가지고 있는 마커이미지 생성
var markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imageOption),
  markerPosition = new kakao.maps.LatLng(37.54699, 127.09598); // 마커가 표시될 위치

// 마커 생성
var marker = new kakao.maps.Marker({
  position: markerPosition,
  image: markerImage, // 마커이미지 설정
});

// 마커가 지도 위에 표시되도록 설정
marker.setMap(map);

/* 지역, 스포츠타입 드롭다운 */
const areaDropdown = document.getElementById("area-dropdown");
const sportDropdown = document.getElementById("sport-dropdown");

areaDropdown.addEventListener("change", function () {
  updateSelectedOptionStyle(this);
});

sportDropdown.addEventListener("change", function () {
  updateSelectedOptionStyle(this);
});

function updateSelectedOptionStyle(dropdown) {
  dropdown.querySelectorAll("option").forEach((option) => {
    option.removeAttribute("selected");
  });

  const selectedOption = dropdown.options[dropdown.selectedIndex];
  selectedOption.setAttribute("selected", "");
}

/* sidebar에서 정보보기 or 공유하기 클릭할 때 */
document.addEventListener("DOMContentLoaded", function () {
  const sidebarItems = document.querySelectorAll(".sidebar-item");

  sidebarItems.forEach((item, index) => {
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
