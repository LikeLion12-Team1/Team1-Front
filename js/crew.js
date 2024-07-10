const maxContent = 8;
let page = 1;
let currentRangeStart = 1;
const maxPage = 5;

const crewData = [
	{name: '처음', tag1: '서울', tag2: '등산', img: '/img/logo.png'},
	{name: '상명크루', tag1: '강원', tag2: '클라이밍', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '강원', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '인천/경기', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루8', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루16', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '강원', tag2: '클라이밍', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '강원', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '인천/경기', tag2: '등산', img: ''},
	{name: '상명크루24', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루32', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '강원', tag2: '클라이밍', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '강원', tag2: '등산', img: ''},
	{name: '상명크루40', tag1: '인천/경기', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루48', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루56', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루64', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루72', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '끝', tag1: '서울', tag2: '등산', img: ''}
];

function displayCrews(page) {
	const crewContainer = document.getElementById('crewContainer');
	crewContainer.innerHTML = '';
	const start = maxContent * (page-1);
	const end = start + maxContent;
	const crewsToShow = crewData.slice(start, end);

	crewsToShow.forEach(crew => {
		const crewFrame = document.createElement('div');
		crewFrame.className = 'crew-frame';
		crewFrame.innerHTML = `
			<div class="crew-list-cont">
				<img id="crew-img" src="${crew.img}">
				<p>${crew.name}</p>
			</div>
			<div class="tag">
				<p># ${crew.tag1}</p>
				<p># ${crew.tag2}</p>
			</div>
        `;
		crewFrame.addEventListener('click', () => {
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
	const currentRangeEnd = Math.min(currentRangeStart + maxPage -1, totalPages);

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

	for (let i=currentRangeStart; i <= currentRangeEnd; i++) {
		const pageNumber= createButton(i, () => goPage(i));
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
displayCrews(page);