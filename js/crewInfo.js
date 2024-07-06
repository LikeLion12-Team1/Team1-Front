document.getElementById('crew-join-btn').addEventListener('click', function handleClick() {
    this.classList.toggle('clicked');
	if (this.classList.contains('clicked')) {
        this.textContent = '신청완료';
        document.getElementById('join-complete').style.visibility = 'visible';
        this.removeEventListener('click', handleClick);
    } else {
        this.textContent = '가입하기';
	}
});