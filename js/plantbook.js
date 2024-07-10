/* token */
document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost:8080/api/v1/user/my")
    .then((response) => response.json())
    .then((data) => {
      if (data.isSuccess) {
        updateTokenCount(data.result.tokenCount); // token 개수 업데이트 호출
      } else {
        console.error("데이터를 가져오는데 실패했습니다:", data.message);
      }
    })
    .catch((error) => console.error("에러:", error));

  // token 개수 업데이트 함수
  function updateTokenCount(tokenCount) {
    const tokenElement = document.getElementById("tokenCount");
    tokenElement.textContent = `${tokenCount}/3`;
    if (tokenCount >= 3) {
      tokenElement.style.color = "#114232";
    }
  }
});

/* radio 버튼 */
document.addEventListener("DOMContentLoaded", function () {
  const radios = document.querySelectorAll('input[type="radio"]');

  radios.forEach((radio) => {
    radio.addEventListener("change", function () {
      const selectedImg = this.previousElementSibling;
      const selectedUnlockSrc = this.dataset.unlockSrc;
      if (selectedUnlockSrc) {
        selectedImg.src = selectedUnlockSrc;
      }
    });
  });
});
