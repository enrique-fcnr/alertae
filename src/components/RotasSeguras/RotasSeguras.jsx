import React from 'react'
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./RotasSeguras.css";

// para renderizar o JSX em um elemento DOM temporário
import { createRoot } from "react-dom/client";

// lucide-react icons
import {
  Building2,
  Pill,
  Shield,
  Flame,
  School,
  GraduationCap,
  Church,
  Landmark,
  Stethoscope,
  Home,
  Users,
  UserRound,
  HeartPulse,
  ShoppingCart,
  Bus,
  Footprints,
  Car,
} from "lucide-react";

/* ---------------------------
   Componente CustomIcon
   ícone branco sobre círculo azul
   --------------------------- */
const ICONS = {
  hospital: Building2,
  pharmacy: Pill,
  police: Shield,
  fire_station: Flame,
  school: School,
  university: GraduationCap,
  place_of_worship: Church,
  townhall: Landmark,
  clinic: Stethoscope,
  shelter: Home,
  community_centre: Users,
  doctors: UserRound,
  healthcare: HeartPulse,
  supermarket: ShoppingCart,
  bus_station: Bus,
};

const CustomIcon = ({ type, size = 40 }) => {
  const Icon = ICONS[type] || Building2; // fallback
  const px = typeof size === "number" ? `${size}px` : size;
  return (
    <div
      style={{
        backgroundColor: "#007bff",
        borderRadius: "50%",
        width: px,
        height: px,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 0 4px rgba(0,0,0,0.25)",
      }}
    >
      <Icon color="white" size={size * 0.6} />
    </div>
  );
};

