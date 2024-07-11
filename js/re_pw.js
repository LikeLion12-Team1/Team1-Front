// const confirmButton = document.querySelector('.btn-confirm-pw');

// function validatePassword() {
//     const password = document.querySelector('#ch-pw').value;
//     const passwordError = document.querySelector('#err_pw');
//     const passwordValidationIcon = document.querySelector('#validation-icon-2');
//     const confirmPassword = document.querySelector('#confirm-pw').value;

//     const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);

//     if (password === '') {
//         passwordError.innerHTML = '';
//         passwordValidationIcon.style.opacity = '0';
//     } else if (!isValidPassword) {
//         passwordError.innerHTML = '한글 제외 최소 8자 이상 입력해주세요.';
//         passwordValidationIcon.style.opacity = '0';
//         document.querySelector('.new-password-div').style.border = '1px solid #fd5e53';
//     } else {
//         passwordError.innerHTML = '';
//         document.querySelector('.new-password-div').style.border = '1px solid #c7c4c4';
//         passwordValidationIcon.style.opacity = '1';
//     }

//     validateConfirmPassword();
//     toggleSubmitButton();
// }

// function validateConfirmPassword() {
//     const password = document.querySelector('#ch-pw').value;
//     const confirmPassword = document.querySelector('#confirm-pw').value;
//     const confirmPasswordError = document.querySelector('#err_confirm');
//     const confirmPasswordValidationIcon = document.querySelector('#validation-icon-3');

//     if (confirmPassword === '') {
//         confirmPasswordError.innerHTML = '';
//         confirmPasswordValidationIcon.style.opacity = '0';
//     } else if (confirmPassword !== password) {
//         confirmPasswordError.innerHTML = '비밀번호가 일치하지 않습니다.';
//         confirmPasswordValidationIcon.style.opacity = '0';
//         document.querySelector('.new-password-dc-pw').style.border = '1px solid #fd5e53';
//     } else {
//         confirmPasswordError.innerHTML = '';
//         confirmPasswordValidationIcon.style.opacity = '1';
//         document.querySelector('.new-password-dc-pw').style.border = '1px solid #c7c4c4';
//         document.querySelector('.btn-confirm-pw').style.backgroundColor = '#fd5e53';
//         confirmButton.disabled = false;
//     }

//     toggleSubmitButton();
// }

// document.querySelector('#ch-pw').addEventListener('input', validatePassword);
// document.querySelector('#confirm-pw').addEventListener('input', validateConfirmPassword);

// const API_SERVER_DOMAIN = 'http://15.164.41.239:8080';
// const accessToken = getCookie('accessToken');

// // 세션 스토리지에서 이메일 가져오기
// let savedEmail = sessionStorage.getItem('savedEmail');

// document.addEventListener('DOMContentLoaded', async function () {
//     console.log('DOM이 로드되었습니다.');

//     const API_SERVER_DOMAIN = 'http://15.164.41.239:8080'; // API 서버 도메인
//     const accessToken = getCookie('accessToken'); // accessToken 가져오기

//     console.log('accessToken:', accessToken);

//     try {
//         await changePassword(); // 페이지가 열리자마자 changePassword 함수 실행
//     } catch (error) {
//         console.error('비밀번호 변경 중 오류 발생:', error);
//         alert('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
//     }

//     // 비밀번호 변경 함수
//     async function changePassword() {
//         const savedEmail = sessionStorage.getItem('savedEmail'); // 저장된 이메일 가져오기
//         console.log('저장된 이메일:', savedEmail);

//         const newPassword = document.getElementById('ch-pw').value; // 새 비밀번호 가져오기
//         console.log('새 비밀번호:', newPassword);

//         const url = `${API_SERVER_DOMAIN}/api/v1/user/password`;
//         const body = {
//             email: savedEmail,
//             password: newPassword,
//         };

//         const options = {
//             method: 'PATCH',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'x-content-type-options': 'nosniff', // x-content-type-options 헤더 추가
//                 Authorization: `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify(body),
//         };

//         console.log('변경 요청 전송:', options);

//         const response = await fetch(url, options);
//         const data = await response.json();

//         console.log('서버 응답:', data);

//         if (data.isSuccess) {
//             alert('비밀번호가 성공적으로 변경되었습니다!');
//             sessionStorage.removeItem('savedEmail');
//             // window.location.href = '/html/login.html'; // 로그인 페이지로 이동
//         } else {
//             throw new Error(`비밀번호 변경에 실패했습니다: ${data.message}`);
//         }
//     }

//     // 쿠키 가져오기 함수
//     function getCookie(name) {
//         var nameEQ = name + '=';
//         var cookies = document.cookie.split(';');
//         for (var i = 0; i < cookies.length; i++) {
//             var cookie = cookies[i];
//             while (cookie.charAt(0) === ' ') {
//                 cookie = cookie.substring(1, cookie.length);
//             }
//             if (cookie.indexOf(nameEQ) === 0) {
//                 return cookie.substring(nameEQ.length, cookie.length);
//             }
//         }
//         return null;
//     }
// });

