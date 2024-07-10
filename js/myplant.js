let API_SERVER_DOMAIN = 'http://15.164.41.239:8080';

// 쿠키에서 특정 이름의 값을 가져오는 함수
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

// 리프레시 토큰을 사용하여 새로운 액세스 토큰을 가져오는 함수
function getAccessTokenWithRefreshToken(accessToken, refreshToken) {
    return fetch(API_SERVER_DOMAIN + '/api/v1/auth/refresh', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            accessToken: accessToken,
            refreshToken: refreshToken,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Failed to refresh access token');
            }
            return response.json();
        })
        .then((data) => {
            return data.accessToken;
        });
}

// 유저 정보를 가져오는 함수 (이 부분을 작성하세요)
function getMyPlantInfo(accessToken) {
    return fetch(API_SERVER_DOMAIN + '/api/v1/plants', {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    })
        .then((response) => {
            // console.log(accessToken);
            console.log('ha');
            if (!response.ok) {
                throw new Error('User info request failed');
            }
            return response.json();
        })
        .then((data) => {
            return data.name;
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // 페이지 로드 시 실행되는 코드

    // 쿠키에서 accessToken 가져오기
    var accessToken = getCookie('accessToken');
    var refreshToken = getCookie('refreshToken');

    console.log(accessToken);
    console.log(refreshToken);

    if (accessToken) {
        console.log(accessToken);
        // accessToken이 있는 경우, 서버에 사용자 정보 요청
        getMyPlantInfo(accessToken)
            .then((name) => {
                // 유저 이름을 페이지에 표시
                // var userNameSpans = document.querySelectorAll('.user-name');
                // userNameSpans.forEach((span) => {
                //     span.textContent = name;
                //     span.classList.remove('d-none');
                // });
            })
            .catch((error) => {
                console.error('User info error:', error);
                // accessToken이 만료된 경우 refresh 토큰을 사용하여 새로운 accessToken을 가져옴
                if (refreshToken) {
                    getAccessTokenWithRefreshToken(accessToken, refreshToken)
                        .then((newAccessToken) => {
                            // 새로운 accessToken으로 사용자 정보 요청
                            getMyPlantInfo(newAccessToken)
                                .then((name) => {
                                    // var userNameSpans = document.querySelectorAll('.user-name');
                                    // userNameSpans.forEach((span) => {
                                    //     span.textContent = name;
                                    //     span.classList.remove('d-none');
                                    // });
                                })
                                .catch((error) => {
                                    console.error('User info error after refreshing token:', error);
                                });
                        })
                        .catch((error) => {
                            console.error('Failed to refresh access token:', error);
                        });
                }
            });
    }
});
