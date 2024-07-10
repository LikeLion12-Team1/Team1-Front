let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
accesstoken =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJqaml5ZW9uMjdAbmF2ZXIuY29tIiwiaWF0IjoxNzIwNjE3ODY2LCJleHAiOjE3MjkyNTc4NjZ9.7MEwo0ZWHp0tqT9TOdGkNTGDIw_TUMF6v74e6CdwcKU";

document.addEventListener("DOMContentLoaded", function () {
  fetchUserData();

  function fetchUserData() {
    fetch(API_SERVER_DOMAIN + `/api/v1/user/my`, {
      headers: {
        Authorization: "Bearer " + accesstoken,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.isSuccess) {
          populateMyCrew(data.result.myCrewPreviewList);
          populateMyChallenge(data.result.myChallengePreviewList);
          updateTokenCount(data.result.tokenCount);
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

      li.appendChild(img);
      li.appendChild(dateDiv);
      li.appendChild(crewDiv);
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

      const img = document.createElement("img");
      img.src = getChallengeImage(challenge.status);

      const dateDiv = document.createElement("div");
      dateDiv.className = "mychallenge-content-date";
      dateDiv.textContent = `${challenge.startAt} - ${challenge.untilWhen}`;

      const challengeDiv = document.createElement("div");
      challengeDiv.className = "mychallenge-content-crew";
      challengeDiv.textContent = `${challenge.challengeName} 챌린지`;

      const countSpan = document.createElement("span");
      countSpan.className = "mychallenge-content-count";
      countSpan.textContent = `${challenge.completedCount}/${challenge.requiredCount}`;

      li.appendChild(img);
      li.appendChild(dateDiv);
      li.appendChild(challengeDiv);
      li.appendChild(countSpan);

      myChallengeContainer.appendChild(li);
    });
  }

  // token 수 업데이트
  function updateTokenCount(tokenCount) {
    const tokenElement = document.querySelector(".mypage-token span");
    if (typeof tokenCount === "number") {
      tokenElement.textContent = `${tokenCount}/1`;
      if (tokenCount >= 1) {
        document.querySelector(".mypage-token").style.color = "#114232";
        toggleModal(true);
      } else {
        toggleModal(false);
      }
    } else {
      console.warn("토큰 수가 유효하지 않습니다:", tokenCount);
    }
  }

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
});
