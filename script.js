document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('language-select').addEventListener('change', function(e) {
        var language = e.target.value;
        if (language === 'en') {
            document.getElementById('user-id').placeholder = 'Enter your ID';
            document.getElementById('user-pw').placeholder = 'Enter your Password';
            document.getElementById('submit-button').innerText = 'Submit';
        } else {
            document.getElementById('user-id').placeholder = '킹고ID를 입력하세요';
            document.getElementById('user-pw').placeholder = '킹고 비밀번호를 입력하세요';
            document.getElementById('submit-button').innerText = '로그인';
        }
    });

    document.getElementById('login-form').addEventListener('submit', function(e) {
        e.preventDefault();

        var userId = document.getElementById('user-id').value;
        var userPw = document.getElementById('user-pw').value;

        var payload = {
            "isMobile": true,
            "loginId": userId,
            "password": userPw,
            "rememberMe": true
        };

        // Show loading message
        document.getElementById('loading').style.display = 'block';

        fetch('https://lib.skku.edu/pyxis-api/api/login', {
            method: 'POST',
            headers: {
                "Host": "lib.skku.edu",
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "file://",
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
                "Accept-Language": "ko",
                "Accept-Encoding": "gzip, deflate, br",
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Hide loading message
            document.getElementById('loading').style.display = 'none';

            if (data.data && data.data.name && data.data.dept && data.data.branchGroup && data.data.memberNo && data.data.patronState) {
                document.getElementById('response').innerHTML = 
                `Name: ${data.data.name}<br>
                Dept: ${data.data.dept.name}<br>
                parentDept: ${data.data.parentDept.name}<br>
                patronType: ${data.data.patronType.name}<br>
                Branch Group Name: ${data.data.branchGroup.name}<br>
                MemberNo: ${data.data.memberNo}<br>
                Patron State: ${data.data.patronState.name}<br>
                <strong>Status: Login Success</strong><br>
                <img src="https://idcard.skku.edu/idt/photo.do?userId=${data.data.memberNo}" alt="User Photo"/>`;
            } else {
                document.getElementById('response').innerHTML = '<strong>Status: Data fields missing in response</strong>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Hide loading message
            document.getElementById('loading').style.display = 'none';
            document.getElementById('response').innerHTML = '<strong>Status: Login Failed</strong>';
        });
    });
});
