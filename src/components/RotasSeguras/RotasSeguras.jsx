import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./RotasSeguras.css";
import { createRoot } from "react-dom/client";
import {
  Building2, Pill, Shield, Flame, School, GraduationCap, Church, Landmark,
  Stethoscope, Home, Users, UserRound, HeartPulse, ShoppingCart, Bus,
  Footprints, Car
} from "lucide-react";

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
  const Icon = ICONS[type] || Building2;
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

const RotasSeguras = () => {
  const mapRef = useRef(null);
  const selectedRouteRef = useRef(null);
  const userMarkerRef = useRef(null);
  const lastLocationRef = useRef(null);
  const animationStoppedRef = useRef(false);

  const GRAPH_HOPPER_KEY = import.meta.env.VITE_GRAPH_HOPPER_KEY;
  const ORS_KEY = import.meta.env.VITE_ORS_KEY; // fallback opcional

  const haversineDistance = (lat1, lon1, lat2, lon2) => {
    const toRad = (v) => (v * Math.PI) / 180;
    const R = 6371000;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  };

  const gerarIconeLeaflet = (type, size = 40) => {
    const wrapper = document.createElement("div");
    const root = createRoot(wrapper);
    root.render(<CustomIcon type={type} size={size} />);
    return L.divIcon({
      html: wrapper,
      className: "custom-leaflet-icon",
      iconSize: [size, size],
      iconAnchor: [size / 2, size],
      popupAnchor: [0, -size + 8],
    });
  };

  useEffect(() => {
    if (!mapRef.current) {
      const container = L.DomUtil.get("map");
      if (container) container._leaflet_id = null;

      const map = L.map("map").setView([0, 0], 2);
      mapRef.current = map;

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "&copy; OpenStreetMap contributors",
      }).addTo(map);

      const animatedUserIcon = L.divIcon({
        className: "user-icon-container",
        html: `<div class="pulse-circle"></div>
               <img class="jumping-icon" id="user-marker-img"
                    src="https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png"/>`,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
        popupAnchor: [-6, -45],
      });

      navigator.geolocation.watchPosition(
        (pos) => {
          const { latitude, longitude } = pos.coords;

          if (
            lastLocationRef.current &&
            haversineDistance(
              lastLocationRef.current.lat,
              lastLocationRef.current.lng,
              latitude,
              longitude
            ) < 50
          ) {
            console.log("Localização praticamente igual — sem recarregar dados.");
            return;
          }

          lastLocationRef.current = { lat: latitude, lng: longitude };

          map.setView([latitude, longitude], 18);

          if (userMarkerRef.current) {
            userMarkerRef.current.setLatLng([latitude, longitude]);
          } else {
            userMarkerRef.current = L.marker([latitude, longitude], { icon: animatedUserIcon })
              .addTo(map)
              .bindPopup("📍 Você está aqui"), { offset: L.point(40, -35) }

            // Garante que o popup só abre quando o marker estiver 100% montado
            setTimeout(() => {
              if (userMarkerRef.current) userMarkerRef.current.openPopup();
            }, 300);
          }

          // 👉 parar animação após obter localização inicial
          if (!animationStoppedRef.current) {
            const img = document.getElementById("user-marker-img");
            if (img) img.classList.remove("jumping-icon");
            animationStoppedRef.current = true;
          }

          buscarLocaisSeguros(map, latitude, longitude);
        },
        (err) => alert("Erro ao obter localização: " + err.message),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  async function buscarLocaisSeguros(map, userLat, userLng) {
    const overpassUrl = "https://overpass.kumi.systems/api/interpreter";
    const raio = 10000;

    const amenities = [
      "hospital", "pharmacy", "police", "fire_station", "school", "university",
      "place_of_worship", "townhall", "clinic", "shelter", "community_centre",
      "doctors", "healthcare", "supermarket", "bus_station"
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

      if (!data.elements?.length) {
        alert("Nenhum local seguro encontrado num raio de 10 km.");
        return;
      }

      const mapped = data.elements
        .map((el) => {
          const lat = el.lat || el.center?.lat;
          const lon = el.lon || el.center?.lon;
          if (!lat || !lon) return null;
          const dist = haversineDistance(userLat, userLng, lat, lon);
          return { el, lat, lon, dist };
        })
        .filter(Boolean)
        .sort((a, b) => a.dist - b.dist)
        .slice(0, 15);

      mapped.forEach(({ el, lat, lon, dist }) => {
        const amenityType = el.tags?.amenity || "hospital";
        const nome = el.tags?.name || amenityType;
        const icon = gerarIconeLeaflet(amenityType, 44);

        const marker = L.marker([lat, lon], { icon }).addTo(map);
        const popupContainer = document.createElement("div");
        const root = createRoot(popupContainer);

        const distKm = (dist / 1000).toFixed(2);

        root.render(
          <div className="container-label">
            <div className="label-title">
              <Shield size={40} stroke="#007bff" /> <span>{nome}</span>
            </div>
            <div className="distance">{distKm} km</div>
            <div className="btns-rotas">
              <button
                className="btn-rota"
                onClick={() => desenharRotaGH([userLat, userLng], [lat, lon], "foot")}
              >
                <Footprints size={16} /> ir a pé
              </button>
              <button
                className="btn-rota"
                onClick={() => desenharRotaGH([userLat, userLng], [lat, lon], "car")}
              >
                <Car size={16} /> ir de carro
              </button>
            </div>
          </div>
        );

        marker.bindPopup(popupContainer);
      });
    } catch (err) {
      console.error("Erro ao buscar locais:", err);
    }
  }

  // 🔁 Apaga a rota anterior antes de desenhar a nova
  async function desenharRotaGH(fromLatLng, toLatLng, vehicle = "foot") {
    if (selectedRouteRef.current) {
      mapRef.current.removeLayer(selectedRouteRef.current);
      selectedRouteRef.current = null;
    }

    const cacheKey = `${vehicle}-${fromLatLng.join(",")}-${toLatLng.join(",")}`;
    const cached = localStorage.getItem(cacheKey);

    try {
      let coords;

      if (cached) {
        coords = JSON.parse(cached);
      } else {
        const url = `https://graphhopper.com/api/1/route?point=${fromLatLng[0]},${fromLatLng[1]}&point=${toLatLng[0]},${toLatLng[1]}&vehicle=${vehicle}&weighting=fastest&locale=pt&points_encoded=false&key=${GRAPH_HOPPER_KEY}`;
        const res = await fetch(url);
        if (res.status === 429) throw new Error("429");
        const data = await res.json();
        coords = data.paths[0]?.points?.coordinates.map((c) => [c[1], c[0]]);
        localStorage.setItem(cacheKey, JSON.stringify(coords));
      }

      selectedRouteRef.current = L.polyline(coords, {
        color: vehicle === "foot" ? "orange" : "green",
        weight: 5,
      }).addTo(mapRef.current);

      mapRef.current.fitBounds(selectedRouteRef.current.getBounds(), { padding: [50, 50] });
    } catch (err) {
      alert("Erro ao traçar rota.");
    }
  }

  return (
    <div className="fundo">
      <div className="card shadow-sm m-4 p-3 h-100 p-4">
        <h1 style={{ color: "#4C585B" }}>Encontre o lugar seguro mais próximo</h1>
        <p style={{ color: "#595b5b" }}>
          O mapa localiza automaticamente sua posição e mostra os lugares seguros próximos.
          Clique em um ícone e escolha o modo de locomoção para ver o trajeto até o destino.
        </p>
        <div className="w-100" style={{ height: "70vh" }}>
          <div id="map" />
        </div>
      </div>
    </div>
  );
};

export default RotasSeguras;
