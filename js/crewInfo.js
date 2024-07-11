let API_SERVER_DOMAIN = "http://15.164.41.239:8080";
let accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMjMiLCJpYXQiOjE3MjA2ODgwMTYsImV4cCI6MTcyOTMyODAxNn0.fu1fqnyL3HNCQA7XwpquHjgT0PfP0POQdmfn-OhBxg8";

document.addEventListener('DOMContentLoaded', () => {
    const crewId = localStorage.getItem('selectedCrewId');

    if (crewId) {
        getCrewDetails(crewId);
    } else {
        console.error('localStorage에서 crewId를 찾을 수 없습니다');
    }
    const joinButton = document.getElementById('crew-join-btn');
    if (joinButton) {
        joinButton.addEventListener('click', handleClick);
    } else {
        console.error('가입 버튼을 찾을 수 없습니다');
    }
});

function handleClick() {
    if (! this.classList.contains('clicked')) {
        this.classList.add('clicked');
        joinCrew();
    }
}

function getCrewDetails(crewId) {
    fetch(API_SERVER_DOMAIN + `/api/v1/crews/${crewId}`, {
        method: "GET",
        headers: {
            Authorization: "Bearer " + accessToken,
        },
    }).then(response => {
        if (!response.ok) {
            throw new Error('크루 정보를 가져오는 데 실패했습니다');
        }
        return response.json();
    }).then(data => {
        if (data.isSuccess) {
            displayCrewDetails(data.result);
        } else {
            throw new Error('요청 실패: ' + data.message);
        }
    }).catch(error => {
        console.error('크루 정보를 가져오는 중 에러 발생:', error);
    });
}

function displayCrewDetails(crew) {
    const crewImgElement = document.querySelector('.crew-active-imgs img');
    crewImgElement.src = crew.crewImg;

    const crewNameElement = document.querySelector('#infoCrewName p');
    crewNameElement.textContent = crew.crewName;

    const info3Element = document.querySelector('.info3');
    if (info3Element) {
        info3Element.innerHTML = '';
        crew.crewChallengePreviewList.crewChallengePreviewList.forEach(challenge => {
            const activeItem = document.createElement('div');
            activeItem.className = 'active-item';
            activeItem.innerHTML = `
                <div id ="item-bar"></div>
                <div id ="active-period">${challenge.startAt} - ${challenge.untilWhen}</div>
                <div id ="active-name">${challenge.challengeName}</div>
            `;
            info3Element.appendChild(activeItem);
        });
    } else {
        console.error('.info3 요소를 찾을 수 없습니다');
    }
}

function joinCrew() {
    const crewId = localStorage.getItem('selectedCrewId');
    
    fetch(API_SERVER_DOMAIN + `/api/v1/crews/join/${crewId}`, {
        method: "POST",
        headers: {
            Authorization: "Bearer " + accessToken,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({})
    }).then(response => {
        if (!response.ok) {
            throw new Error('크루 가입에 실패했습니다');
        }
        return response.json();
    }).then(data => {
        if (data.isSuccess) {
            console.log('크루 가입 성공:', data.result);
            const joinButton = document.getElementById('crew-join-btn');
            joinButton.textContent = '신청완료';
            joinButton.disabled = true;
            document.getElementById('join-complete').style.visibility = 'visible';
        } else {
            throw new Error('크루 가입 실패');
        }
    }).catch(error => {
        console.error('크루 가입 중 에러 발생:', error);
        alert('크루 가입에 실패했습니다. 다시 시도해주세요');
    });
}