/* ---------------------------
   Componente principal RotasSeguras
   --------------------------- */
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
      // Dentro do getCurrentPosition:
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const userLat = pos.coords.latitude;
          const userLng = pos.coords.longitude;

          map.setView([userLat, userLng], 18); // zoom mais próximo

          // Marcador animado do usuário
          const animatedUserIcon = L.divIcon({
            className: "user-icon-container",
            html: `
        <div class="pulse-circle"></div>
        <img class="jumping-icon" src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"/>
      `,
            iconSize: [40, 40],
            iconAnchor: [20, 40],
          });

          userMarkerRef.current = L.marker([userLat, userLng], { icon: animatedUserIcon })
            .addTo(map);

          // Criar popup com React
          const popupContainer = document.createElement("div");
          const root = createRoot(popupContainer);
          root.render(
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <UserRound size={20} color="#007bff" />
              <span>Você está aqui</span>
            </div>
          );

          userMarkerRef.current.bindPopup(popupContainer, { offset: L.point(-6, -45) }).openPopup();

          // Buscar locais seguros
          buscarLocaisSeguros(map, userLat, userLng);
        },
        (err) => alert("Erro ao obter localização: " + err.message),
        { enableHighAccuracy: true }
      );

    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Função Haversine para distância em metros
  function haversineDistance(lat1, lon1, lat2, lon2) {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371000; // raio da Terra em metros
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }

  // gera um L.divIcon a partir do type (usa React para montar SVG)
  function gerarIconeLeaflet(type, size = 40) {
    const wrapper = document.createElement("div");
    try {
      const root = createRoot(wrapper);
      root.render(<CustomIcon type={type} size={size} />);
      return L.divIcon({
        html: wrapper,
        className: "custom-leaflet-icon",
        iconSize: [size, size],
        iconAnchor: [Math.floor(size / 2), size],
        popupAnchor: [0, -size + 8],
      });
    } catch (err) {
      console.error("Erro ao renderizar ícone React:", err);
      return L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/512/854/854878.png",
        iconSize: [40, 40],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      });
    }
  }

  async function buscarLocaisSeguros(map, userLat, userLng) {
    const overpassUrl = "https://overpass.kumi.systems/api/interpreter";
    const raio = 10000; // 10 km

    // Amenidades comuns para segurança / emergência
    const amenities = [
      "hospital",
      "pharmacy",
      "police",
      "fire_station",
      "school",
      "university",
      "place_of_worship",
      "townhall",
      "clinic",
      "shelter",
      "community_centre",
      "doctors",
      "healthcare",
      "supermarket",
      "bus_station"
    ].join("|");

    const query = `
      [out:json][timeout:25];
      (
        node["amenity"~"${amenities}"](around:${raio},${userLat},${userLng});
        way["amenity"~"${amenities}"](around:${raio},${userLat},${userLng});
        relation["amenity"~"${amenities}"](around:${raio},${userLat},${userLng});
      );
      out center;
    `;

    try {
      const resp = await fetch(overpassUrl, {
        method: "POST",
        body: query,
        headers: { "Content-Type": "text/plain" },
      });

      const data = await resp.json();

      if (!data.elements || data.elements.length === 0) {
        alert("Nenhum local seguro encontrado num raio de 10 km.");
        return;
      }

      // Para a animação do usuário, troca o ícone após termos resultados
      if (userMarkerRef.current) {
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
      }

      // Mapeia cada elemento para um objeto com lat/lon e calcula distância
      const mapped = data.elements
        .map((el) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          if (!lat || !lon) return null;
          const distMeters = haversineDistance(userLat, userLng, lat, lon);
          return { el, lat, lon, distMeters };
        })
        .filter(Boolean);

      // Ordena por distância (metros) e pega os 15 mais próximos
      const nearest = mapped
        .sort((a, b) => a.distMeters - b.distMeters)
        .slice(0, 15);

      // Adiciona marcadores para os 15 locais mais próximos
      nearest.forEach(async ({ el, lat, lon, distMeters }) => {
        const amenityType = el.tags?.amenity || el.tags?.shop || el.tags?.tourism || "hospital";
        const nome = el.tags?.name || amenityType || "Local seguro";

        const icon = gerarIconeLeaflet(amenityType, 44); // 44 px para melhor visual

        const marker = L.marker([lat, lon], { icon }).addTo(map);

        // Distância e tempo via GraphHopper (pedestre) — fallback para distância haversine caso GH falhe
        let distanceKm = (distMeters / 1000).toFixed(2);
        let durationMin = "-";

        try {
          const ghUrl = `https://graphhopper.com/api/1/route?point=${userLat},${userLng}&point=${lat},${lon}&vehicle=foot&locale=pt&points_encoded=false&key=${GRAPH_HOPPER_KEY}`;
          const ghResp = await fetch(ghUrl);
          const ghData = await ghResp.json();
          if (ghData.paths && ghData.paths.length > 0) {
            distanceKm = (ghData.paths[0].distance / 1000).toFixed(2);
            durationMin = Math.ceil(ghData.paths[0].time / 60000);
          }
        } catch (err) {
          console.error("Erro ao calcular rota GraphHopper (usando distância haversine):", err);
        }

        const popupContainer = document.createElement("div");
        const root = createRoot(popupContainer);

        root.render(
          <div className="container-label">
            <div className="label-title">
              <Shield size={40} stroke="#007bff" strokeWidth={2} />{/* ícone React */}
              <span>{nome}</span>
            </div>
            <div className="distance">
              {distanceKm} km | {durationMin === "-" ? "-" : `${durationMin} min`}
            </div>
            <div className="btns-rotas">
              <button
                className="btn-rota"
                onClick={async () => {
                  if (selectedRouteRef.current) mapRef.current.removeLayer(selectedRouteRef.current);
                  selectedRouteRef.current = await desenharRotaGH([userLat, userLng], [lat, lon], "foot");
                }}
              >
                <Footprints size={16} /> ir a pé
              </button>
              <button
                className="btn-rota"
                onClick={async () => {
                  if (selectedRouteRef.current) mapRef.current.removeLayer(selectedRouteRef.current);
                  selectedRouteRef.current = await desenharRotaGH([userLat, userLng], [lat, lon], "car");
                }}
              >
                <Car size={16} /> ir de carro
              </button>
            </div>
          </div>
        );

        marker.bindPopup(popupContainer);


        // Botões de rota
        marker.on("popupopen", () => {
          const btnPed = document.getElementById(`rota-ped-${el.id}`);
          const btnCar = document.getElementById(`rota-car-${el.id}`);

          if (btnPed) {
            btnPed.onclick = async () => {
              if (selectedRouteRef.current) mapRef.current.removeLayer(selectedRouteRef.current);
              selectedRouteRef.current = await desenharRotaGH([userLat, userLng], [lat, lon], "foot");
            };
          }

          if (btnCar) {
            btnCar.onclick = async () => {
              if (selectedRouteRef.current) mapRef.current.removeLayer(selectedRouteRef.current);
              selectedRouteRef.current = await desenharRotaGH([userLat, userLng], [lat, lon], "car");
            };
          }
        });
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
          <p style={{ color: '#595b5b' }} className='p-0 text-start'>
            O mapa localiza automaticamente sua posição e indica até 15 pontos seguros num raio de 10 km. Ao clicar em um ícone e selecionar o modo de locomoção, o trajeto até o destino será exibido.
          </p>
          <div className="w-100" style={{ height: '70vh' }}>
            <div id="map" />
          </div>
        </div>
      </div>
    </>
  )
}

export default RotasSeguras;
