const calendar = document.querySelector('.calendar'),
    date = document.querySelector('.date'),
    daysContainer = document.querySelector('.days'),
    prev = document.querySelector('.prev'),
    next = document.querySelector('.next'),
    todayBtn = document.querySelector('.today-btn'),
    gotoBtn = document.querySelector('.goto-btn'),
    dateInput = document.querySelector('.date-input'),
    eventDay = document.querySelector('.event-day'),
    eventDate = document.querySelector('.event-date'),
    eventsContainer = document.querySelector('.events'),
    addEventBtn = document.querySelector('.add-event'),
    addEventWrapper = document.querySelector('.add-event-wrapper'),
    addEventCloseBtn = document.querySelector('.close'),
    addEventTitle = document.querySelector('.event-name'),
    addEventFrom = document.querySelector('.event-time-from'),
    addEventTo = document.querySelector('.event-time-to'),
    eventCategory = document.querySelector('.event-category'),
    addEventSubmit = document.querySelector('.add-event-btn');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    'JANUARY',
    'FEBRUARY',
    'MARCH',
    'APRIL',
    'MAY',
    'JUNE',
    'JULY',
    'AUGUST',
    'SEPTEMBER',
    'OCTOBER',
    'NOVEMBER',
    'DECEMBER',
];

const eventsArr = [];
getEvents();
console.log(eventsArr);

