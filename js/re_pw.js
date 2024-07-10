const confirmButton = document.querySelector('.btn-confirm-pw');

function validatePassword() {
    const password = document.querySelector('#ch-pw').value;
    const passwordError = document.querySelector('#err_pw');
    const passwordValidationIcon = document.querySelector('#validation-icon-2');
    const confirmPassword = document.querySelector('#confirm-pw').value;

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
    const password = document.querySelector('#ch-pw').value;
    const confirmPassword = document.querySelector('#confirm-pw').value;
    const confirmPasswordError = document.querySelector('#err_confirm');
    const confirmPasswordValidationIcon = document.querySelector('#validation-icon-3');

    if (confirmPassword === '') {
        confirmPasswordError.innerHTML = '';
        confirmPasswordValidationIcon.style.opacity = '0';
    } else if (confirmPassword !== password) {
        confirmPasswordError.innerHTML = '비밀번호가 일치하지 않습니다.';
        confirmPasswordValidationIcon.style.opacity = '0';
        document.querySelector('.new-password-dc-pw').style.border = '1px solid #fd5e53';
    } else {
        confirmPasswordError.innerHTML = '';
        confirmPasswordValidationIcon.style.opacity = '1';
        document.querySelector('.new-password-dc-pw').style.border = '1px solid #c7c4c4';
        document.querySelector('.btn-confirm-pw').style.backgroundColor = '#fd5e53';
        confirmButton.disabled = false;
    }

    toggleSubmitButton();
}

document.querySelector('#ch-pw').addEventListener('input', validatePassword);
document.querySelector('#confirm-pw').addEventListener('input', validateConfirmPassword);
