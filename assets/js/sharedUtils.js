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


// Atualiza o elemento de dias no HTML (você precisará garantir que o ID existe)
const diasDetalheElement = document.getElementById('dias-detalhe');
if (diasDetalheElement) {
     // Supondo que a data do registro esteja acessível ou seja fixa como no exemplo original
    const dataDoRegistroOriginal = "15/05/2024"; // Precisa tornar isso dinâmico ou buscar do HTML
    diasDetalheElement.textContent = `${calcularDias(dataDoRegistroOriginal)} dias`;
}