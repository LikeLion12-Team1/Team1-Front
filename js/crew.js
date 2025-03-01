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

let crewData = [];
let originalCrewData = [];

const maxContent = 8;
let page = 1;
let currentRangeStart = 1;
const maxPage = 5;

document.addEventListener('DOMContentLoaded', () => {
	initializeFilters();
	getCrewList();
});

function initializeFilters() {
	document.getElementById('area-select').addEventListener('change', getFilteredCrewList);
	document.getElementById('sports-select').addEventListener('change', getFilteredCrewList);
}

function getCrewList() {
	fetch(API_SERVER_DOMAIN + '/api/v1/crews', {
		method: "GET",
		headers: {
			Authorization: "Bearer " + accessToken,
		},
	}).then(response => {
		if (!response.ok) {
			throw new Error('Failed to fetch crew list');
		}
		return response.json();
	}).then((data) => {
		if (data.isSuccess) {
			crewData = data.result;
			originalCrewData = crewData.slice();
			displayCrews(page);
		} else {
			throw new Error('Request failed: ' + data.message);
		}
	}).catch(error => {
		console.error('Error fetching crew list:', error);
	});
}

function getFilteredCrewList() {
	const selectedRegion = document.getElementById('area-select').value;
	const selectedSports = document.getElementById('sports-select').value;

	let filteredData = originalCrewData.slice();

	// 지역 필터가 적용된 경우
	if (selectedRegion !== '지역 전체') {
		filteredData = filteredData.filter(crew => crew.region === selectedRegion);
	}

	// 스포츠 타입 필터가 적용된 경우
	if (selectedSports !== '스포츠타입 전체') {
		filteredData = filteredData.filter(crew => crew.sportsCategory === selectedSports);
	}

	crewData = filteredData;
	displayCrews(page);
}

function displayCrews(page) {
	const crewContainer = document.getElementById('crewContainer');
	crewContainer.innerHTML = '';
	const start = maxContent * (page - 1);
	const end = start + maxContent;
	const crewsToShow = crewData.slice(start, end);

	crewsToShow.forEach(crew => {
		const crewFrame = document.createElement('div');
		crewFrame.className = 'crew-frame';
		crewFrame.innerHTML = `
			<div class="crew-list-cont">
				<img id="crew-img" src="${crew.photoUrl}">
				<p>${crew.name}</p>
			</div>
			<div class="tag">
				<p># ${crew.region}</p>
				<p># ${crew.sportsCategory}</p>
			</div>
        `;
		crewFrame.addEventListener('click', () => {
			localStorage.setItem('selectedCrewId', crew.crewId);
			window.location.href = '/html/crew-info.html';
		});
		crewContainer.appendChild(crewFrame);
	});
	updatePagination();
}

function updatePagination() {
	const pageNumbers = document.getElementById('page-numbers');
	pageNumbers.innerHTML = '';
	const totalPages = Math.ceil(crewData.length / maxContent);
	const currentRangeEnd = Math.min(currentRangeStart + maxPage - 1, totalPages);

	const createButton = (i, onClick, disabled = false) => {
		const button = document.createElement('button');
		button.textContent = i;
		button.style.cursor = 'pointer';
		button.style.marginLeft = '5px';
		button.style.marginRight = '5px';
		button.disabled = disabled;
		button.onclick = onClick;
		return button;
	};

	pageNumbers.appendChild(createButton('<', () => changePageRange(-1), currentRangeStart === 1));

	for (let i = currentRangeStart; i <= currentRangeEnd; i++) {
		const pageNumber = createButton(i, () => goPage(i));
		if (i === page) {
			pageNumber.style.backgroundColor = '#666666';
			pageNumber.style.color = '#FFFFFF';
		}
		pageNumbers.appendChild(pageNumber);
	}
	pageNumbers.appendChild(createButton('>', () => changePageRange(1), currentRangeEnd >= totalPages));
}

function goPage(pageNumber) {
	page = pageNumber;
	updateCurrentRange();
	displayCrews(page);
	updatePagination();
}

function changePageRange(direction) {
	const totalPages = Math.ceil(crewData.length / maxContent);
	const newRangeStart = currentRangeStart + direction * maxPage;
	if (newRangeStart > 0 && newRangeStart <= totalPages) {
		currentRangeStart = newRangeStart;
		page = currentRangeStart;
		displayCrews(page);
		updatePagination();
	}
}

function updateCurrentRange() {
	const totalPages = Math.ceil(crewData.length / maxContent);
	const currentRangeEnd = Math.min(currentRangeStart + maxPage - 1, totalPages);
	if (page < currentRangeStart || page > currentRangeEnd) {
		currentRangeStart = Math.floor((page - 1) / maxPage) * maxPage + 1;
	}
	updatePagination();
}

getCrewList();


//클릭한 크루..
document.addEventListener('DOMContentLoaded', () => {
    initializeCrewClickHandlers();
});

function initializeCrewClickHandlers() {
    const crewFrames = document.querySelectorAll('.crew-frame');

    crewFrames.forEach(crewFrame => {
        crewFrame.addEventListener('click', () => {
            const crewId = crewFrame.dataset.crewId; // crew.html에서 data-crew-id를 설정했다고 가정합니다
            localStorage.setItem('selectedCrewId', crewId);
            window.location.href = '/html/crew-info.html';
        });
    });
}