// const API_SERVER_DOMAIN = 'http://15.164.41.239:8080'; // API 서버 도메인
// const accessToken = getCookie('accessToken'); // accessToken 가져오기
// const confirmButton = document.getElementById('btn-confirm-pw'); // 확인 버튼

// console.log('accessToken:', accessToken);
// console.log('confirmButton:', confirmButton);

// function setCookie(name, value, days) {
//     var expires = '';
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
//         expires = '; expires=' + date.toUTCString();
//     }
//     document.cookie = name + '=' + value + expires + '; path=/';
// }

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

// function deleteCookie(name) {
//     document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
// }

// function validatePassword() {
//     const password = document.getElementById('ch-pw').value;
//     const passwordError = document.getElementById('err_pw');
//     const passwordValidationIcon = document.getElementById('validation-icon-2');

//     const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);

//     if (password === '') {
//         passwordError.innerHTML = '';
//         passwordValidationIcon.style.opacity = '0';
//     } else if (!isValidPassword) {
//         passwordError.innerHTML = '한글 제외 최소 8자 이상 입력해주세요.';
//         passwordValidationIcon.style.opacity = '0';
//         document.querySelector('.new-password-div').style.border = '1px solid #fd5e53';
//     } else {
//         passwordError.innerHTML = '';
//         document.querySelector('.new-password-div').style.border = '1px solid #c7c4c4';
//         passwordValidationIcon.style.opacity = '1';
//     }

//     validateConfirmPassword();
//     toggleSubmitButton();
// }

// function validateConfirmPassword() {
//     const password = document.getElementById('ch-pw').value;
//     const confirmPassword = document.getElementById('confirm-pw').value;
//     const confirmPasswordError = document.getElementById('err_confirm');
//     const confirmPasswordValidationIcon = document.getElementById('validation-icon-3');

//     if (confirmPassword === '') {
//         confirmPasswordError.innerHTML = '';
//         confirmPasswordValidationIcon.style.opacity = '0';
//     } else if (confirmPassword !== password) {
//         confirmPasswordError.innerHTML = '비밀번호가 일치하지 않습니다.';
//         confirmPasswordValidationIcon.style.opacity = '0';
//         document.querySelector('.new-password-dc-pw').style.border = '1px solid #fd5e53';
//         confirmButton.style.backgroundColor = '#c7c4c4';
//     } else {
//         confirmPasswordError.innerHTML = '';
//         confirmPasswordValidationIcon.style.opacity = '1';
//         document.querySelector('.new-password-dc-pw').style.border = '1px solid #c7c4c4';
//         confirmButton.style.backgroundColor = '#fd5e53';
//         confirmButton.disabled = false; // 확인 버튼 활성화
//     }

//     toggleSubmitButton();
// }

// function toggleSubmitButton() {
//     const password = document.getElementById('ch-pw').value;
//     const confirmPassword = document.getElementById('confirm-pw').value;

//     if (
//         password !== '' &&
//         confirmPassword !== '' &&
//         document.getElementById('err_pw').innerHTML === '' &&
//         document.getElementById('err_confirm').innerHTML === ''
//     ) {
//         confirmButton.disabled = false;
//     } else {
//         confirmButton.disabled = true;
//     }
// }

// // 비밀번호 변경 함수
// function changePassword() {
//     const savedEmail = sessionStorage.getItem('savedEmail'); // 저장된 이메일 가져오기
//     console.log('저장된 이메일:', savedEmail);

//     const newPassword = document.getElementById('ch-pw').value; // 새 비밀번호 가져오기
//     console.log('새 비밀번호:', newPassword);

//     const url = `${API_SERVER_DOMAIN}/api/v1/user/password`;
//     const body = {
//         email: savedEmail,
//         password: newPassword,
//     };

//     const options = {
//         method: 'PATCH',
//         headers: {
//             'Content-Type': 'application/json',
//             'x-content-type-options': 'nosniff', // x-content-type-options 헤더 추가
//             Authorization: `Bearer ${accessToken}`,
//         },
//         body: JSON.stringify(body),
//     };

//     console.log('변경 요청 전송:', options);

//     return fetch(url, options)
//         .then((response) => {
//             if (!response.ok) {
//                 throw new Error('네트워크 오류로 인해 비밀번호를 변경할 수 없습니다.');
//             }
//             return response.json();
//         })
//         .then((data) => {
//             console.log('서버 응답:', data);
//             if (data.isSuccess) {
//                 console.log('비밀번호 변경 성공:', data);
//                 alert('비밀번호가 성공적으로 변경되었습니다!');
//                 sessionStorage.removeItem('savedEmail');
//                 window.location.href = '/html/login.html'; // 로그인 페이지로 이동
//             } else {
//                 console.error('비밀번호 변경 실패:', data.message);
//                 alert(`비밀번호 변경에 실패했습니다: ${data.message}`);
//             }
//         })
//         .catch((error) => {
//             console.error('비밀번호 변경 중 오류 발생:', error);
//             alert('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
//         });
// }

// // 이벤트 리스너 설정
// document.getElementById('ch-pw').addEventListener('input', validatePassword);
// document.getElementById('confirm-pw').addEventListener('input', validateConfirmPassword);
// confirmButton.addEventListener('click', function () {
//     if (!confirmButton.disabled) {
//         changePassword();
//     }
// });

