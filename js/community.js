// let lifeButton = 1;
// let certificationButton = 0;

//인증 버튼 클릭
document.getElementById('certification-btn').addEventListener('click', function() {
    let circle1 = document.querySelector('.small-circle1');
    let lifeButtonText = document.querySelector('.life-btn2');
    let circle2 = document.querySelector('.small-circle2');
    let certificationButtonText = document.querySelector('.certification-btn2');

    circle2.style.borderColor = "#FD5E53";
    circle2.style.backgroundColor = "#FD5E53";
    certificationButtonText.style.color = "#FD5E53";

	circle1.style.borderColor = "#666666";
    circle1.style.backgroundColor = "transparent";
    lifeButtonText.style.color = "#666666";
});

//일상 버튼 클릭
document.getElementById('life-btn').addEventListener('click', function() {
    let circle1 = document.querySelector('.small-circle1');
    let lifeButtonText = document.querySelector('.life-btn2');
    let circle2 = document.querySelector('.small-circle2');
    let certificationButtonText = document.querySelector('.certification-btn2');

    circle1.style.borderColor = "#FD5E53";
    circle1.style.backgroundColor = "#FD5E53";
    lifeButtonText.style.color = "#FD5E53";

	circle2.style.borderColor = "#666666";
    circle2.style.backgroundColor = "transparent";
    certificationButtonText.style.color = "#666666";
});

document.getElementById('add-img').addEventListener('click', function() {
	document.getElementById('open-file').click();
});

document.getElementById('open-file').addEventListener('change', function(event) {
	const file = event.target.files[0];
	const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('show-img').style.backgroundImage = `url(${e.target.result})`;
        document.getElementById('show-img').style.backgroundSize = 'cover';
        document.getElementById('show-img').style.backgroundPosition = 'center';
    };
	reader.readAsDataURL(file);
});

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
	document.getElementById('show-img').style.backgroundImage= '';
}

function reportFunc() {
	document.getElementById('report-frame').style.display = 'block';
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

function toggleHeart(event) {
	let heartImg = event.target;
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
		<img class="heart" src="/img/empty-heart.png" onclick="toggleHeart(event);">
		<img id="comment" src="/img/comment.png" onclick="postExpand(event);">
	`;
	postDiv.appendChild(postBottomDiv);

	let postBottomDiv2 = document.createElement('div');
	postBottomDiv2.classList.add('comm-sec3-bottom2');
	postBottomDiv2.innerHTML = `
		<p>여러 명이 좋아합니다</p>
	`;
	postDiv.appendChild(postBottomDiv2);
	
	let postContainer = document.getElementById('post-container');
	postContainer.insertBefore(postDiv, postContainer.firstChild);
}

function addComment(event) {
	let commentText = document.getElementById('comment-input').value.trim();
	if (commentText === '') {
		alert('댓글을 입력하세요.');
		return;
	}

	let commentFrame = document.createElement('div');
	commentFrame.classList.add('comment-frame');
	commentFrame.innerHTML = `
		<img src="/img/user-profile.png" />
        <p>CCC123</p>
        <p>우와..</p>
	`;

	let postRightMid = document.querySelector('.post-right-mid');
	postRightMid.appendChild(commentFrame);

	document.getElementById('comment-input').value = '';
}

function postExpand(event) {
	let postFrame = document.getElementById('post-frame');
	postFrame.style.display = 'block';
	

	document.getElementById('comment-input').value = '';
	let postRightMid = document.querySelector('.post-right-mid');
    postRightMid.innerHTML = '';

	for (let i = 0; i < 10; i++) {
        let commentFrame = document.createElement('div');
        commentFrame.classList.add('comment-frame');
        commentFrame.innerHTML = `
            <img src="/img/user-profile.png" />
            <p>AAA123</p>
            <p>댓글 ${i + 1}</p>
        `;
        postRightMid.appendChild(commentFrame);
    }
	let commentPostButton = document.querySelector('.comment-post');
	commentPostButton.removeEventListener('click', addComment);
    commentPostButton.addEventListener('click', addComment);
}

document.querySelectorAll('.comm-sec3-bottom img#comment').forEach(commentIcon => {
    commentIcon.addEventListener('click', postExpand);
});