const crewsPerPage = 8;
let currentPage = 1;
let currentRangeStart = 1;
const pageRangeSize = 5;
const crewData = [
	{name: '상명크루', tag1: '서울', tag2: '등산', img: '/img/logo.png'},
	{name: '상명크루', tag1: '강원', tag2: '클라이밍', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '강원', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '인천/경기', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '부산/경남', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '충북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '대구/경북', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''}
];

function displayCrews(page) {
	const crewContainer = document.getElementById('crewContainer');
	crewContainer.innerHTML = '';
	const start = crewsPerPage * (page-1);
	const end = start + crewsPerPage;
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
	const totalPages = Math.ceil(crewData.length / crewsPerPage);
	const currentRangeEnd = Math.min(currentRangeStart + pageRangeSize -1, totalPages);

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

	pageNumbers.appendChild(createButton('<<', goFirstPage, currentPage === 1));

    //pageNumbers.appendChild(createButton('<', () => changePageRange(-1), currentPage === 1));

	for (let i=currentRangeStart; i <= currentRangeEnd; i++) {
		const pageNumber= createButton(i, () => goPage(i));
		if (i === currentPage) {
			pageNumber.style.backgroundColor = '#666666';
			pageNumber.style.color = '#FFFFFF';
		}
		pageNumbers.appendChild(pageNumber);
	}

	//pageNumbers.appendChild(createButton('>', () => changePageRange(1), currentPage >= totalPages));

    pageNumbers.appendChild(createButton('>>', goLastPage, currentPage === totalPages));

	document.querySelector('#first-btn').disabled = currentPage === 1;
    document.querySelector('#last-btn').disabled = currentPage === totalPages;
}

function goPage(page) {
	currentPage = page;
	displayCrews(page);
	updateCurrentRange();
}

function changePageRange(direction) {
    const totalPages = Math.ceil(crewData.length / crewsPerPage);
    const newRangeStart = currentRangeStart + direction * pageRangeSize;
    if (newRangeStart > 0 && newRangeStart <= totalPages) {
        currentRangeStart = newRangeStart;
        updatePagination();
    }
}

function updateCurrentRange() {
    const totalPages = Math.ceil(crewData.length / crewsPerPage);
    const currentRangeEnd = Math.min(currentRangeStart + pageRangeSize - 1, totalPages);
    if (currentPage < currentRangeStart || currentPage > currentRangeEnd) {
        currentRangeStart = Math.floor((currentPage - 1) / pageRangeSize) * pageRangeSize + 1;
    }
}

function goFirstPage() {
	goPage(1);
}

function goLastPage() {
	const totalPages = Math.ceil(crewData.length / crewsPerPage);
	goPage(totalPages);
}

displayCrews(currentPage);