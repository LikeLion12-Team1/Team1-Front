// let API_SERVER_DOMAIN = 'http://15.164.41.239:8080';
// const accessToken = getCookie('accessToken');
// let plantUnlocked = false;

// // 기존에 제공된 쿠키 설정 함수
// function setCookie(name, value, days) {
//     var expires = '';
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//         expires = '; expires=' + date.toUTCString();
//     }
//     document.cookie = name + '=' + value + expires + '; path=/';
// }

// // 기존에 제공된 쿠키 가져오는 함수
// function getCookie(name) {
//     var nameEQ = name + '=';
//     var cookies = document.cookie.split(';');
//     for (var i = 0; i < cookies.length; i++) {
//         var cookie = cookies[i];
//         while (cookie.charAt(0) === ' ') {
//             cookie = cookie.substring(1, cookie.length);
//         }
//         if (cookie.indexOf(nameEQ) === 0) {
//             return cookie.substring(nameEQ.length, cookie.length);
//         }
//     }
//     return null;
// }

// // 쿠키 삭제 함수 추가
// function deleteCookie(name) {
//     document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
// }

// document.addEventListener('DOMContentLoaded', function () {
//     if (!accessToken) {
//         window.location.href = '/html/login.html';
//         return;
//     }

//     // 서버에서 식물 목록 가져오기
//     fetch(API_SERVER_DOMAIN + '/api/v1/plants', {
//         method: 'GET',
//         headers: {
//             Authorization: 'Bearer ' + accessToken,
//         },
//     })
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok ' + response.statusText);
//             }
//             return response.json();
//         })
//         .then((data) => {
//             console.log(data);
//             if (data.isSuccess) {
//                 const unlockedPlants = data.result.plantPreviewDtoList;
//                 console.log('Unlocked Plants:', unlockedPlants);

//                 // 식물 이미지 업데이트 함수 호출
//                 updatePlantImages(unlockedPlants);
//             } else {
//                 console.error('Failed to fetch plant data:', data.message);
//             }
//         })
//         .catch((error) => {
//             console.error('Error fetching plant data:', error);
//         });

//     // 식물 이미지 업데이트 함수
//     function updatePlantImages(unlockedPlants) {
//         const plantList = unlockedPlants.map((plant) => plant.plantId);

//         console.log('업데이트할 식물 목록:', plantList); // 업데이트할 데이터 로그

//         // 모든 라디오 버튼을 비활성화
//         const radioButtons = document.querySelectorAll('input[type="radio"]');
//         radioButtons.forEach((radio) => {
//             radio.setAttribute('disabled', 'true');
//         });

//         let firstRadioSet = false;

//         // 각 식물 이미지 및 라디오 버튼 업데이트
//         plantList.forEach((plantId) => {
//             const imgElement = document.querySelector(`img[plant_id="${plantId}"]`);
//             if (imgElement) {
//                 imgElement.src = '/img/plant_unlock/' + plantId + '.png';
//                 const radioElement = document.querySelector(`input[type="radio"][plant_id="${plantId}"]`);
//                 if (radioElement) {
//                     radioElement.removeAttribute('disabled');
//                     radioElement.addEventListener('click', function () {
//                         radioButtons.forEach((radio) => {
//                             if (radio !== radioElement) {
//                                 radio.checked = false;
//                             }
//                         });
//                     });
//                 }
//             }
//         });
//     }
// });

let API_SERVER_DOMAIN = 'http://15.164.41.239:8080';
const accessToken = getCookie('accessToken');
let plantUnlocked = false;

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
    if (!accessToken) {
        window.location.href = '/html/login.html';
        return;
    }

    // 서버에서 식물 목록 가져오기
    fetch(API_SERVER_DOMAIN + '/api/v1/plants', {
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
                const unlockedPlants = data.result.plantPreviewDtoList;
                console.log('Unlocked Plants:', unlockedPlants);

                // 식물 이미지 업데이트 함수 호출
                updatePlantImages(unlockedPlants);
            } else {
                console.error('Failed to fetch plant data:', data.message);
            }
        })
        .catch((error) => {
            console.error('Error fetching plant data:', error);
        });

    // 식물 이미지 업데이트 함수
    function updatePlantImages(unlockedPlants) {
        const plantList = unlockedPlants.map((plant) => plant.plantId);

        console.log('업데이트할 식물 목록:', plantList); // 업데이트할 데이터 로그

        // 모든 라디오 버튼을 비활성화하고 체크 해제
        const radioButtons = document.querySelectorAll('input[type="radio"]');
        radioButtons.forEach((radio) => {
            radio.setAttribute('disabled', 'true');
            radio.checked = false;
        });

        // 각 식물 이미지 및 라디오 버튼 업데이트
        plantList.forEach((plantId) => {
            const imgElement = document.querySelector(`img[plant_id="${plantId}"]`);
            if (imgElement) {
                imgElement.src = '/img/plant_unlock/' + plantId + '.png';
                const radioElement = document.querySelector(`input[type="radio"][plant_id="${plantId}"]`);
                if (radioElement) {
                    radioElement.removeAttribute('disabled');
                    radioElement.addEventListener('click', function () {
                        radioButtons.forEach((radio) => {
                            if (radio !== radioElement) {
                                radio.checked = false;
                            }
                        });
                    });
                }
            }
        });
    }

    // 대표 식물 지정 버튼 클릭 이벤트 핸들러
    document.getElementById('set-representative-plant-button').addEventListener('click', function () {
        const selectedRadio = document.querySelector('input[type="radio"]:checked');
        if (!selectedRadio) {
            alert('대표 식물을 선택하세요.');
            return;
        }

        const plantId = selectedRadio.getAttribute('plant_id');
        console.log(plantId);

        fetch(`${API_SERVER_DOMAIN}/api/v1/plants/${plantId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify({ previousMainPlantId: plantId }),
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
                    alert('대표 식물이 성공적으로 지정되었습니다.');
                } else {
                    console.error('Failed to set representative plant:', data.message);
                    alert('대표 식물 지정에 실패했습니다.');
                }
            })
            .catch((error) => {
                console.error('Error setting representative plant:', error);
                alert('대표 식물 지정 중 오류가 발생했습니다.');
            });
    });
});
