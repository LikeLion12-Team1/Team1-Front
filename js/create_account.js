var API_SERVER_DOMAIN = 'http://15.164.41.239:8080';

const passwordValidationIcon4 = document.querySelector('#validation-icon-4');

function validateEmail() {
    const email = document.querySelector('#create-email-box').value;
    const emailError = document.querySelector('#err-create-id');
    const checkButton = document.querySelector('.double-check-email');

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === '') {
        emailError.innerHTML = '';
        checkButton.style.border = '1px solid #c7c4c4';
        checkButton.style.color = '#c7c4c4';
        document.querySelector('.create-email-box').style.border = '1px solid #c7c4c4';
        passwordValidationIcon4.style.opacity = '0';
    } else if (!emailRegex.test(email)) {
        emailError.innerHTML = '유효한 이메일 주소를 입력해주세요.';
        checkButton.style.border = '1px solid #c7c4c4';
        checkButton.style.color = '#c7c4c4';
        document.querySelector('.create-email-box').style.border = '1px solid #fd5e53';
        passwordValidationIcon4.style.opacity = '0';
    } else {
        emailError.innerHTML = '';
        checkButton.style.border = '1px solid #fd5e53';
        checkButton.style.color = '#fd5e53';
        document.querySelector('.create-email-box').style.border = '1px solid #c7c4c4';
        passwordValidationIcon4.style.opacity = '0';
    }

    toggleSubmitButton();
}

function checkEmail() {
    const email = document.querySelector('#create-email-box').value;
    const emailError = document.querySelector('#err-create-id');
    const checkButton = document.querySelector('.double-check-email');

    if (email === '') {
        emailError.innerHTML = '이메일을 입력해주세요.';
        checkButton.style.border = '1px solid #c7c4c4';
        checkButton.style.color = '#c7c4c4';
        passwordValidationIcon4.style.opacity = '0';
        return;
    }

    // 서버에서 이메일 중복 여부 확인 (여기서는 예시로 setTimeout 사용)
    setTimeout(() => {
        const isDuplicate = false; // 서버 응답에 따라 true 또는 false 설정

        if (isDuplicate) {
            emailError.innerHTML = '이미 사용 중인 이메일입니다.';
            checkButton.style.border = '1px solid #c7c4c4';
            checkButton.style.color = '#c7c4c4';
            passwordValidationIcon4.style.opacity = '0';
        } else {
            emailError.innerHTML = '';
            checkButton.style.border = '1px solid #c7c4c4';
            checkButton.style.color = '#c7c4c4';
            passwordValidationIcon4.style.opacity = '1';
        }
        toggleSubmitButton();
    }, 500);
}

function validatePassword() {
    const password = document.querySelector('#create-password-box').value;
    const passwordError = document.querySelector('#err-create-pw');
    const passwordValidationIcon = document.querySelector('#validation-icon-5');

    const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);

    if (password === '') {
        passwordError.innerHTML = '';
        passwordValidationIcon.style.opacity = '0';
        document.querySelector('.create-password-box').style.border = '1px solid #c7c4c4';
    } else if (!isValidPassword) {
        passwordError.innerHTML = '한글 제외 최소 8자 이상 입력해주세요.';
        passwordValidationIcon.style.opacity = '0';
        document.querySelector('.create-password-box').style.border = '1px solid #fd5e53';
    } else {
        passwordError.innerHTML = '';
        passwordValidationIcon.style.opacity = '1';
        document.querySelector('.create-password-box').style.border = '1px solid #c7c4c4';
    }

    validateConfirmPassword();
    toggleSubmitButton();
}

function validateConfirmPassword() {
    const password = document.querySelector('#create-password-box').value;
    const confirmPassword = document.querySelector('#double-check-pw-box').value;
    const confirmPasswordError = document.querySelector('#err-dc-pw');
    const confirmPasswordValidationIcon = document.querySelector('#validation-icon-6');

    if (confirmPassword === '') {
        confirmPasswordError.innerHTML = '';
        confirmPasswordValidationIcon.style.opacity = '0';
        document.querySelector('.double-check-pw-box').style.border = '1px solid #c7c4c4';
    } else if (confirmPassword !== password) {
        confirmPasswordError.innerHTML = '비밀번호가 일치하지 않습니다.';
        confirmPasswordValidationIcon.style.opacity = '0';
        document.querySelector('.double-check-pw-box').style.border = '1px solid #fd5e53';
    } else {
        confirmPasswordError.innerHTML = '';
        confirmPasswordValidationIcon.style.opacity = '1';
        document.querySelector('.double-check-pw-box').style.border = '1px solid #c7c4c4';
    }

    toggleSubmitButton();
}

document.querySelectorAll('.active-area-btn button').forEach(function (button) {
    button.addEventListener('click', function () {
        let parent = this.parentNode.parentNode;

        parent.querySelectorAll('button').forEach(function (btn) {
            btn.classList.remove('clicked');
        });
        this.classList.add('clicked');
    });
});

function toggleSubmitButton() {
    const joinButton = document.querySelector('.join-check-btn');
    const createEmailBox = document.querySelector('#create-email-box');
    const createPasswordBox = document.querySelector('#create-password-box');
    const doubleCheckPwBox = document.querySelector('#double-check-pw-box');

    const isValidEmail = validateEmailFormat(createEmailBox.value);
    const isValidPassword = validatePasswordFormat(createPasswordBox.value);
    const isValidConfirmPassword = validateConfirmPasswordFormat(doubleCheckPwBox.value);

    if (isValidEmail && isValidPassword && isValidConfirmPassword) {
        joinButton.disabled = false;
        joinButton.style.backgroundColor = '#fd5e53';
    } else {
        joinButton.disabled = true;
    }
}

function validateEmailFormat(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function validatePasswordFormat(password) {
    const isValidPassword = password.length >= 8 && !/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/.test(password);
    return isValidPassword;
}

function validateConfirmPasswordFormat(confirmPassword) {
    const password = document.querySelector('#create-password-box').value;
    return confirmPassword === password;
}

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
