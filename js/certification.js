// const API_SERVER_DOMAIN = 'http://15.164.41.239:8080'; // API 서버 주소
// let certificationCodeTimeout;
// let testCertificationCode = ''; // 서버에서 받은 실제 인증코드 저장 변수
// const accessToken = getCookie('accessToken');

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

// // 인증번호 입력값 변화 감지 설정
// let certificationInput = document.querySelector('#certification-code'); // 인증번호 입력 필드

// if (certificationInput) {
//     certificationInput.addEventListener('input', onchangeCertificationCode);
//     console.log('인증번호 입력 이벤트 핸들러가 등록되었습니다.');
// } else {
//     console.error('인증번호 입력 요소를 찾을 수 없습니다.');
// }

// // 초기 인증코드 유효시간 시작
// startCertificationCodeTimeout();

// // 세션 스토리지에서 이메일 가져오기
// let savedEmail = sessionStorage.getItem('savedEmail');

// // 인증번호 입력값 변화 감지
// function onchangeCertificationCode() {
//     let inputCertificationCode = certificationInput.value.trim(); // 입력된 인증번호 값 가져오기

//     if (inputCertificationCode === '') {
//         document.querySelector('#err_certification').innerHTML = '';
//         document.querySelector('.err-doublecheck').style.border = '1px solid #898989';
//         document.querySelector('.validation-icon-1').style.opacity = '0';
//         document.querySelector('#submit-button-re-pw').disabled = true;
//     } else {
//         // 서버에 인증코드 확인 요청
//         fetch(API_SERVER_DOMAIN + '/api/v1/mail/auth', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + accessToken,
//             },
//             body: JSON.stringify({
//                 email: savedEmail, // 이전 페이지에서 저장된 이메일 사용
//                 certificationNum: inputCertificationCode,
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('인증코드 확인 중 오류가 발생했습니다.');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log('Verification code validation successful:', data);
//                 if (data.isSuccess && data.code === 'COMMON200') {
//                     // 인증코드가 일치할 경우
//                     let msg = '올바른 인증코드입니다.';
//                     document.querySelector('#err_certification').innerHTML = '';
//                     document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
//                     document.querySelector('.validation-icon-1').style.opacity = '1';
//                     document.querySelector('#submit-button-re-pw').disabled = false;
//                 } else {
//                     // 인증코드가 일치하지 않을 경우
//                     let msg = '올바른 인증코드가 아닙니다.';
//                     document.querySelector('#err_certification').innerHTML = msg;
//                     document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
//                     document.querySelector('.validation-icon-1').style.opacity = '0';
//                     document.querySelector('submit-button-re-pw').style.color = '#898989';
//                     document.querySelector('#submit-button-re-pw').disabled = true;
//                 }
//             })
//             .catch((error) => {
//                 console.error('인증코드 확인 중 오류:', error);
//                 let msg = '인증코드 확인 중 오류가 발생했습니다.';
//                 document.querySelector('#err_certification').innerHTML = msg;
//                 document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
//                 document.querySelector('.validation-icon-1').style.opacity = '0';
//                 document.querySelector('submit-button-re-pw').style.color = '#898989';
//                 document.querySelector('#submit-button-re-pw').disabled = true;
//             });
//     }
// }

// // 인증코드 재전송 버튼 클릭 이벤트 핸들러 등록
// let resendCodeButton = document.getElementById('resend-code-button');

// if (resendCodeButton) {
//     resendCodeButton.addEventListener('click', function () {
//         // 서버에 인증코드 재전송 요청
//         fetch(API_SERVER_DOMAIN + '/api/v1/mail/check', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 Authorization: 'Bearer ' + accessToken,
//             },
//             body: JSON.stringify({
//                 email: savedEmail, // 세션 스토리지에서 가져온 이메일 사용
//             }),
//         })
//             .then((response) => {
//                 if (!response.ok) {
//                     throw new Error('인증코드 재전송 중 오류가 발생했습니다.');
//                 }
//                 return response.json();
//             })
//             .then((data) => {
//                 console.log('인증코드 재전송 성공:', data);
//                 alert('인증코드가 다시 전송되었습니다.');
//                 // 성공적으로 재전송된 후 추가적인 처리를 진행할 수 있습니다.
//             })
//             .catch((error) => {
//                 console.error('인증코드 재전송 중 오류:', error);
//                 alert('인증코드 재전송 중 오류가 발생했습니다.');
//             });
//     });
// } else {
//     console.error('인증코드 재전송 버튼을 찾을 수 없습니다.');
// }

// function submitPasswordReset() {
//     window.location.href = '/html/re_pw.html';
// }

// // 초기 인증코드 유효시간 시작
// function startCertificationCodeTimeout() {
//     certificationCodeTimeout = setTimeout(() => {
//         testCertificationCode = ''; // 인증코드 만료 처리
//         alert('인증코드의 유효시간이 만료되었습니다. 인증코드를 다시 요청해주세요.');
//         document.querySelector('.validation-icon-1').style.opacity = '0';
//         document.querySelector('#submit-button-re-pw').disabled = true;
//     }, 300000); // 300,000 milliseconds = 5 minutes
// }

