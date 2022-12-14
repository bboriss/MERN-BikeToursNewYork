import { useEffect } from "react";
import L from "leaflet";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet-routing-machine";
import { useMap } from "react-leaflet";

L.Marker.prototype.options.icon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
});

export default function Routing({ geoStartData, geoEndData }) {
  const startX = geoStartData.lat;
  const startY = geoStartData.lng;
  const endX = geoEndData.lat;
  const endY = geoEndData.lng;

  const map = useMap();

  useEffect(() => {
    if (!map) return;

    const routingControl = L.Routing.control({
      show: false,
      // addWaypoints: false,
      // draggableWaypoints: false,
      // fitSelectedRoutes: false,
      waypoints: [L.latLng(startX, startY), L.latLng(endX, endY)],
      routeWhileDragging: true,
    }).addTo(map);

    return () => map.removeControl(routingControl);
  }, [map]);

  return null;
}
