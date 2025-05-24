document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registroForm');
            const cpfInput = document.getElementById('cpf');
            const usernameInput = document.getElementById('username');
            const usernameLoading = document.getElementById('usernameLoading');
            const usernameError = document.getElementById('usernameError');
            const usernameSuccess = document.getElementById('usernameSuccess');
            const senhaInput = document.getElementById('senha');
            const confirmacaoSenhaInput = document.getElementById('confirmacaoSenha');
            const termosCheckbox = document.getElementById('termos');
            const submitBtn = document.getElementById('submitBtn');
            const loadingBtn = document.getElementById('loadingBtn');
            
            // Máscara para CPF
            cpfInput.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 3) {
                    value = value.replace(/^(\d{3})(\d)/g, '$1.$2');
                }
                if (value.length > 6) {
                    value = value.replace(/^(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3');
                }
                if (value.length > 9) {
                    value = value.replace(/^(\d{3})\.(\d{3})\.(\d{3})(\d)/g, '$1.$2.$3-$4');
                }
                if (value.length > 11) {
                    value = value.substring(0, 14);
                }
                
                e.target.value = value;
                
                // Validação do CPF
                const cpfError = document.getElementById('cpfError');
                if (value.length === 14) {
                    const cpfNumeros = value.replace(/\D/g, '');
                    if (cpf.validate(cpfNumeros)) {
                        cpfInput.classList.remove('invalid');
                        cpfInput.classList.add('valid');
                        cpfError.classList.add('hidden');
                    } else {
                        cpfInput.classList.remove('valid');
                        cpfInput.classList.add('invalid');
                        cpfError.classList.remove('hidden');
                    }
                } else {
                    cpfInput.classList.remove('valid', 'invalid');
                    cpfError.classList.add('hidden');
                }
            });
            
            // Verificação de nome de usuário único (simulada com debounce)
            let usernameTimeout;
            usernameInput.addEventListener('input', function() {
                clearTimeout(usernameTimeout);
                const username = this.value.trim();
                
                // Esconde mensagens anteriores
                usernameError.classList.add('hidden');
                usernameSuccess.classList.add('hidden');
                usernameInput.classList.remove('valid', 'invalid');
                
                // Validação básica do formato
                if (username.length < 4 || !/^[a-zA-Z0-9_]+$/.test(username)) {
                    return;
                }
                
                // Mostra loading
                usernameLoading.classList.remove('hidden');
                
                // Simula verificação no servidor com debounce
                usernameTimeout = setTimeout(() => {
                    // Futuramente substituit por uma chamada fetch ao backend
                    
                    // Lista de usuários já existentes (simulação)
                    const usuariosExistentes = ['admin', 'user123', 'teste'];
                    
                    // Simula tempo de resposta do servidor
                    setTimeout(() => {
                        usernameLoading.classList.add('hidden');
                        
                        if (usuariosExistentes.includes(username.toLowerCase())) {
                            usernameInput.classList.add('invalid');
                            usernameError.classList.remove('hidden');
                        } else {
                            usernameInput.classList.add('valid');
                            usernameSuccess.classList.remove('hidden');
                        }
                    }, 800);
                }, 500);
            });
            
            // Validação de senha
            confirmacaoSenhaInput.addEventListener('input', function() {
                const senhaError = document.getElementById('senhaError');
                if (senhaInput.value !== confirmacaoSenhaInput.value) {
                    confirmacaoSenhaInput.classList.add('invalid');
                    senhaError.classList.remove('hidden');
                } else {
                    confirmacaoSenhaInput.classList.remove('invalid');
                    senhaError.classList.add('hidden');
                }
            });
            
            // Envio do formulário
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Validação final
                let isValid = true;
                
                // Nome completo
                if (!document.getElementById('nome').value.trim()) {
                    document.getElementById('nomeError').classList.remove('hidden');
                    document.getElementById('nome').classList.add('invalid');
                    isValid = false;
                }
                
                // CPF
                const cpfValue = cpfInput.value.replace(/\D/g, '');
                if (!cpf.validate(cpfValue)) {
                    document.getElementById('cpfError').classList.remove('hidden');
                    cpfInput.classList.add('invalid');
                    isValid = false;
                }
                
                // Nome de usuário
                if (usernameInput.classList.contains('invalid') || !usernameInput.value.trim()) {
                    usernameError.textContent = usernameInput.value.trim() ? 'Nome de usuário já em uso' : 'Campo obrigatório';
                    usernameError.classList.remove('hidden');
                    usernameInput.classList.add('invalid');
                    isValid = false;
                }
                
                // Senha
                if (senhaInput.value.length < 8) {
                    senhaInput.classList.add('invalid');
                    document.getElementById('senhaError').textContent = 'Mínimo 8 caracteres';
                    document.getElementById('senhaError').classList.remove('hidden');
                    isValid = false;
                } else if (senhaInput.value !== confirmacaoSenhaInput.value) {
                    confirmacaoSenhaInput.classList.add('invalid');
                    document.getElementById('senhaError').textContent = 'As senhas não coincidem';
                    document.getElementById('senhaError').classList.remove('hidden');
                    isValid = false;
                }
                
                // Termos
                if (!termosCheckbox.checked) {
                    document.getElementById('termosError').classList.remove('hidden');
                    isValid = false;
                }
                
                // Se válido, simula o envio
                if (isValid) {
                    submitBtn.classList.add('hidden');
                    loadingBtn.classList.remove('hidden');
                    
                    // Simulação de cadastro no backend
                    setTimeout(() => {
                        alert('Conta criada com sucesso! Redirecionando...');
                        // Redireciona para a página de login após cadastro
                        window.location.href = 'login.html';
                    }, 1500);
                }
            });
        });