const API_SERVER_DOMAIN = 'http://15.164.41.239:8080'; // API 서버 주소
let certificationCodeTimeout;
let testCertificationCode = ''; // 서버에서 받은 실제 인증코드 저장 변수
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

// 인증번호 입력값 변화 감지 설정
let certificationInput = document.querySelector('#certification-code'); // 인증번호 입력 필드

if (certificationInput) {
    certificationInput.addEventListener('input', onchangeCertificationCode);
    console.log('인증번호 입력 이벤트 핸들러가 등록되었습니다.');
} else {
    console.error('인증번호 입력 요소를 찾을 수 없습니다.');
}

// 초기 인증코드 유효시간 시작
startCertificationCodeTimeout();

// 세션 스토리지에서 이메일 가져오기
let savedEmail = sessionStorage.getItem('savedEmail');

// 인증번호 입력값 변화 감지
function onchangeCertificationCode() {
    let inputCertificationCode = certificationInput.value.trim(); // 입력된 인증번호 값 가져오기

    if (inputCertificationCode === '') {
        document.querySelector('#err_certification').innerHTML = '';
        document.querySelector('.err-doublecheck').style.border = '1px solid #898989';
        document.querySelector('.validation-icon-1').style.opacity = '0';
        document.querySelector('#submit-button-re-pw').disabled = true;
    } else {
        // 서버에 인증코드 확인 요청
        fetch(API_SERVER_DOMAIN + '/api/v1/mail/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + accessToken,
            },
            body: JSON.stringify({
                email: savedEmail, // 이전 페이지에서 저장된 이메일 사용
                certificationNum: inputCertificationCode,
            }),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('인증코드 확인 중 오류가 발생했습니다.');
                }
                return response.json();
            })
            .then((data) => {
                console.log('Verification code validation successful:', data);
                if (data.isSuccess && data.code === 'COMMON200') {
                    // 인증코드가 일치할 경우
                    testCertificationCode = inputCertificationCode; // 최신 인증코드로 업데이트
                    let msg = '올바른 인증코드입니다.';
                    document.querySelector('#err_certification').innerHTML = msg;
                    document.querySelector('.err-doublecheck').style.border = '1px solid #898989';
                    document.querySelector('.validation-icon-1').style.opacity = '1';
                    document.querySelector('#submit-button-re-pw').disabled = false;
                } else {
                    // 인증코드가 일치하지 않을 경우
                    let msg = '올바른 인증코드가 아닙니다.';
                    document.querySelector('#err_certification').innerHTML = msg;
                    document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
                    document.querySelector('.validation-icon-1').style.opacity = '0';
                    document.querySelector('#submit-button-re-pw').disabled = true;
                }
            })
            .catch((error) => {
                console.error('인증코드 확인 중 오류:', error);
                let msg = '인증코드 확인 중 오류가 발생했습니다.';
                document.querySelector('#err_certification').innerHTML = msg;
                document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
                document.querySelector('.validation-icon-1').style.opacity = '0';
                document.querySelector('#submit-button-re-pw').disabled = true;
            });
    }
}

// 인증코드 재전송 처리
let resendCodeButton = document.querySelector('#resend-code-button');
if (resendCodeButton) {
    resendCodeButton.addEventListener('click', resendCertificationCode);
}

function resendCertificationCode() {
    // 서버에 인증코드 재전송 요청
    fetch(API_SERVER_DOMAIN + '/api/v1/mail/check', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + accessToken,
        },
        body: JSON.stringify({
            email: savedEmail,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('인증코드 재전송 중 오류가 발생했습니다.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('인증코드 재전송 성공:', data);
            // 재전송된 인증코드를 testCertificationCode 변수에 저장
            if (data.isSuccess && data.code === 'COMMON200') {
                testCertificationCode = data.result.newCertificationCode; // 서버에서 새로운 인증코드 받아오기
                // startCertificationCodeTimeout(); // 새로운 인증코드 유효시간 시작
                alert('새로운 인증코드가 발송되었습니다.');
            }
        })
        .catch((error) => {
            console.error('인증코드 재전송 중 오류:', error);
            let msg = '인증코드 재전송 중 오류가 발생했습니다.';
            document.querySelector('#err_certification').innerHTML = msg;
            document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
            document.querySelector('.validation-icon-1').style.opacity = '0';
            document.querySelector('#submit-button-re-pw').disabled = true;
        });
}

function submitPasswordReset() {
    window.location.href = '/html/re_pw.html';
}

// 초기 인증코드 유효시간 시작
function startCertificationCodeTimeout() {
    clearTimeout(certificationCodeTimeout); // 이전 타임아웃 클리어
    certificationCodeTimeout = setTimeout(() => {
        testCertificationCode = ''; // 인증코드 만료 처리
        alert('인증코드의 유효시간이 만료되었습니다. 인증코드를 다시 요청해주세요.');
        document.querySelector('.validation-icon-1').style.opacity = '0';
        document.querySelector('#submit-button-re-pw').disabled = true;
    }, 300000); // 300,000 milliseconds = 5 minutes
}
