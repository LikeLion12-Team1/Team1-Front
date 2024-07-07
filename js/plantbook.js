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
