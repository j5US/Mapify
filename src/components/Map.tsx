import type { Place } from "../api/Place";
import { Map as LeafletMap } from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";
import L from "leaflet";
import pin from "./pin.png";

interface MapProps {
    place: Place | null;
}

export default function Map({ place }: MapProps) {
    const customIcon = L.icon({
        iconUrl: pin,
        iconSize: [28, 38], 
        iconAnchor: [16, 42], 
        // popupAnchor: [0, -32], 
    });

    const mapRef = useRef<LeafletMap | null>(null);

    useEffect(() => {
        if (mapRef.current && place) {
            mapRef.current.flyTo([place.latitude, place.longitude]);
        }
    }, [place]);

    return <MapContainer
        ref={mapRef}
        center={[40.7, -74]}
        zoom={12}
        scrollWheelZoom
        className="h-full"
    >
        <TileLayer url="http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {place && <Marker position={[place.latitude, place.longitude]} icon={customIcon}/>}
    </MapContainer>;
}