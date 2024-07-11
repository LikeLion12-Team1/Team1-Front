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

document.addEventListener("DOMContentLoaded", function () {
  if (!accessToken) {
    window.location.href = "/html/login.html";
    return;
  }

  const managerIcons = document.querySelectorAll(".manager-icon");

  fetchUserData();

  function fetchUserData() {
    fetch(API_SERVER_DOMAIN + `/api/v1/user/my`, {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          populateMyCrew(data.result.myCrewPreviewList);
          populateMyChallenge(data.result.myChallengePreviewList);
          updateTokenCount(data.result.userCount);
        } else {
          console.error("데이터를 가져오는데 실패했습니다:", data.message);
        }
      })
      .catch((error) => console.error("에러:", error));
  }

  // crew
  function populateMyCrew(myCrewList) {
    const myCrewContainer = document.querySelector(".mycrew ul");
    myCrewContainer.innerHTML = "";

    myCrewList.forEach((crew) => {
      const li = document.createElement("li");
      li.className = "mycrew-content";

      const img = document.createElement("img");
      img.src = "/img/mypage-green.png";

      const dateDiv = document.createElement("div");
      dateDiv.className = "mycrew-content-date";
      dateDiv.textContent = formatCrewDate(crew.createAt, crew.inactiveDate);

      const crewDiv = document.createElement("div");
      crewDiv.className = "mycrew-content-crew";
      crewDiv.textContent = `${crew.crewName} 크루`;
      crewDiv.dataset.crew_name = crew.crewName;

      const managerSpan = document.createElement("span");
      managerSpan.className = "manager-icon";
      managerSpan.innerHTML = '<i class="fas fa-user-gear"></i>';

      // managerSpan에 클릭 이벤트 리스너 추가
      managerSpan.addEventListener("click", function () {
        console.log("manager-icon 클릭");
        const crewName = crewDiv.dataset.crew_name;
        fetch(API_SERVER_DOMAIN + `/api/v1/user/my/crew/${crewName}`, {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        })
          .then((response) => response.json())
          .then((data) => {
            if (data.isSuccess) {
              window.location.href = `/html/mypageList_manager.html?crew=${crewName}`;
            } else {
              console.error(
                "크루 데이터를 가져오는데 실패했습니다:",
                data.message
              );
            }
          })
          .catch((error) => console.error("에러:", error));
      });

      li.appendChild(img);
      li.appendChild(dateDiv);
      li.appendChild(crewDiv);
      li.appendChild(managerSpan);
      myCrewContainer.appendChild(li);
    });
  }

  // challenge
  function populateMyChallenge(myChallengeList) {
    const myChallengeContainer = document.querySelector(".mychallenge ul");
    myChallengeContainer.innerHTML = "";

    myChallengeList.forEach((challenge) => {
      const li = document.createElement("li");
      li.className = "mychallenge-content";

      const verifiedCount = challenge.verifiedCount ?? 0; // verifiedCount가 없으면 0으로 설정
      const requiredVerificationCount =
        challenge.requiredVerificationCount ?? 0; // requiredVerificationCount가 없으면 0으로 설정

      let imgSrc = getChallengeImage(challenge.status);
      if (challenge.verifiedCount === challenge.requiredVerificationCount) {
        imgSrc = "/img/mypage-lightgreen.png";
      }

      const img = document.createElement("img");
      img.src = imgSrc;

      const dateDiv = document.createElement("div");
      dateDiv.className = "mychallenge-content-date";

      const startAt = challenge.startAt ? challenge.startAt : "ing";
      const untilWhen = challenge.untilWhen ? challenge.untilWhen : "ing";
      dateDiv.textContent = `${startAt} - ${untilWhen}`;

      const challengeDiv = document.createElement("div");
      challengeDiv.className = "mychallenge-content-crew";
      challengeDiv.textContent = `${challenge.challengeName} 챌린지`;

      const countSpan = document.createElement("span");
      countSpan.className = "mychallenge-content-count";
      countSpan.textContent = `${verifiedCount}/${requiredVerificationCount}`;

      li.appendChild(img);
      li.appendChild(dateDiv);
      li.appendChild(challengeDiv);
      li.appendChild(countSpan);

      myChallengeContainer.appendChild(li);
    });
  }

  // token 수 업데이트
  window.updateTokenCount = function updateTokenCount(userCount) {
    const tokenElement = document.querySelector(".mypage-token span");
    if (typeof userCount === "number") {
      tokenElement.textContent = `${userCount}/1`;
      if (userCount >= 1) {
        document.querySelector(".mypage-token").style.color = "#114232";
        toggleModal(true);
      } else {
        toggleModal(false);
      }
    } else {
      console.warn("토큰 수가 유효하지 않습니다:", userCount);
    }
  };

  // modal toggle
  function toggleModal(display) {
    const modal = document.querySelector(".mypage-modal");
    modal.style.display = display ? "block" : "none";
  }

  // modal 이벤트 핸들러
  const giftIcon = document.querySelector(".fa-solid.fa-gift");
  giftIcon.addEventListener("click", () => toggleModal(true));

  const moveToPlantbookButton = document.querySelector(".moveToPlantbook");
  const cancelMoveToPlantbookButton = document.querySelector(
    ".cancelMoveToPlantbook"
  );

  moveToPlantbookButton.addEventListener("click", () => {
    window.location.href = "/html/plantbook.html";
    toggleModal(false);
  });

  cancelMoveToPlantbookButton.addEventListener("click", () =>
    toggleModal(false)
  );

  // crew 날짜 형식화 (YYYY-MM-DD)
  // null인 경우 ing 표시
  function formatCrewDate(createAt, inactiveDate) {
    if (!createAt) {
      return "ing - ing";
    }

    const createDate = new Date(createAt).toISOString().split("T")[0];
    const inactive = inactiveDate
      ? new Date(inactiveDate).toISOString().split("T")[0]
      : "ing";
    return `${createDate} - ${inactive}`;
  }

  // 챌린지 상태에 따른 이미지 경로 반환 함수
  function getChallengeImage(status) {
    switch (status) {
      case "성공":
        return "/img/mypage-lightgreen.png";
      case "실패":
        return "/img/mypage-yellow.png";
      default:
        return "/img/mypage-red.png";
    }
  }

  // 로그아웃 버튼 이벤트 핸들러 추가
  const logoutButton = document.querySelector(".logout-button");
  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      deleteCookie("accessToken");
      deleteCookie("refreshToken");
      window.location.href = "/html/login.html";
    });
  }
});
