let API_SERVER_DOMAIN = "http://15.164.41.239:8080";

const accessToken = getCookie("accessToken");
const crewName = localStorage.getItem('crewName');
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

let lifeButton = 1;
let certificationButton = 0;

document.addEventListener('DOMContentLoaded', () => {
    
	console.log(crewName);

    if (crewName) {
        fetchCrewPosts(crewName);
    } else {
        console.error('localStorage에서 crewName을 찾을 수 없습니다');
    }
});

function fetchCrewPosts(crewName) {
    fetch(API_SERVER_DOMAIN + `/api/v1/crews/${crewName}/posts`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch crew posts');
        }
        return response.json();
    })
    .then(data => {
        if (data.isSuccess) {
			const postContainer = document.getElementById('post-container');
			postContainer.innerHTML='';
            data.result.postPreviewList.forEach(post => {
                addPost(post.authorProfileImg, post.author, post.category, post.content, post.postImg, post.createdA, post.postId);
            });
        } else {
            throw new Error('Failed to fetch crew posts');
        }
    })
    .catch(error => {
        console.error('Error fetching crew posts:', error);
    });
}


//인증 버튼 클릭
document.getElementById('certification-btn').addEventListener('click', function() {
	lifeButton = 0;
	certificationButton = 1;
	
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
	lifeButton = 1;
	certificationButton = 0;

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

//이미지 업로드
document.getElementById('add-img').addEventListener('click', function() {
	document.getElementById('open-file').click();
});

//업로드 이미지 미리보기
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

document.addEventListener('DOMContentLoaded', function() {
    document.querySelector('.post-btn').addEventListener('click', function() {
        postData();
    });
});

function postData() {
	let crewName = localStorage.getItem('crewName');
	let text = document.getElementById('input-text').value;
	let image = document.getElementById('open-file').files[0];
	let category = lifeButton ? '일상' : '인증';

	if (text.trim() === '' && !image) {
		alert('내용을 입력하거나 이미지를 추가해주세요.');
		return;
	}

	//카테고리, 글
	let postData = {
		category: category,
		content: text
	};
	fetch(API_SERVER_DOMAIN + `/api/v1/crews/${crewName}/posts`, {
        method: 'POST',
        headers: {
			'Content-Type': 'application/json',
			Authorization: "Bearer " + accessToken,
        },
        body: JSON.stringify(postData)
    })
	.then(response => {
        if (!response.ok) {
            return response.json().then(errorData => {
				throw new Error('Error: ' + (errorData.message || 'Failed to create post.'));
			});
        }
        return response.json();
    })
    .then(data => {
		if (data.isSuccess) {
            let postId = data.result; 

			if (image) {
				let formData = new FormData();
				formData.append('file', image);

				return fetch(API_SERVER_DOMAIN + `/api/v1/crews/${crewName}/posts/${postId}`, {
					method: 'POST',
					headers: {
						Authorization: "Bearer " + accessToken,
					},
					body: formData
				}).then(response => response.json());
			} 
			else {
				// 이미지가 없는 경우
				let postCreatedAt = data.result.createdAt ? data.result.createdAt.substring(0, 10) : new Date().toISOString().substring(0, 10);
                let nickname = data.result.nickname;
                return { isSuccess: true, result: { postImg: '', nickname: nickname, createdAt: createdAt } };
            }
		} else {
    		throw new Error('오류가 발생했습니다. 다시 시도해주세요.');
   	    }
	})
	.then(postData => {
        if (postData.isSuccess) {
            fetchCrewPosts(crewName); // Reload all posts
            clearInputs();
        } else {
            throw new Error('포스트 정보를 가져오는데 실패했습니다.');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('오류가 발생했습니다. 다시 시도해주세요.');
    });
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

function addPost(userImg, userName, category, text, postImg, postCreatedAt, postId) {
	// let formattedDate = postCreatedAt.substring(0, 10);
	let formattedDate = postCreatedAt;

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
		<p id="post-time">${formattedDate}</p>
		<p id="slash">/</p>
		<p id="lifeOrCertification">${category}</p>
		<p id="report" onclick="reportFunc();">신고하기</p>
	`;
	postDiv.appendChild(postTopDiv);

	let postMidDiv = document.createElement('div');
	postMidDiv.classList.add('comm-sec3-mid');
	postMidDiv.innerHTML = `
		<p id="post-text">${text}</p>
		${postImg ? `<img id="comm-crew-img" src="${postImg}">` : ''}
	`;
	
	postDiv.appendChild(postMidDiv);

	let postBottomDiv = document.createElement('div');
	postBottomDiv.classList.add('comm-sec3-bottom');
	postBottomDiv.innerHTML = `
		<img class="heart" src="/img/empty-heart.png" onclick="toggleHeart(event);">
		<img id="comment" src="/img/comment.png" postId="${postId}"  onclick="postExpand(event);">
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
	let postId = event.target.getAttribute('postId');
	//console.log(event.target);
	console.log(postId);

	fetchPostDetails(postId)
	.then(data => {
		if (data.isSuccess) {
			console.log(data.result);
			displayPostDetails(data.result);
			
		} else {
			throw new Error('Failed to fetch post details');
		}
	})
	.catch(error => {
		console.error('Error fetching post details:', error);
		alert('Failed to fetch post details. Please try again.');
	});
}

function fetchPostDetails(postId) {

    return fetch(`${API_SERVER_DOMAIN}/api/v1/crews/${crewName}/posts/detail/${postId}`, {
        method: 'GET',
        headers: {
            Authorization: "Bearer " + accessToken
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch post details');
        }
        return response.json();
    })
    .catch(error => {
        console.error('Error fetching post details:', error);
        throw error;
    });
}

//->
function displayPostDetails(postDetails) {
	console.log(postDetails);  //ok

    let modal = document.getElementById('post-frame');
    modal.style.display = 'block';

	document.getElementById('comment-input').value = '';
    let postRightTop = document.querySelector('.post-right-top');
    let postRightTop2 = document.querySelector('.post-right-top2');
    let postRightMid = document.querySelector('.post-right-mid');
    postRightMid.innerHTML = '';

	let postAuthorImg = postDetails.authorProfileImg || '/img/user-profile.png';
    let postAuthorNickname = postDetails.author || 'Unknown';
    postRightTop.innerHTML = `
        <img src="${postAuthorImg}" />
        <p>${postAuthorNickname}</p>
    `;
	
    postRightTop2.innerHTML = `
        <p>${postDetails.content || ''}</p>
    `;
	
    if (postDetails.replies && postDetails.replies.length > 0) {
        postDetails.replies.forEach(reply => {
            let replyDiv = document.createElement('div');
            replyDiv.classList.add('comment-frame');
            replyDiv.innerHTML = `
                <img src="${reply.replyAuthorProfileImg || '/img/user-profile.png'}" />
                <p>${reply.replyAuthorNickname || 'Unknown'}</p>
                <p>${reply.content || ''}</p>
                <p>${formatDate(reply.createdAt)}</p>
            `;
            repliesContainer.appendChild(replyDiv);
        });
    } else {
        let noReplyMessage = document.createElement('p');
        noReplyMessage.textContent = 'No replies yet.';
        repliesContainer.appendChild(noReplyMessage);
    }
}

   
	// //댓글
	// let commentFrame = document.createElement('div');
	// commentFrame.classList.add('comment-frame');
	// commentFrame.innerHTML = `
	// 	<img src="/img/user-profile.png" />
	//     <p>AAA123</p>
	//     <p></p>
	//     `;

    // document.getElementById('post-author-profile-img').src = postDetails.photoUrl || '/img/user-profile.png';
    // document.getElementById('post-author-nickname').textContent = postDetails.nickname || 'Unknown';
    // document.getElementById('post-content').textContent = postDetails.content || '';

  
//     let repliesContainer = document.getElementById('post-replies');
//     repliesContainer.innerHTML = ''; 

//     if (postDetails.replies && postDetails.replies.length > 0) {
//         postDetails.replies.forEach(reply => {
//             let replyDiv = document.createElement('div');
//             replyDiv.classList.add('comment-frame');
//             replyDiv.innerHTML = `
//                 <img src="${reply.replyAuthorProfileImg || '/img/user-profile.png'}" />
//                 <p>${reply.replyAuthorNickname || 'Unknown'}</p>
//                 <p>${reply.content || ''}</p>
//                 <p>${formatDate(reply.createdAt)}</p>
//             `;
//             repliesContainer.appendChild(replyDiv);
//         });
//     } else {
//         let noReplyMessage = document.createElement('p');
//         noReplyMessage.textContent = 'No replies yet.';
//         repliesContainer.appendChild(noReplyMessage);
//     }
// }
	

	// document.getElementById('comment-input').value = '';
	// let postRightMid = document.querySelector('.post-right-mid');
    // postRightMid.innerHTML = '';

// 	for (let i = 0; i < 10; i++) {
//         let commentFrame = document.createElement('div');
//         commentFrame.classList.add('comment-frame');
//         commentFrame.innerHTML = `
//             <img src="/img/user-profile.png" />
//             <p>AAA123</p>
//             <p>댓글 ${i + 1}</p>
//         `;
//         postRightMid.appendChild(commentFrame);
//     }
// 	let commentPostButton = document.querySelector('.comment-post');
// 	commentPostButton.removeEventListener('click', addComment);
//     commentPostButton.addEventListener('click', addComment);
// }

document.querySelectorAll('.comm-sec3-bottom img#comment').forEach(commentIcon => {
    commentIcon.addEventListener('click', postExpand);
});

// function formatDate(dateString) {
//     let date = new Date(dateString);
//     return date.toLocaleString(); // Adjust format as needed
// }