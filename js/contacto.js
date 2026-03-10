window.onload = function() {
    // Coordenadas de Madrid
    const miNegocio = [40.4167, -3.7037]; 

    // Inicializar mapa
    const map = L.map('map')

    // Cargar capas de OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '© OpenStreetMap'
    }).addTo(map);

    // Añadir marcador de la empresa
    L.marker(miNegocio).addTo(map)
        .bindPopup('<b>Digital Technology</b><br>Estamos aquí.')
        .openPopup();

    // Función para el botón de calcular ruta
    window.calcularRuta = function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(pos => {
                const userPos = [pos.coords.latitude, pos.coords.longitude];
                L.marker(userPos).addTo(map).bindPopup('Tu ubicación').openPopup();
                const polyline = L.polyline([userPos, miNegocio], {color: 'red'}).addTo(map);
                map.fitBounds(polyline.getBounds());
            }, () => {
                alert("No se pudo obtener tu ubicación. Revisa los permisos de tu navegador.");
            });
        } else {
            alert("Tu navegador no soporta geolocalización.");
        }
    };
};
