// Cálculo de dias desde o registro
function calcularDias(dataRegistro) {
    const [dia, mes, ano] = dataRegistro.split('/');
    const hoje = new Date();
    const dataReg = new Date(ano, mes-1, dia);

    hoje.setHours(0, 0, 0, 0);
            dataReg.setHours(0, 0, 0, 0);
        
    const diff = hoje - dataReg;
    return Math.floor(diff / (1000 * 60 * 60 * 24));
}


// Atualiza o elemento de dias no HTML
const diasDetalheElement = document.getElementById('dias-detalhe');
if (diasDetalheElement) {
     // Data do registro fixa
    const dataDoRegistroOriginal = "15/05/2024"; // Tornar a data dinâmica
    diasDetalheElement.textContent = `${calcularDias(dataDoRegistroOriginal)} dias`;
}

function parseDMS(input) {
    if (!input) return null; // Adiciona verificação
    const parts = input.match(/(\d+)°(\d+)'([\d.]+)"([NSEW])/i); // Tornar NSEW case-insensitive
    if (!parts) return null;

    const degrees = parseFloat(parts[1]);
    const minutes = parseFloat(parts[2]);
    const seconds = parseFloat(parts[3]);
    const direction = parts[4].toUpperCase();

    let decimal = degrees + (minutes / 60) + (seconds / 3600);
    if (direction === 'S' || direction === 'W') {
        decimal = -decimal;
    }
    return decimal;
}

//Menu mobile
function initMobileMenu() {
    const mobileMenuButton = document.querySelector('header .md\\:hidden button'); // Seletor específico
    const mobileNav = document.querySelector('header .md\\:flex.items-center.justify-between .flex.space-x-6'); // Ajusta o seletor conforme a estrutura final do menu mobile
    if (mobileMenuButton && mobileNav) {
        mobileMenuButton.addEventListener('click', () => {
            mobileNav.classList.toggle('hidden');
        });
    }
}

function togglePasswordVisibility(fieldId, eyeIconId) { // Renomeado para clareza e adicionado iconId
    const field = document.getElementById(fieldId);
    const eyeIcon = document.getElementById(eyeIconId); // Usar ID do ícone

    if (field && eyeIcon) { // Verificar se elementos existem
        if (field.type === 'password') {
            field.type = 'text';
            eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />';
        } else {
            field.type = 'password';
            eyeIcon.innerHTML = '<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />';
        }
    }
}