function initCalendar() {
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    date.innerHTML = year + ' ' + months[month];

    let days = '';

    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }

    for (let i = 1; i <= lastDate; i++) {
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i && eventObj.month === month + 1 && eventObj.year === year) {
                event = true;
            }
        });
        if (i === new Date().getDate() && year === new Date().getFullYear() && month === new Date().getMonth()) {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);
            if (event) {
                days += `<div class="day today active event">${i}</div>`;
            } else {
                days += `<div class="day today active">${i}</div>`;
            }
        } else {
            if (event) {
                days += `<div class="day event">${i}</div>`;
            } else {
                days += `<div class="day ">${i}</div>`;
            }
        }
    }

    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`;
    }
    daysContainer.innerHTML = days;
    addListner();
}

function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);

initCalendar();

function addListner() {
    const days = document.querySelectorAll('.day');
    days.forEach((day) => {
        day.addEventListener('click', (e) => {
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            activeDay = Number(e.target.innerHTML);
            days.forEach((day) => {
                day.classList.remove('active');
            });
            if (e.target.classList.contains('prev-date')) {
                prevMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll('.day');
                    days.forEach((day) => {
                        if (!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else if (e.target.classList.contains('next-date')) {
                nextMonth();
                setTimeout(() => {
                    const days = document.querySelectorAll('.day');
                    days.forEach((day) => {
                        if (!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    });
                }, 100);
            } else {
                e.target.classList.add('active');
            }
        });
    });
}

todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
});

dateInput.addEventListener('input', (e) => {
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, '');
    if (dateInput.value.length === 2) {
        dateInput.value += '/';
    }
    if (dateInput.value.length > 7) {
        dateInput.value = dateInput.value.slice(0, 7);
    }
    if (e.inputType === 'deleteContentBackward') {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
});

gotoBtn.addEventListener('click', gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split('/');
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert('Invalid Date');
}

function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = date + ' ' + months[month] + ' ' + year;
}

function updateEvents(date) {
    let events = '';
    eventsArr.forEach((event) => {
        if (date === event.day && month + 1 === event.month && year === event.year) {
            event.events.forEach((event) => {
                events += `<div class="event ${event.category}">
            <div class="title">
              <i class="fas fa-circle"></i>
              <h3 class="event-title">${event.title}</h3>
            </div>
            <div class="event-time">
              <span class="event-time">${event.time}</span>
            </div>
        </div>`;
            });
        }
    });
    if (events === '') {
        events = `<div class="no-event">
            <h3>No Events</h3>
        </div>`;
    }
    eventsContainer.innerHTML = events;
    saveEvents();
}

addEventBtn.addEventListener('click', () => {
    addEventWrapper.classList.toggle('active');
});

addEventCloseBtn.addEventListener('click', () => {
    addEventWrapper.classList.remove('active');
});

document.addEventListener('click', (e) => {
    if (e.target !== addEventBtn && !addEventWrapper.contains(e.target)) {
        addEventWrapper.classList.remove('active');
    }
});

addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 60);
});

addEventFrom.addEventListener('input', (e) => {
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
    if (addEventFrom.value.length === 2) {
        addEventFrom.value += ':';
    }
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);
    }
});

addEventTo.addEventListener('input', (e) => {
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
    if (addEventTo.value.length === 2) {
        addEventTo.value += ':';
    }
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);
    }
});

addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value || ''; // Optional field
    const eventCategoryValue = eventCategory.value;

    if (eventTitle === '' || eventTimeFrom === '') {
        alert('Please fill all the required fields');
        return;
    }

    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo ? eventTimeTo.split(':') : [];
    if (
        timeFromArr.length !== 2 ||
        (eventTimeTo && (timeToArr.length !== 2 || timeToArr[0] > 23 || timeToArr[1] > 59)) ||
        timeFromArr[0] > 23 ||
        timeFromArr[1] > 59
    ) {
        alert('Invalid Time Format');
        return;
    }

    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = eventTimeTo ? convertTime(eventTimeTo) : '';
    const eventTime = timeTo ? `${timeFrom} - ${timeTo}` : timeFrom;

    const newEvent = {
        title: eventTitle,
        time: eventTime,
        category: eventCategoryValue,
    };

    let eventAdded = false;
    if (eventsArr.length > 0) {
        eventsArr.forEach((item) => {
            if (item.day === activeDay && item.month === month + 1 && item.year === year) {
                item.events.push(newEvent);
                eventAdded = true;
            }
        });
    }

    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [newEvent],
        });
    }

    console.log(eventsArr);
    addEventWrapper.classList.remove('active');
    addEventTitle.value = '';
    addEventFrom.value = '';
    addEventTo.value = '';
    updateEvents(activeDay);

    const activeDayEl = document.querySelector('.day.active');
    if (!activeDayEl.classList.contains('event')) {
        activeDayEl.classList.add('event');
    }
});

//function to delete event when clicked on event
eventsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('event')) {
        if (confirm('Are you sure you want to delete this event?')) {
            const eventTitle = e.target.children[0].children[1].innerHTML;
            eventsArr.forEach((event) => {
                if (event.day === activeDay && event.month === month + 1 && event.year === year) {
                    event.events.forEach((item, index) => {
                        if (item.title === eventTitle) {
                            event.events.splice(index, 1);
                        }
                    });
                    //if no events left in a day then remove that day from eventsArr
                    if (event.events.length === 0) {
                        eventsArr.splice(eventsArr.indexOf(event), 1);
                        //remove event class from day
                        const activeDayEl = document.querySelector('.day.active');
                        if (activeDayEl.classList.contains('event')) {
                            activeDayEl.classList.remove('event');
                        }
                    }
                }
            });
            updateEvents(activeDay);
        }
    }
});

function convertTime(time) {
    let timeArr = time.split(':');
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? 'PM' : 'AM';
    timeHour = timeHour % 12 || 12;
    time = timeHour + ':' + timeMin + ' ' + timeFormat;
    return time;
}

function saveEvents() {
    localStorage.setItem('events', JSON.stringify(eventsArr));
}

function getEvents() {
    if (localStorage.getItem('events') === null) {
        return;
    }
    eventsArr.push(...JSON.parse(localStorage.getItem('events')));
}

const editBtn = document.getElementById('edit-btn');

editBtn.addEventListener('click', () => {
    // 수정할 일정 정보를 가져옵니다.
    const activeDayEvents = eventsArr.find(
        (event) => event.day === activeDay && event.month === month + 1 && event.year === year
    );
    if (!activeDayEvents || activeDayEvents.events.length === 0) {
        alert('No events to edit.');
        return;
    }

    // 여기서 수정 폼을 생성하고 해당 일정 정보를 채워넣습니다.
    const editForm = document.createElement('div');
    editForm.classList.add('edit-event-form');
    editForm.innerHTML = `
        <div class="edit-event-header">
            <div class="title">일정 수정</div>
            <i class="fas fa-times close"></i>
        </div>
        <div class="edit-event-body">
            <select class="edit-event-select">
                ${activeDayEvents.events
                    .map(
                        (event, index) => `
                    <option value="${index}">${event.title}</option>
                `
                    )
                    .join('')}
            </select>
            <div class="edit-event-input">
                <input type="text" placeholder="일정 제목" class="edit-event-name" value="${
                    activeDayEvents.events[0].title
                }" />
            </div>
            <div class="edit-event-input">
                <input type="text" placeholder="시작 시간 ex) 14:00" class="edit-event-time-from" value="${
                    activeDayEvents.events[0].time.split(' - ')[0]
                }" />
            </div>
            <div class="edit-event-input">
                <input type="text" placeholder="선택) 종료 시간 ex) 23:30" class="edit-event-time-to" value="${
                    activeDayEvents.events[0].time.split(' - ')[1] || ''
                }" />
            </div>
            <select class="edit-event-category">
                <option disabled hidden>Select Category</option>
                <option value="all-op" ${activeDayEvents.events[0].category === 'ALL' ? 'selected' : ''}>ALL</option>
                <option value="crew-op" ${activeDayEvents.events[0].category === 'CREW' ? 'selected' : ''}>CREW</option>
                <option value="challenge-op" ${
                    activeDayEvents.events[0].category === 'CHALLENGE' ? 'selected' : ''
                }>CHALLENGE</option>
                <option value="etc-op" ${activeDayEvents.events[0].category === 'ETC' ? 'selected' : ''}>ETC</option>
            </select>
        </div>
        <div class="edit-event-footer">
            <button class="save-edit-btn">Save Changes</button>
        </div>
    `;

    // 수정 폼을 edit-btn 옆에 추가합니다.
    editBtn.parentNode.insertBefore(editForm, editBtn.nextSibling);

    // 닫기 버튼 클릭 시 폼을 닫습니다.
    const closeBtn = editForm.querySelector('.close');
    closeBtn.addEventListener('click', () => {
        editForm.remove();
    });

    // 선택한 이벤트 정보를 기준으로 폼을 업데이트합니다.
    const selectEvent = editForm.querySelector('.edit-event-select');
    selectEvent.addEventListener('change', (e) => {
        const selectedIndex = e.target.value;
        const selectedEvent = activeDayEvents.events[selectedIndex];
        editForm.querySelector('.edit-event-name').value = selectedEvent.title;
        editForm.querySelector('.edit-event-time-from').value = selectedEvent.time.split(' - ')[0];
        editForm.querySelector('.edit-event-time-to').value = selectedEvent.time.split(' - ')[1] || '';
        editForm.querySelector('.edit-event-category').value = selectedEvent.category;
    });

    // 수정된 내용을 저장하는 함수를 호출합니다.
    const saveEditBtn = editForm.querySelector('.save-edit-btn');
    saveEditBtn.addEventListener('click', () => {
        const selectedIndex = selectEvent.value;
        const editedTitle = editForm.querySelector('.edit-event-name').value;
        const editedTimeFrom = editForm.querySelector('.edit-event-time-from').value;
        const editedTimeTo = editForm.querySelector('.edit-event-time-to').value;
        const editedCategory = editForm.querySelector('.edit-event-category').value;

        // 유효성 검사 등을 수행하고 데이터를 수정합니다.
        activeDayEvents.events[selectedIndex].title = editedTitle;
        activeDayEvents.events[selectedIndex].time = `${editedTimeFrom} - ${editedTimeTo}`;
        activeDayEvents.events[selectedIndex].category = editedCategory;

        // 수정된 내용을 화면에 반영합니다.
        updateEvents(activeDay);

        // 수정 폼을 닫습니다.
        editForm.remove();
    });
});
