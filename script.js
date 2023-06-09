document.addEventListener('DOMContentLoaded', function() {
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

        

        fetch('https://lib.skku.edu/pyxis-api/api/login', {
            method: 'POST',
            headers: {
                "Host": "lib.skku.edu",
                "Content-Type": "application/json;charset=utf-8",
                "Origin": "file://",
                "Connection": "keep-alive",
                "Accept": "application/json, text/plain, */*",
                "Accept-Language": "ko",
                "Accept-Encoding": "gzip, deflate, br",
            },
            body: JSON.stringify(payload)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('네트워크가 불안정합니다');
            }
            return response.json();
        })
        .then(data => {
            

            if (data.data && data.data.name && data.data.dept && data.data.branchGroup && data.data.memberNo && data.data.patronState) {
                document.getElementById('response').innerHTML = 
                `[이름]: ${data.data.name}<br>
                [학부]: ${data.data.dept.name}<br>
                [소속]: ${data.data.parentDept.name}<br>
                [유형]: ${data.data.patronType.name}<br>
                [캠퍼스]: ${data.data.branchGroup.name}<br>
                [학번]: ${data.data.memberNo}<br>
                [재학 여부]: ${data.data.patronState.name}<br>
                <img src="https://idcard.skku.edu/idt/photo.do?userId=${data.data.memberNo}" alt="User Photo"/>`;
            } else {
                document.getElementById('response').innerHTML = '<strong>로그인에 실패하였습니다</strong>';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            // Hide loading message
           
            document.getElementById('response').innerHTML = '<strong>예기치 못한 오류가 발생했습니다</strong>';
        });
    });
});
