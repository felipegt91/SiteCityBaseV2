
document.addEventListener('DOMContentLoaded', () => {

    // Coordenadas do registro
    const lat = -20.435361;
    const lng = -54.619417;
        
    // Configuração inicial do mapa
    const detailMap = L.map('detail-map').setView([lat, lng], 17);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19, // Evita carregar tiles desnecessários
        attribution: '...'
    }).addTo(detailMap);
    
    // Marcador do registro no mapa
    L.marker([lat, lng], {
        icon: L.divIcon({
            className: 'problem-marker-detail',
            html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
            iconSize: [40, 40]
        })
    }).addTo(detailMap);
});