const API_SERVER_DOMAIN = 'http://15.164.41.239:8080'; // API 서버 도메인
const accessToken = getCookie('accessToken'); // accessToken 가져오기
const confirmButton = document.getElementById('btn-confirm-pw'); // 확인 버튼

console.log('accessToken:', accessToken);
console.log('confirmButton:', confirmButton);

function setCookie(name, value, days) {
    var expires = '';
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
        expires = '; expires=' + date.toUTCString();
    }
    document.cookie = name + '=' + value + expires + '; path=/';
}

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

function deleteCookie(name) {
    document.cookie = name + '=; Expires=Thu, 01 Jan 1970 00:00:01 GMT; path=/;';
}

function validatePassword() {
    const password = document.getElementById('ch-pw').value;
    const passwordError = document.getElementById('err_pw');
    const passwordValidationIcon = document.getElementById('validation-icon-2');

    const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);

    if (password === '') {
        passwordError.innerHTML = '';
        passwordValidationIcon.style.opacity = '0';
    } else if (!isValidPassword) {
        passwordError.innerHTML = '한글 제외 최소 8자 이상 입력해주세요.';
        passwordValidationIcon.style.opacity = '0';
        document.querySelector('.new-password-div').style.border = '1px solid #fd5e53';
    } else {
        passwordError.innerHTML = '';
        document.querySelector('.new-password-div').style.border = '1px solid #c7c4c4';
        passwordValidationIcon.style.opacity = '1';
    }

    validateConfirmPassword();
    toggleSubmitButton();
}

function validateConfirmPassword() {
    const password = document.getElementById('ch-pw').value;
    const confirmPassword = document.getElementById('confirm-pw').value;
    const confirmPasswordError = document.getElementById('err_confirm');
    const confirmPasswordValidationIcon = document.getElementById('validation-icon-3');

    if (confirmPassword === '') {
        confirmPasswordError.innerHTML = '';
        confirmPasswordValidationIcon.style.opacity = '0';
    } else if (confirmPassword !== password) {
        confirmPasswordError.innerHTML = '비밀번호가 일치하지 않습니다.';
        confirmPasswordValidationIcon.style.opacity = '0';
        document.querySelector('.new-password-dc-pw').style.border = '1px solid #fd5e53';
        confirmButton.style.backgroundColor = '#c7c4c4';
    } else {
        confirmPasswordError.innerHTML = '';
        confirmPasswordValidationIcon.style.opacity = '1';
        document.querySelector('.new-password-dc-pw').style.border = '1px solid #c7c4c4';
        confirmButton.style.backgroundColor = '#fd5e53';
        confirmButton.disabled = false; // 확인 버튼 활성화
    }

    toggleSubmitButton();
}

function toggleSubmitButton() {
    const password = document.getElementById('ch-pw').value;
    const confirmPassword = document.getElementById('confirm-pw').value;

    if (
        password !== '' &&
        confirmPassword !== '' &&
        document.getElementById('err_pw').innerHTML === '' &&
        document.getElementById('err_confirm').innerHTML === ''
    ) {
        confirmButton.disabled = false;
    } else {
        confirmButton.disabled = true;
    }
}

// 비밀번호 변경 함수
function changePassword() {
    const savedEmail = sessionStorage.getItem('savedEmail'); // 저장된 이메일 가져오기
    console.log('저장된 이메일:', savedEmail);

    const newPassword = document.getElementById('ch-pw').value; // 새 비밀번호 가져오기
    console.log('새 비밀번호:', newPassword);

    const url = `${API_SERVER_DOMAIN}/api/v1/user/password`;
    const body = {
        email: savedEmail,
        password: newPassword,
    };

    const options = {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            'x-content-type-options': 'nosniff', // x-content-type-options 헤더 추가
            Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(body),
    };

    console.log('변경 요청 전송:', options);

    return fetch(url, options)
        .then((response) => {
            if (!response.ok) {
                throw new Error('네트워크 오류로 인해 비밀번호를 변경할 수 없습니다.');
            }
            return response.json();
        })
        .then((data) => {
            console.log('서버 응답:', data);
            if (data.isSuccess) {
                console.log('비밀번호 변경 성공:', data);
                alert('비밀번호가 성공적으로 변경되었습니다!');
                sessionStorage.removeItem('savedEmail');
                confirmButton.disabled = false; // 버튼 활성화
            } else {
                console.error('비밀번호 변경 실패:', data.message);
                alert(`비밀번호 변경에 실패했습니다: ${data.message}`);
            }
        })
        .catch((error) => {
            console.error('비밀번호 변경 중 오류 발생:', error);
            alert('비밀번호 변경에 실패했습니다. 잠시 후 다시 시도해주세요.');
        });
}

// 이벤트 리스너 설정
document.getElementById('ch-pw').addEventListener('input', validatePassword);
document.getElementById('confirm-pw').addEventListener('input', validateConfirmPassword);
confirmButton.addEventListener('click', function () {
    if (!confirmButton.disabled) {
        changePassword();
    }
});
