document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const switchToRegister = document.getElementById('switch-to-register');
    const switchToLogin = document.getElementById('switch-to-login');
    const content = document.getElementById('content');
    const contentRegister = document.getElementById('content-register');
    const leftColumn = document.getElementById('left-column');
    const rightColumn = document.getElementById('right-column');
    const snackbar = document.getElementById('snackbar');

    function showSnackbar(message) {
        snackbar.textContent = message;
        snackbar.className = 'show';
        setTimeout(() => {
            snackbar.className = snackbar.className.replace('show', '');
        }, 3000);
    }

    function switchToRegisterForm() {
        leftColumn.classList.add('slide-left');
        rightColumn.classList.add('slide-right');
        setTimeout(() => {
            loginForm.classList.add('hidden');
            registerForm.classList.remove('hidden');
            content.classList.add('hidden');
            contentRegister.classList.remove('hidden');
        }, 200);
    }

    function switchToLoginForm() {
        leftColumn.classList.remove('slide-left');
        rightColumn.classList.remove('slide-right');
        setTimeout(() => {
            loginForm.classList.remove('hidden');
            registerForm.classList.add('hidden');
            content.classList.remove('hidden');
            contentRegister.classList.add('hidden');
        }, 200);
    }

    if (switchToRegister) {
        switchToRegister.addEventListener('click', switchToRegisterForm);
    }
    if (switchToLogin) {
        switchToLogin.addEventListener('click', switchToLoginForm);
    }

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
    
            const formData = new FormData(registerForm);
            fetch('database/register.php', {
                method: 'POST',
                body: formData
            }).then(response => response.json())
              .then(data => {
                // console.log('Registration response:', data);
                showSnackbar(data.message);
                if (data.success) {
                    registerForm.reset();
                }
              })
              .catch(error => {
                console.error('Error:', error);
                showSnackbar('Something went wrong.');
              });
        });
    }
    
});
