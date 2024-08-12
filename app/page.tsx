"use client";
import React, { useRef, useState } from "react";
import { Map } from "./components/map.conponent";
import { PlaceInfo, ViewState } from "./types";
import { Header } from "@/components/ui-components/header.component";
import { PlaceDetails } from "@/components/ui-components/place-datails.component";
import { useMapRef } from "@/app/hooks/use-map-ref"; // Подключаем кастомный хук

export default function Home() {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [mapRef, setMapRef] = useMapRef(); // Используем кастомный хук

  const [viewState, setViewState] = useState<ViewState>({
    longitude: 37.618423,
    latitude: 55.751244,
    zoom: 15.5,
  });
  const [placeInfo, setPlaceInfo] = useState<PlaceInfo | null>(null);

  const handleSearch = async (query: string) => {
    const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;
    const response = await fetch(
      `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
        query,
      )}.json?access_token=${mapboxToken}`,
    );
    const data = await response.json();

    if (data.features && data.features.length > 0) {
      const [longitude, latitude] = data.features[0].center;

      if (mapRef.current) {
        mapRef.current.flyTo({
          center: [longitude, latitude],
          zoom: 15,
        });
      }
    } else {
      console.log("No results found.");
    }
  };

  return (
    <main>
      <div className="relative w-full h-full">
        <Header onSearch={handleSearch} />
        <Map
          mapContainerRef={mapContainerRef}
          setMapRef={setMapRef} // Передаем setter для mapRef
          viewState={viewState}
          setViewState={setViewState}
          setPlaceInfo={setPlaceInfo}
        />
        <PlaceDetails placeInfo={placeInfo} />
      </div>
    </main>
  );
}
