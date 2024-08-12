"use client";
import Map from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useState } from "react";

type viewState = {
  longitude: number;
  latitude: number;
  zoom: number;
};

export const MapContainer = () => {
  const [viewState, setViewState] = useState<viewState[]>([
    {
      longitude: -51.1,
      latitude: 71.4,
      zoom: 6,
    },
  ]);
  return (
    <Map
      mapboxAccessToken="pk.eyJ1Ijoic2luZ3VsYXJpdHlsYWIiLCJhIjoiY2x6b2JmZGNhMHY0eTJrcXcxOGp0eDluNiJ9.tOMt_XF278-jrGovF9MsAw"
      {...viewState}
      //@ts-ignore
      onMove={(evt) => setViewState(evt.viewState)}
      style={{ width: "100vw", height: "100vh" }}
      mapStyle="mapbox://styles/mapbox/streets-v9"
    />
  );
};
