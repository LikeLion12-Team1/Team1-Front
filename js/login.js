var testEmail = 'test@naver.com';
var testPassword = '12345678';
const loginButton = document.querySelector('.preview-main_login');

function loginEmailId() {
    let inputEmail = document.querySelector('.login-id').value;
    console.log(inputEmail);

    if (inputEmail === '') {
        document.querySelector('.err-msg-login').innerHTML = '';
        document.querySelector('.err-msg-id-div').style.border = '1px solid #898989';
    } else if (inputEmail != testEmail) {
        let msg = '가입되지 않은 이메일입니다.';
        document.querySelector('.err-msg-login').innerHTML = msg;
        document.querySelector('.err-msg-id-div').style.border = '1px solid #fd5e53';
    } else {
        document.querySelector('.err-msg-id-div').style.border = '1px solid #898989';
        document.querySelector('.login-pw').disabled = false;
        loginEmailPw();
    }
}

function loginEmailPw() {
    let inputPassword = document.querySelector('.login-pw').value;
    console.log(inputPassword);

    if (inputPassword === '') {
        y;
        document.querySelector('.err-msg-login').innerHTML = '';
        document.querySelector('.err-msg-pw-div').style.border = '1px solid #898989';
    } else if (inputPassword != testPassword) {
        let msg = '비밀번호가 올바르지 않습니다.';
        document.querySelector('.err-msg-login').innerHTML = msg;
        document.querySelector('.err-msg-pw-div').style.border = '1px solid #fd5e53';
    } else {
        let msg = '';
        document.querySelector('.err-msg-pw-div').style.border = '1px solid #898989';
        loginButton.disabled = false;
    }
}
