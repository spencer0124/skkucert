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
            "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 16_3_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
            "Accept-Language": "ko",
            "Accept-Encoding": "gzip, deflate, br",
        },
        body: JSON.stringify(payload)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('response').innerHTML = 
        `Name in Dept: ${data.dept.name}<br>
        MemberNo: ${data.memberNo}<br>
        Name in Branch Group: ${data.branchGroup.name}<br>
        Name in Patron Type: ${data.patronType.name}`;
    })
    .catch(error => console.error('Error:', error));
});
