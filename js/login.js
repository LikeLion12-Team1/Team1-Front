var API_SERVER_DOMAIN = 'http://15.164.41.239:8080';
const loginButton = document.querySelector('.preview-main_login');

function loginEmailId() {
    let inputEmail = document.querySelector('.login-id').value;
    // console.log(inputEmail);

    if (inputEmail === '') {
        document.querySelector('.err-msg-login').innerHTML = '';
        document.querySelector('.err-msg-id-div').style.border = '1px solid #c7c4c4';
    }
    // else if (inputEmail != testEmail) {
    //     let msg = '가입되지 않은 이메일입니다.';
    //     document.querySelector('.err-msg-login').innerHTML = msg;
    //     document.querySelector('.err-msg-id-div').style.border = '1px solid #fd5e53';
    // }

    // else {
    //     document.querySelector('.err-msg-id-div').style.border = '1px solid #c7c4c4';
    //     document.querySelector('.login-pw').disabled = false;
    //     loginEmailPw();
    // }
}

function loginEmailPw() {
    let inputPassword = document.querySelector('.login-pw').value;
    // console.log(inputPassword);

    if (inputPassword === '') {
        document.querySelector('.err-msg-login').innerHTML = '';
        document.querySelector('.err-msg-pw-div').style.border = '1px solid #c7c4c4';
    }
    // else if (inputPassword != testPassword) {
    //     let msg = '비밀번호가 올바르지 않습니다.';
    //     document.querySelector('.err-msg-login').innerHTML = msg;
    //     document.querySelector('.err-msg-pw-div').style.border = '1px solid #fd5e53';
    // }

    // else {
    //     let msg = '';
    //     document.querySelector('.err-msg-pw-div').style.border = '1px solid #c7c4c4';
    //     loginButton.disabled = false;
    // }
}

function failLogin() {
    let msg = '아이디나 비밀번호를 확인해주세요.';
    document.querySelector('.err-msg-login').innerHTML = msg;
    document.querySelector('.err-msg-id-div').style.border = '1px solid #fd5e53';
    document.querySelector('.err-msg-pw-div').style.border = '1px solid #fd5e53';
}

function submitLoginForm(event) {
    console.log('Dd');
    event.preventDefault(); // 기본 제출 동작을 막습니다.

    // 사용자가 입력한 이메일과 비밀번호를 가져옵니다.
    var email = document.querySelector('.login-id').value;
    var password = document.querySelector('.login-pw').value;

    console.log(email);
    console.log(password);

    // 서버에 로그인 요청을 보냅니다.
    fetch(API_SERVER_DOMAIN + '/api/v1/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            email: email,
            password: password,
        }),
    })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Login failed');
            }
            return response.json();
        })
        .then((data) => {
            var accessToken = data.result.access_token;
            var refreshToken = data.result.refresh_token;
            // 토큰을 쿠키에 저장합니다.
            setCookie('accessToken', accessToken, 1);
            setCookie('refreshToken', refreshToken, 1);
            // 로그인이 성공하면 다음 동작을 수행합니다.
            window.location.replace('/html/home.html');
        })
        .catch((error) => {
            alert('아이디나 비밀번호를 다시 확인해주세요', error);
            failLogin();
            // 로그인 실패 시 사용자에게 메시지를 표시하는 등의 동작을 수행할 수 있습니다.
        });
}

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
