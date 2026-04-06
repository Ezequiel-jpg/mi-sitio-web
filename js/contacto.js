
    const miNegocio = [40.4167, -3.7037];

    
    const map = L.map('map').setView(miNegocio, 14);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // ── Marcador fijo del negocio (siempre visible) 
    const marcadorNegocio = L.marker(miNegocio)
      .addTo(map)
      .bindPopup('<strong>¡Estamos aquí!</strong><br>Madrid, España')
      .openPopup();

    // ── Calcular ruta desde la ubicación del usuario ──────────────────────
    function calcularRuta(posicion) {
      const latUsuario = posicion.coords.latitude;
      const lonUsuario = posicion.coords.longitude;

      L.Routing.control({
        waypoints: [
          L.latLng(latUsuario, lonUsuario), // Punto A: usuario
          L.latLng(miNegocio[0], miNegocio[1]) // Punto B: negocio
        ],
        language: 'es',
        addWaypoints: false,
        routeWhileDragging: false,
        draggableWaypoints: false,
        show: true,
        collapsible: true,
        lineOptions: {
          styles: [{ color: '#2563eb', opacity: 0.7, weight: 6 }]
        }
      }).addTo(map);
    }

    // ── Manejo de error de geolocalización ────────────────────────────────
    function errorGeolocalizacion(error) {
      console.warn('Geolocalización no disponible:', error.message);
      // El marcador del negocio ya está visible, no hace falta hacer nada más
    }

    // ── Solicitar ubicación al usuario ────────────────────────────────────
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(calcularRuta, errorGeolocalizacion);
    } else {
      console.warn('Este navegador no soporta geolocalización.');
    }