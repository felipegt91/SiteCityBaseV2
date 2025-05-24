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