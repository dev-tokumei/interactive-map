import { useRef } from "react";
import mapboxgl from "mapbox-gl";

export const useMapRef = () => {
  const mapRef = useRef<mapboxgl.Map | null>(null);

  const setMap = (mapInstance: mapboxgl.Map | null) => {
    (mapRef as any).current = mapInstance;
  };

  return [mapRef, setMap] as const;
};
