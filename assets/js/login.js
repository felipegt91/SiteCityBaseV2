document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('loginForm');
    const emailField = document.getElementById('email');
    const senhaField = document.getElementById('senha');
    const errorMessage = document.getElementById('errorMessage');
    const submitBtn = document.getElementById('submitBtn');
    const loadingBtn = document.getElementById('loadingBtn');


    if (emailField) {
        emailField.addEventListener('input', function() {
            const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.value);
            this.classList.toggle('invalid', !isValid && this.value.length > 0);
            document.getElementById('emailError').classList.toggle('hidden', isValid || this.value.length === 0);
        });
    }

    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();

            errorMessage.classList.add('hidden');
            document.getElementById('emailError').classList.add('hidden');
            document.getElementById('senhaError').classList.add('hidden');

            let isValid = true;
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value)) {
                emailField.classList.add('invalid');
                document.getElementById('emailError').classList.remove('hidden');
                isValid = false;
            }
            if (!senhaField.value.trim()) {
                senhaField.classList.add('invalid');
                document.getElementById('senhaError').classList.remove('hidden');
                isValid = false;
            }

            if (isValid) {
                if(submitBtn) submitBtn.classList.add('hidden');
                if(loadingBtn) loadingBtn.classList.remove('hidden');

                setTimeout(() => {
                    if (emailField.value === 'admin@example.com' && senhaField.value === 'admin123') { // Simulação de dados de admin do citybase.sql
                        localStorage.setItem('citybase_user', JSON.stringify({
                            name: "Administrador", // Nome do admin do citybase.sql
                            email: emailField.value
                        }));
                        const redirectTo = new URLSearchParams(window.location.search).get('redirect') || 'index.html';
                        window.location.href = redirectTo;
                    } else {
                        errorMessage.textContent = 'E-mail ou senha incorretos';
                        errorMessage.classList.remove('hidden');
                        if(loadingBtn) loadingBtn.classList.add('hidden');
                        if(submitBtn) submitBtn.classList.remove('hidden');
                    }
                }, 1000);
            }
        });
    }

    if (localStorage.getItem('citybase_user')) {
        window.location.href = 'index.html';
    }
});