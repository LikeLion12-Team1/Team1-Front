document.getElementById('crew-join-btn').addEventListener('click', function() {
    this.classList.toggle('clicked');
	if (this.classList.contains('clicked')) {
        this.textContent = '신청완료';
    } else {
        this.textContent = '가입하기';
	}
});