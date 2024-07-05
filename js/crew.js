const crewsPerPage = 8;
let currentPage = 1;
const crewData = [
	{name: '상명크루', tag1: '서울', tag2: '등산', img: ''},
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
		crewContainer.appendChild(crewFrame);
	});
	updatePagination();

}

function updatePagination() {
	const pageNumbers = document.getElementById('page-numbers');
	pageNumbers.innerHTML = '';
	const totalPages = Math.ceil(crewData.length / crewsPerPage);

	for (let i=1; i <= totalPages; i++) {
		const pageNumber = document.createElement('button');
		pageNumber.textContent = i;
		pageNumber.style.cursor = 'pointer';
		pageNumber.style.marginLeft = '5px';
		pageNumber.style.marginRight = '5px';

		pageNumber.onclick = () => goPage(i);
		if (i === currentPage) {
			pageNumber.style.backgroundColor = '#666666';
			pageNumber.style.color = '#FFFFFF';
		}
		pageNumbers.appendChild(pageNumber);
	}
	document.querySelector('#first-btn').disabled = currentPage === 1;
    document.querySelector('#last-btn').disabled = currentPage === totalPages;
}

function goPage(page) {
	currentPage = page;
	displayCrews(page);
}

function changePage(direction) {
	const newPage = currentPage + direction;
	if (newPage > 0 && newPage <= Math.ceil(crewData.length / crewsPerPage)) {
		goPage(newPage);
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