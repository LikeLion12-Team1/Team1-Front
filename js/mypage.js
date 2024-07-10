document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/api/v1/user/my")
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

      div.appendChild(img);
      div.appendChild(dateDiv);
      div.appendChild(challengeDiv);
      div.appendChild(countSpan);
      myChallengeContainer.appendChild(div);
    });
  }

  // token 수 업데이트
  function updateTokenCount(tokenCount) {
    const tokenElement = document.querySelector(".mypage-token span");
    tokenElement.textContent = `${tokenCount}/3`;
    if (tokenCount >= 3) {
      document.querySelector(".mypage-token").style.color = "#114232";
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

  const moveToPlantbookButton = document.getElementById("moveToPlantbook");
  const cancelMoveToPlantbookButton = document.getElementById(
    "cancelMoveToPlantbook"
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
