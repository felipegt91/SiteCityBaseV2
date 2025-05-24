document.addEventListener('DOMContentLoaded', () => {
    const lat = parseDMS("20°26'07.3\"S");
    const lng = parseDMS("54°37'09.9\"W");

    if (lat !== null && lng !== null) {
        const map = L.map('map-container').setView([lat, lng], 15);
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);

        L.marker([lat, lng], {
            icon: L.divIcon({
                className: 'problem-marker',
                html: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#DC2626"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>',
                iconSize: [32, 32]
            })
        })
        .bindPopup(`
            <b>Buraco na via</b><br>
            REG-20240001<br>
            <small>${lat.toFixed(6)}, ${lng.toFixed(6)}</small>
        `)
        .addTo(map);
    } else {
        console.error("Não foi possível parsear as coordenadas para o mapa.");
        const mapContainer = document.getElementById('map-container');
        if(mapContainer) mapContainer.innerHTML = "<p>Erro ao carregar coordenadas do mapa.</p>";
    }

    // Inicializar menu mobile
    if (typeof initMobileMenu === 'function') {
        initMobileMenu();
    }
});