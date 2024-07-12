var API_SERVER_DOMAIN = 'http://15.164.41.239:8080';

const passwordValidationIcon4 = document.querySelector('#validation-icon-4');
const accessToken = getCookie('accessToken');

// const path = require('path');

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

// 이메일 유효성 검사
function validateEmail() {
    const email = document.querySelector('#create-email-box').value;
    const emailError = document.querySelector('#err-create-id');
    const validationIcon = document.querySelector('#validation-icon-4');
    const checkButton = document.querySelector('.double-check-email');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(email);

    if (!isValidEmail) {
        emailError.textContent = '올바른 이메일 형식을 입력해주세요.';
        document.querySelector('#create-email-box').style.border = '1px solid #fd5e53';
        validationIcon.style.opacity = '0';
    } else {
        emailError.textContent = '';
        document.querySelector('#create-email-box').style.border = '1px solid #c7c4c4';
        checkButton.style.border = '1px solid #fd5e53';
        checkButton.style.color = '#fd5e53';
        validationIcon.style.opacity = '0';
    }

    toggleSubmitButton();
}

// 이메일 중복 확인
function checkEmail() {
    const email = document.querySelector('#create-email-box').value;
    const emailError = document.querySelector('#err-create-id');
    const checkButton = document.querySelector('.double-check-email');
    const validationIcon = document.querySelector('#validation-icon-4');

    if (email === '') {
        emailError.innerHTML = '이메일을 입력해주세요.';
        checkButton.style.border = '1px solid #c7c4c4';
        checkButton.style.color = '#c7c4c4';
        validationIcon.style.opacity = '0';
        return;
    }

    fetch(API_SERVER_DOMAIN + `/api/v1/user/check-email/${email}`, {
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
            console.log(data); // 서버 응답 확인
            if (data.isSuccess && data.result === '해당 이메일을 사용할 수 있습니다.') {
                // 이메일이 중복되지 않은 경우
                console.log('중복된 아이디 없음');
                emailError.innerHTML = '';
                checkButton.style.border = '1px solid #fd5e53';
                checkButton.style.color = '#fd5e53';
                validationIcon.style.opacity = '1';
            } else {
                // 이메일이 중복된 경우
                console.log('중복아이디 있음');
                emailError.innerHTML = '이미 사용 중인 이메일입니다.';
                checkButton.style.border = '1px solid #c7c4c4';
                checkButton.style.color = '#c7c4c4';
                validationIcon.style.opacity = '0';
            }
        })
        .catch((error) => {
            console.log('불러오기 실패', error); // 에러 메시지 출력
            emailError.innerHTML = '이메일 확인 중 오류가 발생했습니다.';
            checkButton.style.border = '1px solid #c7c4c4';
            checkButton.style.color = '#c7c4c4';
            validationIcon.style.opacity = '0';
        });

    toggleSubmitButton();
}

// 비밀번호 유효성 검사
function validatePassword() {
    const password = document.querySelector('#create-password-box').value;
    const passwordError = document.querySelector('#err-create-pw');
    const validationIcon = document.querySelector('#validation-icon-5');

    const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);

    if (!isValidPassword) {
        passwordError.textContent = '비밀번호는 8자 이상이어야 하며 한글을 포함할 수 없습니다.';
        document.querySelector('#create-password-box').style.border = '1px solid #fd5e53';
        validationIcon.style.opacity = '0';
    } else {
        passwordError.textContent = '';
        document.querySelector('#create-password-box').style.border = '1px solid #c7c4c4';
        validationIcon.style.opacity = '1';
    }

    toggleSubmitButton();
}

// 비밀번호 재확인 유효성 검사
function validateConfirmPassword() {
    const confirmPassword = document.querySelector('#double-check-pw-box').value;
    const password = document.querySelector('#create-password-box').value;
    const confirmPasswordError = document.querySelector('#err-dc-pw');
    const validationIcon = document.querySelector('#validation-icon-6');

    if (confirmPassword !== password) {
        confirmPasswordError.textContent = '비밀번호가 일치하지 않습니다.';
        document.querySelector('#double-check-pw-box').style.border = '1px solid #fd5e53';
        validationIcon.style.opacity = '0';
    } else {
        confirmPasswordError.textContent = '';
        document.querySelector('#double-check-pw-box').style.border = '1px solid #c7c4c4';
        validationIcon.style.opacity = '1';
    }

    toggleSubmitButton();
}

// 가입 버튼 활성화/비활성화 토글
function toggleSubmitButton() {
    const joinButton = document.querySelector('.join-check-btn');
    const createEmailBox = document.querySelector('#create-email-box');
    const createPasswordBox = document.querySelector('#create-password-box');
    const doubleCheckPwBox = document.querySelector('#double-check-pw-box');
    const activeAreaBtn = document.querySelector('#active-area-btn');

    const isValidEmail = validateEmailFormat(createEmailBox.value);
    const isValidPassword = validatePasswordFormat(createPasswordBox.value);
    const isValidConfirmPassword = validateConfirmPasswordFormat(doubleCheckPwBox.value);
    const isValidAreaSelected = validateAreaSelected(activeAreaBtn);

    if (isValidEmail && isValidPassword && isValidConfirmPassword && isValidAreaSelected) {
        joinButton.disabled = false;
        joinButton.style.backgroundColor = '#fd5e53';
    } else {
        joinButton.disabled = true;
    }
}

// 이메일 형식 유효성 검사
function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// 비밀번호 형식 유효성 검사
function validatePasswordFormat(password) {
    const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);
    return isValidPassword;
}

// 비밀번호 재확인 형식 유효성 검사
function validateConfirmPasswordFormat(confirmPassword) {
    const password = document.querySelector('#create-password-box').value;
    return confirmPassword === password;
}

// 활동 지역 선택 유효성 검사
function validateAreaSelected(activeAreaBtn) {
    const selectedButton = activeAreaBtn.querySelector('.clicked');
    return selectedButton !== null && selectedButton !== undefined;
}

// 활동 지역 버튼 클릭 이벤트 처리
document.querySelectorAll('.active-area-btn button').forEach(function (button) {
    button.addEventListener('click', function () {
        let parent = this.parentNode.parentNode;

        parent.querySelectorAll('button').forEach(function (btn) {
            btn.classList.remove('clicked');
        });
        this.classList.add('clicked');
        toggleSubmitButton(); // 버튼 클릭 후 가입 버튼 활성화/비활성화 체크
    });
});

function submitCreateForm(event) {
    console.log('Dd');
    event.preventDefault(); // 기본 제출 동작을 막습니다.

    // 사용자가 입력한 이메일과 비밀번호, 지역을 가져옵니다.
    var email = document.querySelector('.create-email-box').value;
    var password = document.querySelector('.create-password-box').value;
    var region = document.querySelector('.area.clicked').value;

    console.log(email);
    console.log(password);
    console.log(region);

    // 서버에 회원가입 요청을 보냅니다.
    fetch(API_SERVER_DOMAIN + '/api/v1/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
            region: region,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('회원가입 실패');
            }
            return response.json();
        })
        .then((data) => {
            // 회원가입이 성공하면 다음 동작을 수행합니다.
            window.location.replace('/html/login.html');
        })
        .catch((error) => {
            alert('회원가입에 실패하였습니다.', error);
            // 로그인 실패 시 사용자에게 메시지를 표시하는 등의 동작을 수행할 수 있습니다.
        });
}
