let API_SERVER_DOMAIN = 'http://15.164.41.239:8080';
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

async function fetchData() {
    try {
        const response = await fetch(`${API_SERVER_DOMAIN}/api/v1/plants`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        if (!response.ok) {
            throw new Error('네트워크 응답이 올바르지 않습니다.');
        }
        const data = await response.json();
        if (data.isSuccess) {
            return data.result;
        } else {
            throw new Error(data.message);
        }
    } catch (error) {
        console.error('데이터를 가져오는 중 에러 발생:', error);
        return null;
    }
}

async function populatePlants() {
    const data = await fetchData();
    if (!data) return;

    const plantIds = data.plantPreviewDtoList.map((plant) => plant.plantId);

    // 식물이 해금되었는지 여부에 따라 라디오 버튼 활성화/비활성화
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    radioButtons.forEach((radio) => {
        const plantId = parseInt(radio.getAttribute('plant_id'));
        if (plantIds.includes(plantId)) {
            radio.removeAttribute('disabled');
        } else {
            radio.setAttribute('disabled', 'true');
        }
    });

    // 라디오 버튼 클릭 시 다른 라디오 버튼 비활성화 처리
    radioButtons.forEach((radio) => {
        radio.addEventListener('click', () => {
            const selectedPlantId = parseInt(radio.getAttribute('plant_id'));
            radioButtons.forEach((otherRadio) => {
                const otherPlantId = parseInt(otherRadio.getAttribute('plant_id'));
                if (otherPlantId !== selectedPlantId) {
                    otherRadio.setAttribute('disabled', 'true');
                }
            });
        });
    });
}

document.addEventListener('DOMContentLoaded', function () {
    populatePlants();

    const setButton = document.getElementById('set-representative-plant-button');
    setButton.addEventListener('click', async function () {
        const selectedRadio = document.querySelector('input[type="radio"]:checked');
        if (!selectedRadio) {
            console.error('선택된 라디오 버튼이 없습니다.');
            return;
        }
        const selectedPlantId = parseInt(selectedRadio.getAttribute('plant_id'));
        const requestBody = {
            previousMainPlantId: selectedPlantId,
        };

        try {
            const response = await fetch(`${API_SERVER_DOMAIN}/api/v1/setMainPlant`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                body: JSON.stringify(requestBody),
            });
            if (!response.ok) {
                throw new Error('대표 식물 설정에 실패했습니다.');
            }
            // 성공적인 응답 처리
            // SCREWHOME 페이지의 이미지 업데이트
            const imageElement = document.querySelector('.pre-myplant-img img');
            const unlockSrc = document
                .querySelector(`input[plant_id="${selectedPlantId}"]`)
                .getAttribute('data-unlock-src');
            imageElement.src = unlockSrc;

            // 선택된 라디오 버튼을 제외한 나머지 라디오 버튼 활성화 처리
            radioButtons.forEach((radio) => {
                const plantId = parseInt(radio.getAttribute('plant_id'));
                if (plantId !== selectedPlantId) {
                    radio.removeAttribute('disabled');
                }
            });
        } catch (error) {
            console.error('대표 식물 설정 중 에러 발생:', error);
        }
    });
});
