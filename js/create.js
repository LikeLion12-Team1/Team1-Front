let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
let accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE3MjA3MzgxNTAsImV4cCI6MTcyOTM3ODE1MH0.UGQrbpmjf-hXyBXA25EKR9VK6JnuTo3WHWoePkcVdBI";

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

// Function to handle button click for region selection
document.querySelectorAll('.choice-all1 button').forEach(function(button) {
    button.addEventListener('click', function() {
        // Remove 'clicked' class from all buttons in the same group
        document.querySelectorAll('.choice-all1 button').forEach(function(btn) {
            btn.classList.remove('clicked');
        });
        // Add 'clicked' class to the clicked button
        this.classList.add('clicked');
    });
});

// Function to handle button click for sports category selection
document.querySelectorAll('.choice-all2 button').forEach(function(button) {
    button.addEventListener('click', function() {
        // Remove 'clicked' class from all buttons in the same group
        document.querySelectorAll('.choice-all2 button').forEach(function(btn) {
            btn.classList.remove('clicked');
        });
        // Add 'clicked' class to the clicked button
        this.classList.add('clicked');
    });
});

function getSelections() {
    // Get selected region
    let regionButton = document.querySelector('.choice-all1 button.clicked');
    let region = regionButton ? regionButton.textContent.trim() : null;

    // Get selected sports category
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

    // Use region and sportsCategory for further processing (e.g., API request)
    console.log('Selected Region:', region);
    console.log('Selected Sports Category:', sportsCategory);


	let crewName = document.querySelector('.crewname-input').value;
	let photoUrl = document.getElementById('show-image').style.backgroundImage.replace('url("', '').replace('")', '');

	fetch(API_SERVER_DOMAIN + '/api/v1/crews', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Authorization: "Bearer " + accessToken,
		},
		body: JSON.stringify({
			name: crewName,
			photoUrl: photoUrl,
			region: region,
			sportsCategory: sportsCategory
		})
	})
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.json();
	})
	.then(data => {
		console.log('크루 생성 완료:', data);
		alert('크루 생성이 완료되었습니다.');
	})
	.catch(error => {
		console.error('Error:', error);
		alert('크루 생성에 실패했습니다.');
	});
});