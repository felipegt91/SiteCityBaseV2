document.addEventListener('DOMContentLoaded', function() {
    const user = JSON.parse(localStorage.getItem('citybase_user')) || { name: "Usuário Teste", email: "teste@dev.com" };
    const userNameDesktop = document.getElementById('userName');
    if(userNameDesktop) userNameDesktop.textContent = user.name || 'Usuário';

    const logoutBtn = document.getElementById('logoutBtn');
    if(logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('citybase_user');
            window.location.href = 'login.html';
        });
    }

    const form = document.getElementById('registroForm');
    const fileInput = document.getElementById('fotos');
    const getLocationBtn = document.getElementById('getLocationBtn');
    const manualLocationBtn = document.getElementById('manualLocationBtn');
    const manualLocationField = document.getElementById('manualLocationField');
    const manualLocationInput = document.getElementById('localizacaoManual');
    const locationInput = document.getElementById('localizacao');
    const locationStatus = document.getElementById('locationStatus');
    const preview = document.getElementById('preview');
    const fileNameSpan = document.getElementById('fileName'); // ID do span que mostra o nome do arquivo
    const submitBtn = document.getElementById('submitBtn');
    const loadingBtn = document.getElementById('loadingBtn');


    if(manualLocationBtn && getLocationBtn && manualLocationField && locationInput && manualLocationInput && locationStatus) {
        manualLocationBtn.addEventListener('click', () => {
            getLocationBtn.classList.remove('bg-primary', 'text-white');
            getLocationBtn.classList.add('border', 'border-gray-300', 'bg-gray-50');
            manualLocationBtn.classList.remove('border', 'border-gray-300', 'bg-gray-50');
            manualLocationBtn.classList.add('bg-primary', 'text-white');
            manualLocationField.classList.remove('hidden');
            locationInput.classList.add('hidden');
            locationInput.removeAttribute('required');
            manualLocationInput.setAttribute('required', '');
            locationStatus.textContent = "Digite o endereço manualmente";
        });

        getLocationBtn.addEventListener('click', () => {
            manualLocationBtn.classList.remove('bg-primary', 'text-white');
            manualLocationBtn.classList.add('border', 'border-gray-300', 'bg-gray-50');
            getLocationBtn.classList.remove('border', 'border-gray-300', 'bg-gray-50');
            getLocationBtn.classList.add('bg-primary', 'text-white');
            manualLocationField.classList.add('hidden');
            manualLocationInput.removeAttribute('required');
            locationInput.setAttribute('required', '');
            getLocationBtn.disabled = true;
            getLocationBtn.textContent = 'Obtendo...';
            locationStatus.textContent = 'Obtendo localização...';

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        if (!validateCoordinates(latitude, longitude)) {
                            locationStatus.textContent = 'Localização inválida obtida';
                            getLocationBtn.textContent = 'Tentar novamente';
                            getLocationBtn.disabled = false;
                            return;
                        }
                        getAddressFromCoords(latitude, longitude)
                            .then(address => {
                                locationInput.value = address;
                                locationInput.classList.remove('hidden');
                                locationStatus.textContent = `Localização obtida: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;
                                const locError = document.getElementById('localizacaoError');
                                if(locError) locError.classList.add('hidden');
                            });
                        getLocationBtn.textContent = 'Localização obtida';
                    },
                    (error) => {
                        locationStatus.textContent = 'Erro ao obter localização: ' + (error.message || 'Permissão negada');
                        getLocationBtn.textContent = 'Tentar novamente';
                        getLocationBtn.disabled = false;
                    }
                );
            } else {
                locationStatus.textContent = 'Geolocalização não suportada';
                getLocationBtn.disabled = true;
            }
        });
    }

    // Validação de coordenadas
    function validateCoordinates(lat, lng) {
        return (lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180);
    }

    // Obtenção do endereço a partir das coordenadas
    function getAddressFromCoords(lat, lng) {
        return new Promise(resolve => {
            setTimeout(() => {
                resolve(`Próximo a ${lat.toFixed(4)}, ${lng.toFixed(4)}`);
            }, 1000);
        });
    }

    if(fileInput && fileNameSpan && preview) {
        fileInput.addEventListener('change', function(e) {
            const files = Array.from(e.target.files).slice(0, 4);
            preview.innerHTML = '';

            if (files.length > 0) {
                fileNameSpan.textContent = `${files.length} foto(s) selecionada(s)`;
                preview.classList.remove('hidden');
                files.forEach((file, index) => {
                    if (!file.type.startsWith('image/')) return;
                    const reader = new FileReader();
                    reader.onload = function(event) {
                        // Lógica de criação do preview da imagem
                        const container = document.createElement('div');
                        container.className = 'relative';

                        const img = document.createElement('img');
                        img.src = event.target.result;
                        img.className = 'h-20 w-full object-cover rounded border';
                        img.alt = `Foto ${index + 1} do problema`;

                        const badge = document.createElement('div');
                        badge.className = 'absolute top-1 right-1 bg-black bg-opacity-50 text-white text-xs rounded-full px-2 py-1';
                        badge.textContent = `<span class="math-inline">\{index \+ 1\}/</span>{files.length}`;

                        container.appendChild(img);
                        container.appendChild(badge);
                        preview.appendChild(container);
                    };
                    reader.readAsDataURL(file);
                });
            } else {
                fileNameSpan.textContent = 'Nenhuma foto selecionada';
                preview.classList.add('hidden');
            }
        });
    }

    if (form && submitBtn && loadingBtn && getLocationBtn && locationInput && manualLocationInput && fileInput && preview && fileNameSpan && locationStatus && manualLocationField) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            let isValid = true;
            const requiredFields = ['tipo', 'descricao']; // IDs dos campos
            // Lógica de validação
            requiredFields.forEach(fieldId => {
                const field = document.getElementById(fieldId);
                const errorElement = document.getElementById(`${fieldId}Error`);
                if (field && !field.value.trim()) {
                    field.classList.add('invalid');
                    if(errorElement) errorElement.classList.remove('hidden');
                    isValid = false;
                } else if (field) {
                     field.classList.remove('invalid');
                     if(errorElement) errorElement.classList.add('hidden');
                }
            });

            const locationError = document.getElementById('localizacaoError');
            if (getLocationBtn.classList.contains('bg-primary')) { // Valida se o modo "Usar Minha Localização" está ativo
                if (!locationInput.value) {
                    if(locationError) locationError.classList.remove('hidden');
                    isValid = false;
                } else {
                     if(locationError) locationError.classList.add('hidden');
                }
            } else { // Valida se o modo "Inserir Manualmente" está ativo
                if (!manualLocationInput.value) {
                    if(locationError) locationError.classList.remove('hidden');
                    isValid = false;
                } else {
                    if(locationError) locationError.classList.add('hidden');
                }
            }

            const fotosError = document.getElementById('fotosError');
            if (fileInput.files.length === 0) {
                if(fotosError) fotosError.classList.remove('hidden');
                isValid = false;
            } else {
                if(fotosError) fotosError.classList.add('hidden');
            }


            if (isValid) {
                submitBtn.classList.add('hidden');
                loadingBtn.classList.remove('hidden');
                setTimeout(() => {
                    alert('Registro enviado com sucesso!');
                    form.reset();
                    preview.classList.add('hidden');
                    fileNameSpan.textContent = 'Nenhuma foto selecionada';
                    loadingBtn.classList.add('hidden');
                    submitBtn.classList.remove('hidden');
                    locationStatus.textContent = 'Selecione uma opção acima';
                    getLocationBtn.textContent = 'Usar Minha Localização';
                    getLocationBtn.disabled = false;
                    manualLocationField.classList.add('hidden');
                    locationInput.classList.add('hidden');
                    // Resetar botões de seleção de localização para o estado inicial
                    manualLocationBtn.classList.remove('bg-primary', 'text-white');
                    manualLocationBtn.classList.add('border', 'border-gray-300', 'bg-gray-50');
                    getLocationBtn.classList.remove('border', 'border-gray-300', 'bg-gray-50');
                    getLocationBtn.classList.add('bg-primary', 'text-white');


                }, 1500);
            }
        });
    }
    // Inicializar menu mobile específico desta página, se a função estiver em sharedUtils.js
    if (typeof initDynamicMobileMenu === 'function') {
        initDynamicMobileMenu();
    }
});