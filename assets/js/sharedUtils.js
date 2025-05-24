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