const API_SERVER_DOMAIN = 'http://15.164.41.239:8080';
const accessToken = getCookie('accessToken');

// 기존에 제공된 쿠키 설정 함수
function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

// 기존에 제공된 쿠키 가져오는 함수
function getCookie(name) {
    var nameEQ = name + '=';
    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        while (cookie.charAt(0) === ' ') {
            cookie = cookie.substring(1, cookie.length);
        }
        if (cookie.indexOf(nameEQ) === 0) {
            return cookie.substring(nameEQ.length, cookie.length);
        }
    }
    return null;
}

// 쿠키 삭제 함수 추가
function deleteCookie(name) {
    document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

document.addEventListener('DOMContentLoaded', function () {
    // 페이지 로딩 후 실행할 함수
    updateRepresentativePlant();

    // 대표 식물 이미지 업데이트 함수
    function updateRepresentativePlant() {
        // 서버에서 대표 식물 정보를 가져오는 GET 요청
        fetch(`${API_SERVER_DOMAIN}/api/v1/plants/main-plant`, {
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken,
            },
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok ' + response.statusText);
                }
                return response.json();
            })
            .then((data) => {
                console.log(data);
                if (data.isSuccess) {
                    const mainPlantId = data.result;
                    console.log('Main Plant ID:', mainPlantId);

                    // 대표 식물 이미지 업데이트
                    const imgElement = document.querySelector('.pre-myplant-img .myplant-img');
                    imgElement.src = `/img/plant_unlock/${mainPlantId}.png`;
                } else {
                    console.error('Failed to fetch main plant data:', data.message);
                }
            })
            .catch((error) => {
                console.error('Error fetching main plant data:', error);
            });
    }
});
