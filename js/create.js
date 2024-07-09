document.getElementById('get-btn').addEventListener('click', function() {
	document.getElementById('open-file').click();
});

document.getElementById('open-file').addEventListener('change', function(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('show-image').style.backgroundImage = `url(${e.target.result})`;
        document.getElementById('show-image').style.backgroundSize = 'cover';
        document.getElementById('show-image').style.backgroundPosition = 'center';
    };
	reader.readAsDataURL(file);
});

document.querySelectorAll('.choice-all button').forEach(function(button) {
	button.addEventListener('click', function() {
		let parent = this.parentNode.parentNode;

        parent.querySelectorAll('button').forEach(function(btn) {
        	btn.classList.remove('clicked');
        });
        this.classList.add('clicked');
	});
});

document.querySelector('.crewname-overlap-check').addEventListener('click', function() {
	let crewName = document.querySelector('.crewname-input').value;

	document.getElementById('check-overlap').style.display = 'none';

	if (crewName === '') {
		alert("크루 이름을 입력하세요.");
	}
	else {
		let notAvailable = checkCrewName(crewName);
		if (! notAvailable) {
			document.getElementById('check-overlap-message').textContent = '사용 가능한 이름입니다.';
			document.getElementById('check-icon').style.display = 'block';
			document.getElementById('check-overlap').style.display = 'block';
		}
		else {
			document.getElementById('check-overlap-message').textContent = '다른 이름을 사용해주세요.';
			document.getElementById('check-overlap').style.display = 'block';
			document.getElementById('check-icon').style.display = 'none';
		}
		document.getElementById('check-overlap').style.display = 'flex';
	}
});

function checkCrewName(crewName) {
    let ExistCrewNames = ['AAAAA', 'BBBBB', 'GGGGG'];
    return ExistCrewNames.includes(crewName);
}
