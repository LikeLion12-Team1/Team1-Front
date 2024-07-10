var testEmail = 'test@naver.com';

function onchangeEmail() {
    let inputEmail = document.querySelector('.login-id-check').value;
    console.log(inputEmail);

    if (inputEmail === '') {
        document.querySelector('.err_email').innerHTML = '';
        document.querySelector('.err-email-div').style.border = '1px solid #898989';
        document.querySelector('.submit-button').style.backgroundColor = '';
        document.querySelector('.validation-icon').style.opacity = '0';
    } else if (inputEmail != testEmail) {
        let msg = '등록된 이메일 주소가 아닙니다.';
        document.querySelector('.err_email').innerHTML = msg;
        document.querySelector('.err-email-div').style.border = '1px solid #fd5e53';
        document.querySelector('.submit-button').style.backgroundColor = '#c7c4c4';
        document.querySelector('.validation-icon').style.opacity = '0';
    } else {
        document.querySelector('.err_email').innerHTML = '';
        document.querySelector('.err-email-div').style.border = '1px solid #898989';
        document.querySelector('.submit-button').style.backgroundColor = '';
        document.querySelector('.validation-icon').style.opacity = '1';
    }
}
