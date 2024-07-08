document.getElementById('add-img').addEventListener('click', function() {
	document.getElementById('open-file').click();
});

document.getElementById('open-file').addEventListener('change', function(event) {
	loadFile(event.target);
});

function loadFile(input) {
	let file = input.files[0];
	if (file) {
		let newImage = document.createElement("img");

		newImage.src = URL.createObjectURL(file);
		newImage.id = 'new-image';
		newImage.style.height = "100%";
		newImage.style.width = "100%";
		newImage.style.objectFit = "cover";

		let container = document.getElementById('show-img');
		container.innerHTML = '';
		container.appendChild(newImage);
	}
}

document.querySelector('.post-btn').addEventListener('click', function() {
	postData();
});


function postData() {
	let text = document.getElementById('input-text').value;
	let image = document.getElementById('open-file').files[0];
	let crewImg = image ? URL.createObjectURL(image) : '';
	let userImg = 'img/user-profile.png';
	let userName = 'AAA123';
    let postTime = '방금 전';
    let lifeOrCertification = '일상';

	if (text.trim() === '' && !crewImg) {
		alert('내용을 입력하거나 이미지를 추가해주세요.');
		return;
	}

	addPost(userImg, userName, postTime, lifeOrCertification, text, crewImg);

	// let formData = new FormData();
	// formData.append('text', text);
	// if (image) {
	// 	formData.append('image', image);
	// }

	// fetch('/', {
	// 	method: 'POST',
	// 	body: formData
	// }).then(response => {
	// 	if (response.ok) {
	// 		clearInputs();
	// 	} else {
	// 		alert('오류가 발생했습니다. 다시 시도해주세요.');
	// 	}
	// }).catch(error => {
	// 	console.error('Error:', error);
	// 	alert('오류가 발생했습니다. 다시 시도해주세요.');
	// });

	clearInputs();
}

function clearInputs() {
	document.getElementById('input-text').value = '';
	document.getElementById('open-file').value = '';
	document.getElementById('show-img').innerHTML = '';
}

function reportFunc() {
	document.getElementById('report-frame').style.display = 'block';
}

function postExpand() {
	document.getElementById('post-frame').style.display = 'block';
}

const reportFrame = document.getElementById('report-frame').innerHTML;
const reportButton = document.getElementById('report');
const frame = document.getElementById('report-frame');
const frame2 = document.getElementById('post-frame');
const cancelButton = document.querySelector('#cancel-btn');
const reportButton2 = document.getElementById('report-btn');

cancelButton.onclick = function() {
	frame.style.display = 'none';
	document.getElementById('input-text2').value = '';
};

reportButton2.onclick = function() {
	let reportReason = document.getElementById('input-text2').value.trim();
	if (reportReason === '') {
		alert("신고 사유를 입력하세요.");
	}
	else {
		frame.style.display = 'none';
		document.getElementById('input-text2').value = '';
	}
};

window.onclick = function(event) {
	if (event.target == frame) {
		frame.style.display = 'none';
		document.getElementById('input-text2').value = '';
	}
	if (event.target == frame2) {
		frame2.style.display = 'none';
	}
};

function toggleHeart() {
	let heartImg = document.getElementById('heart');
	let currentHeart = heartImg.src;
	let fullHeartImg = "/img/full-heart.png";
    let emptyHeartImg = "/img/empty-heart.png";
	if (currentHeart.includes(fullHeartImg)) {
		heartImg.src = emptyHeartImg;
	}
	else {
		heartImg.src = fullHeartImg;
	}
}

function addPost(userImg, userName, postTime, lifeOrCertification, text, crewImg) {
	let postDiv = document.createElement('div');
	postDiv.classList.add('community-section3');

	let hr = document.createElement('hr');
	postDiv.appendChild(hr);
	let postTopDiv = document.createElement('div');
	postTopDiv.classList.add('comm-sec3-top');
	postTopDiv.innerHTML = `
		<img id="userImg" src="${userImg}">
		<p id="comm-crew-name">${userName}</p>
		<p id="small-circle3"></p>
		<p id="post-time">${postTime}</p>
		<p id="slash">/</p>
		<p id="lifeOrCertification">${lifeOrCertification}</p>
		<p id="report" onclick="reportFunc();">신고하기</p>
	`;
	postDiv.appendChild(postTopDiv);

	let postMidDiv = document.createElement('div');
	postMidDiv.classList.add('comm-sec3-mid');
	postMidDiv.innerHTML = `
		<p id="post-text">${text}</p>
		${crewImg ? `<img id="comm-crew-img" src="${crewImg}">` : ''}
	`;
	
	postDiv.appendChild(postMidDiv);

	let postBottomDiv = document.createElement('div');
	postBottomDiv.classList.add('comm-sec3-bottom');
	postBottomDiv.innerHTML = `
		<img id="heart" src="/img/empty-heart.png" onclick="toggleHeart();">
		<img id="comment" src="/img/comment.png" onclick="postExpand();">
	`;
	postDiv.appendChild(postBottomDiv);

	let postContainer = document.getElementById('post-container');
	postContainer.insertBefore(postDiv, postContainer.firstChild);
}
