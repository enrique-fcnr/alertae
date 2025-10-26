import React from 'react'
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./RotasSeguras.css"

const RotasSeguras = () => {
  const mapRef = useRef(null);
  const selectedRouteRef = useRef(null);
  const userMarkerRef = useRef(null);

  const GRAPH_HOPPER_KEY = import.meta.env.VITE_GRAPH_HOPPER_KEY;
  // sua chave GraphHopper

  useEffect(() => {
    if (!mapRef.current) {
      const container = L.DomUtil.get("map");
      if (container) container._leaflet_id = null;

      const map = L.map("map").setView([0, 0], 2);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      // Ícone animado do usuário
      const animatedUserIcon = L.divIcon({
        className: "user-icon-container",
        html: `
          <div class="pulse-circle"></div>
          <img class="jumping-icon" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"/>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          map.setView([userLat, userLng], 15); // zoom mais próximo

          // Marcador animado do usuário
          userMarkerRef.current = L.marker([userLat, userLng], { icon: animatedUserIcon })
            .addTo(map)
            .bindPopup("📍 Você está aqui", { offset: L.point(-6, -45) })
            .openPopup();

          // Buscar locais seguros
          buscarLocaisSeguros(map, userLat, userLng);
        },
        (err) => alert("Erro ao obter localização: " + err.message),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  async function buscarLocaisSeguros(map, userLat, userLng) {
    const overpassUrl = "https://overpass.kumi.systems/api/interpreter";
    const raio = 5000;

    const query = `
      [out:json];
      (
        node["amenity"~"school|university|place_of_worship|townhall|police"](around:${raio},${userLat},${userLng});
        way["amenity"~"school|university|place_of_worship|townhall|police"](around:${raio},${userLat},${userLng});
      );
      out center;
    `;

    const blueIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
      iconSize: [40, 40],
      iconAnchor: [16, 32],
      popupAnchor: [0, -32],
    });

    try {
      const resp = await fetch(overpassUrl, {
        method: "POST",
        body: query,
        headers: { "Content-Type": "text/plain" },
      });

      const data = await resp.json();

      if (!data.elements || data.elements.length === 0) {
        alert("Nenhum local seguro encontrado num raio de 5 km.");
        return;
      }

      // Para a animação do usuário
      userMarkerRef.current.setIcon(
        L.icon({
          iconUrl:
            "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
          iconSize: [25, 41],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
          shadowUrl:
            "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
          shadowSize: [41, 41],
        })
      );

      // Ordena pelos 5 mais próximos
      const sorted = data.elements
        .sort((a, b) => {
          const aLat = a.lat || a.center?.lat;
          const aLng = a.lon || a.center?.lon;
          const bLat = b.lat || b.center?.lat;
          const bLng = b.lon || b.center?.lon;
          return (
            Math.hypot(aLat - userLat, aLng - userLng) -
            Math.hypot(bLat - userLat, bLng - userLng)
          );
        })
        .slice(0, 5);

      sorted.forEach(async (el) => {
        const elLat = el.lat || el.center?.lat;
        const elLng = el.lon || el.center?.lon;
        const nome = el.tags?.name || "Local seguro";

        if (elLat && elLng) {
          const marker = L.marker([elLat, elLng], { icon: blueIcon }).addTo(map);

          // Distância e tempo via GraphHopper (pedestre)
          let distanceKm = "-";
          let durationMin = "-";
          try {
            const ghUrl = `https://graphhopper.com/api/1/route?point=${userLat},${userLng}&point=${elLat},${elLng}&vehicle=foot&locale=pt&points_encoded=false&key=${GRAPH_HOPPER_KEY}`;
            const ghResp = await fetch(ghUrl);
            const ghData = await ghResp.json();
            if (ghData.paths && ghData.paths.length > 0) {
              distanceKm = (ghData.paths[0].distance / 1000).toFixed(2);
              durationMin = Math.ceil(ghData.paths[0].time / 60000);
            }
          } catch (err) {
            console.error("Erro ao calcular rota:", err);
          }

          marker.bindPopup(`
            🛡️ ${nome}<br>
            <div class="distance"><p>${distanceKm} km | ${durationMin} min</p></div>
            <div class="btns">
              <button class="btn-rota" id="rota-ped-${el.id}">🚶 Ir a pé</button>
              <button class="btn-rota"  id="rota-car-${el.id}">🚗 Ir de carro</button>
              
            </div>
            
          `);

          // Botões de rota
          marker.on("popupopen", () => {
            const btnPed = document.getElementById(`rota-ped-${el.id}`);
            const btnCar = document.getElementById(`rota-car-${el.id}`);

            if (btnPed) {
              btnPed.onclick = async () => {
                if (selectedRouteRef.current) map.removeLayer(selectedRouteRef.current);
                selectedRouteRef.current = await desenharRotaGH([userLat, userLng], [elLat, elLng], "foot");
              };
            }

            if (btnCar) {
              btnCar.onclick = async () => {
                if (selectedRouteRef.current) map.removeLayer(selectedRouteRef.current);
                selectedRouteRef.current = await desenharRotaGH([userLat, userLng], [elLat, elLng], "car");
              };
            }
          });
        }
      });
    } catch (err) {
      console.error("Erro ao buscar locais seguros:", err);
      alert("Erro ao buscar locais seguros.");
    }
  }

  async function desenharRotaGH(fromLatLng, toLatLng, vehicle = "foot") {
    try {
      const url = `https://graphhopper.com/api/1/route?point=${fromLatLng[0]},${fromLatLng[1]}&point=${toLatLng[0]},${toLatLng[1]}&vehicle=${vehicle}&weighting=fastest&locale=pt&points_encoded=false&key=${GRAPH_HOPPER_KEY}`;
      const res = await fetch(url);
      const data = await res.json();

      if (!data.paths || data.paths.length === 0) {
        alert("Não foi possível traçar a rota.");
        return null;
      }

      const coords = data.paths[0].points.coordinates.map((c) => [c[1], c[0]]);
      const polyline = L.polyline(coords, {
        color: vehicle === "foot" ? "orange" : "green",
        weight: 5,
      }).addTo(mapRef.current);
      mapRef.current.fitBounds(polyline.getBounds(), { padding: [50, 50] });

      return polyline;
    } catch (err) {
      console.error("Erro ao traçar rota:", err);
      alert("Erro ao traçar rota.");
      return null;
    }
  }

  return (
    <>
      <div className='fundo'>
        <div className='card shadow-sm m-4 p-3 h-100 p-4'>
          <h1 style={{ color: '#4C585B' }}>Encontre o lugar seguro mais próximo</h1>
          <p style={{ color: '#595b5b' }} className='p-0 text-start
'>O mapa localiza automaticamente sua posição e indica pontos seguros nas proximidades. Ao clicar em um ícone e selecionar o modo de locomoção, o trajeto até o destino será exibido. </p>
          <div className="w-100" style={{ height: '70vh' }}>
            <div id="map" />
          </div>

        </div>
      </div>
    </>
  )


}

export default RotasSeguras