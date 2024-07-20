document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const updatePasswordForm = document.getElementById('update-password-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const uname = e.target.username.value;
            const psw = e.target.password.value;

            const response = await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uname, psw })
            });
            const result = await response.json();

            if (result.status === 'update_password') {
                loginForm.style.display = 'none';
                updatePasswordForm.style.display = 'flex';
                localStorage.setItem('username', uname);  // Store username for password update
            } else if (result.status === 'success') {
                window.location.href = '/main';
            } else {
                alert(result.message);
            }
        });
    }

    if (updatePasswordForm) {
        updatePasswordForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const uname = localStorage.getItem('username');
            const new_psw = e.target.newPassword.value;

            const response = await fetch('/update_password', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uname, new_psw })
            });
            const result = await response.json();

            if (result.status === 'success') {
                alert(result.message);
                window.location.href = '/';  // Redirect to login page
            } else {
                alert(result.message);
            }
        });
    }
});
