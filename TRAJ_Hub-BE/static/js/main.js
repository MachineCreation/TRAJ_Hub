document.addEventListener('DOMContentLoaded', function () {
    const loginForm = document.getElementById('login-form');
    const updatePasswordForm = document.getElementById('update-password-form');
    const userDataForm = document.getElementById('user-data-form');

    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const uname = e.target.uname.value;
            const psw = e.target.psw.value;

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
                updatePasswordForm.style.display = 'block';
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
            const new_psw = e.target.new_psw.value;

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

    if (userDataForm) {
        userDataForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const uname = localStorage.getItem('username');  // You should manage user sessions more securely
            const email = e.target.email.value;
            const name = e.target.name.value;

            const response = await fetch('/update_data', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ uname, data: { email, name } })
            });
            const result = await response.json();

            if (result.status === 'success') {
                alert('Info updated successfully');
            } else {
                alert(result.message);
            }
        });
    }
});
