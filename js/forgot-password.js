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

// 이메일 입력값 변화 감지
function onchangeEmail() {
    let inputEmail = document.querySelector('.login-id-check').value.trim();
    console.log('Input email:', inputEmail);

    if (inputEmail === '') {
        document.querySelector('.err_email').innerHTML = '';
        document.querySelector('.err-email-div').style.border = '1px solid #898989';
        document.querySelector('.submit-button').disabled = true;
        document.querySelector('.validation-icon').style.opacity = '0';
    } else {
        // 세션 스토리지에 이메일 저장
        sessionStorage.setItem('savedEmail', inputEmail);

        // 서버에 이메일 확인 요청
        checkEmailAvailability(inputEmail);
    }
}

function checkEmailAvailability(email) {
    fetch(API_SERVER_DOMAIN + `/api/v1/user/check-email/${encodeURIComponent(email)}`, {
        method: 'GET',
        headers: {
            Authorization: 'Bearer ' + accessToken,
        },
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('이메일 확인 중 오류가 발생했습니다.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Email check response:', data);

            if (data.isSuccess) {
                if (data.result.includes('존재하는 이메일')) {
                    // 이메일이 이미 회원가입되어 있음
                    console.log('Email is already registered.');
                    let msg = '이메일 확인되었습니다.';
                    document.querySelector('.err_email').innerHTML = msg;
                    document.querySelector('.err-email-div').style.border = '1px solid #fd5e53';
                    document.querySelector('.submit-button').disabled = false;
                    document.querySelector('.validation-icon').style.opacity = '1';
                    // 여기에서 다음 페이지로 이동하는 코드를 추가할 수 있습니다.
                    // 예: window.location.href = '/next-page.html';
                } else if (data.result.includes('해당 이메일을 사용할 수 있습니다.')) {
                    // 이메일이 회원가입되어 있지 않음
                    console.log('Email is not registered.');
                    let msg = '등록된 이메일 주소가 아닙니다.';
                    document.querySelector('.err_email').innerHTML = msg;
                    document.querySelector('.err-email-div').style.border = '1px solid #fd5e53';
                    document.querySelector('.submit-button').disabled = true;
                    document.querySelector('.validation-icon').style.opacity = '0';
                    // 여기에서 적절한 UI 업데이트를 해줍니다.
                } else {
                    throw new Error('이메일 확인 결과가 올바르지 않습니다.');
                }
            } else {
                throw new Error('이메일 확인 요청에 실패했습니다.');
            }
        })
        .catch((error) => {
            console.error('이메일 확인 중 오류:', error);
            // 여기에서 적절한 에러 처리를 해줍니다.
            let msg = '이메일 확인 중 오류가 발생했습니다.';
            document.querySelector('.err_email').innerHTML = msg;
            document.querySelector('.err-email-div').style.border = '1px solid #fd5e53';
            document.querySelector('.submit-button').disabled = true;
            document.querySelector('.validation-icon').style.opacity = '0';
            // 에러 메시지 등을 사용자에게 표시할 수 있습니다.
        });
}

// 인증코드 발송 버튼 클릭 시
function sendVerificationCode() {
    let inputEmail = document.querySelector('.login-id-check').value.trim();
    console.log('Sending verification code to:', inputEmail);

    // 세션 스토리지에 이메일 저장
    sessionStorage.setItem('savedEmail', inputEmail);
    console.log('세이브성공');

    // 서버에 인증코드 발송 요청
    fetch(API_SERVER_DOMAIN + '/api/v1/mail/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
            email: inputEmail,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('인증코드 전송 중 오류가 발생했습니다.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('Verification code sent successfully to:', inputEmail);
            alert('인증코드가 이메일로 발송되었습니다.');
            // 인증코드가 성공적으로 발송된 후 추가적인 처리를 진행할 수 있습니다.

            // 인증코드가 성공적으로 발송된 후 다음 페이지로 이동
            window.location.href = '/html/certification.html';
        })
        .catch((error) => {
            console.error('인증코드 전송 중 오류:', error);
            alert('인증코드 전송 중 오류가 발생했습니다.');
        });
}
