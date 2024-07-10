let testCertificationCode = '123456';
let certificationCodeTimeout;

function startCertificationCodeTimeout() {
    certificationCodeTimeout = setTimeout(() => {
        testCertificationCode = ''; // Invalidate the certification code after 5 minutes
        alert('인증코드의 유효시간이 만료되었습니다. 인증코드를 다시 요청해주세요.');
        document.querySelector('.validation-icon-1').style.opacity = '0';
        document.querySelector('.submit-button-re-pw').disabled = true;
    }, 300000); // 300,000 milliseconds = 5 minutes
}

function onchangeCertificationCode() {
    let inputCertificationCode = document.querySelector('#certification-code').value;
    console.log(inputCertificationCode);

    if (inputCertificationCode === '') {
        document.querySelector('#err_certification').innerHTML = '';
        document.querySelector('.err-doublecheck').style.border = '1px solid #898989';
        document.querySelector('.validation-icon-1').style.opacity = '0';
        document.querySelector('#submit-button-re-pw').disabled = true;
    } else if (inputCertificationCode !== testCertificationCode) {
        let msg = '올바른 인증코드가 아닙니다.';
        document.querySelector('#err_certification').innerHTML = msg;
        document.querySelector('.err-doublecheck').style.border = '1px solid #fd5e53';
        document.querySelector('.validation-icon-1').style.opacity = '0';
        document.querySelector('#submit-button-re-pw').disabled = true;
    } else {
        document.querySelector('#err_certification').innerHTML = '';
        document.querySelector('.err-doublecheck').style.border = '1px solid #898989';
        document.querySelector('.validation-icon-1').style.opacity = '1';
        document.querySelector('#submit-button-re-pw').disabled = false;
    }
}

function resendCertificationCode() {
    // Generate a new certification code (this is just a placeholder for real implementation)
    testCertificationCode = '654321'; // New example certification code
    console.log('새 인증코드가 전송되었습니다:', testCertificationCode);
    alert('새 인증코드가 전송되었습니다. 이메일을 확인해주세요.');

    // Restart the certification code timeout
    clearTimeout(certificationCodeTimeout);
    startCertificationCodeTimeout();
}

document.querySelector('#resend-code-button').addEventListener('click', resendCertificationCode);
document.querySelector('#certification-code').addEventListener('input', onchangeCertificationCode);

// Start the initial certification code timeout
startCertificationCodeTimeout();
