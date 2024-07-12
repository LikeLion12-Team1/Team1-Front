let API_SERVER_DOMAIN = "http://15.164.41.239:8080";

const accessToken = getCookie("accessToken");

  /* 쿠키 관련 함수들 */
function setCookie(name, value, days) {
    var expires = "";
    if (days) {
    	var date = new Date();
    	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    	expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

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

function deleteCookie(name) {
    document.cookie = name + "=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;";
}

//파일 선택 열기
document.getElementById('get-btn').addEventListener('click', function() {
	document.getElementById('open-file').click();
});

//업로드 이미지
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

//크루 이름 중복 확인
document.querySelector('.crewname-overlap-check').addEventListener('click', function() {
	let crewName = document.querySelector('.crewname-input').value;

	document.getElementById('check-overlap').style.display = 'none';

	if (crewName === '') {
		alert("크루 이름을 입력하세요.");
	}
	else {
		fetch(API_SERVER_DOMAIN + `/api/v1/crews/check/${crewName}`, {
            method: 'GET',
            headers: {
                Authorization: "Bearer " + accessToken,
            }
        })
		.then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
		.then(data => {
			if (data.result === "해당 크루 이름을 사용할 수 있습니다.") {
				document.getElementById('check-overlap-message').textContent = '사용 가능한 이름입니다.';
				document.getElementById('check-icon').style.display = 'block';
				document.getElementById('check-overlap').style.display = 'block';

				document.querySelector('.crewname-overlap-check').disabled = true;
				document.querySelector('.crewname-overlap-check').style.color = '#C7C4C4';
				document.querySelector('.crewname-overlap-check').style.borderColor ='#C7C4C4';
			} else {
				document.getElementById('check-overlap-message').textContent = '다른 이름을 사용해주세요.';
				document.getElementById('check-overlap').style.display = 'block';
				document.getElementById('check-icon').style.display = 'none';
			}
			document.getElementById('check-overlap').style.display = 'flex';
		})
		.catch(error => {
            console.error('Error:', error);
            alert('크루 이름 중복 확인에 실패했습니다.');
        });

	}
});

//다시 입력창 클릭 -> 버튼 활성화 & 중복 확인 메세지 none
document.querySelector('.crewname-input').addEventListener('click', function() {
	this.value = '';

	document.querySelector('.crewname-overlap-check').disabled = false;
	document.querySelector('.crewname-overlap-check').style.color = '#FD5E53';
	document.querySelector('.crewname-overlap-check').style.borderColor = '#FD5E53';

	document.getElementById('check-overlap').style.display = 'none';
});

document.querySelectorAll('.choice-all1 button').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelectorAll('.choice-all1 button').forEach(function(btn) {
            btn.classList.remove('clicked');
        });
        this.classList.add('clicked');
    });
});

document.querySelectorAll('.choice-all2 button').forEach(function(button) {
    button.addEventListener('click', function() {
        document.querySelectorAll('.choice-all2 button').forEach(function(btn) {
            btn.classList.remove('clicked');
        });
        this.classList.add('clicked');
    });
});

function getSelections() {
    let regionButton = document.querySelector('.choice-all1 button.clicked');
    let region = regionButton ? regionButton.textContent.trim() : null;

    let sportsCategoryButton = document.querySelector('.choice-all2 button.clicked');
    let sportsCategory = sportsCategoryButton ? sportsCategoryButton.textContent.trim() : null;

    return { region, sportsCategory };
}

//생성하기 버튼 클릭
document.getElementById('create-crew').addEventListener('click', function() {
	
	let { region, sportsCategory } = getSelections();
    
    if (!region || !sportsCategory) {
        alert("필수 항목을 확인하세요.");
        return;
    }
	let crewName = document.querySelector('.crewname-input').value;
	let image = document.getElementById('open-file').files[0];
	console.log(region);
	console.log(sportsCategory);
	fetch(API_SERVER_DOMAIN + '/api/v1/crews', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify({
			name: crewName,
			region: region,
			sportsCategory : sportsCategory,
		})
	})
	.then(response => response.json())
	.then(data => {
		console.log('크루 생성 완료:', data);
		console.log(data);
		console.log(data.result);
		console.log(image);

		alert('크루 생성이 완료되었습니다.');
		let formData = new FormData();
		formData.append('file', image);
		fetch(API_SERVER_DOMAIN + `/api/v1/crews/${data.result}`, {
			method: 'POST',
			headers: {
				Authorization: "Bearer " + accessToken,
			},
			body: formData
		})
		.then(response => response.json())
		.then(data => {
			console.log('크루 생성 완료:', data);
			console.log(data);
			console.log(data.result);
	
			alert('크루 생성이 완료되었습니다.');
		})
		.catch(error => {
			console.error('Error:', error);
			alert('크루 생성에 실패했습니다.');
		});
	})
	.catch(error => {
		console.error('Error:', error);
		alert('크루 생성에 실패했습니다.');
	});
});