"use client";
import React, { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { PlaceInfo, ViewState } from "@/app/types";

export const Map = ({
  mapContainerRef,
  setMapRef,
  viewState,
  setViewState,
  setPlaceInfo,
}: {
  mapContainerRef: React.RefObject<HTMLDivElement>;
  setMapRef: (mapInstance: mapboxgl.Map | null) => void;
  viewState: ViewState;
  setViewState: React.Dispatch<React.SetStateAction<ViewState>>;
  setPlaceInfo: React.Dispatch<React.SetStateAction<PlaceInfo | null>>;
}) => {
  const mapRef = useRef<mapboxgl.Map | null>(null);
  const selectedFeatureId = useRef<string | null>(null);

  useEffect(() => {
    mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_KEY!;

    const mapInstance = new mapboxgl.Map({
      container: mapContainerRef.current!,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [viewState.longitude, viewState.latitude],
      zoom: viewState.zoom,
      pitch: 45,
      bearing: -17.6,
      antialias: true,
    });

    setMapRef(mapInstance);

    mapInstance.on("style.load", () => {
      const style = mapInstance.getStyle();
      if (style?.layers) {
        const labelLayer = style.layers.find(
          (layer) =>
            layer.type === "symbol" &&
            layer.layout &&
            layer.layout["text-field"],
        );

        const labelLayerId = labelLayer?.id;
        if (labelLayerId) {
          mapInstance.addLayer(
            {
              id: "add-3d-buildings",
              source: "composite",
              "source-layer": "building",
              filter: ["==", "extrude", "true"],
              type: "fill-extrusion",
              minzoom: 15,
              paint: {
                "fill-extrusion-color": [
                  "case",
                  ["==", ["id"], selectedFeatureId.current],
                  "#ff0000",
                  "#aaa",
                ],
                "fill-extrusion-height": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "height"],
                ],
                "fill-extrusion-base": [
                  "interpolate",
                  ["linear"],
                  ["zoom"],
                  15,
                  0,
                  15.05,
                  ["get", "min_height"],
                ],
                "fill-extrusion-opacity": 0.6,
              },
            },
            labelLayerId,
          );
        }
      }
    });

    mapInstance.on("click", "add-3d-buildings", (e) => {
      const features = mapInstance.queryRenderedFeatures(e.point, {
        layers: ["add-3d-buildings"],
      });

      if (!features.length) return;

      const feature = features[0];

      selectedFeatureId.current = feature.id as string;

      setPlaceInfo({
        id: feature.id as string,
        name: feature.properties?.name || "Неизвестно",
        //@ts-ignore
        coordinates: feature.geometry.coordinates[0].slice(0, 2) as [
          number,
          number,
        ],
        type: feature.properties?.type || "Неизвестно",
        openingHours: feature.properties?.opening_hours || "Неизвестно",
        closingHours: feature.properties?.closing_hours || "Неизвестно",
        photoUrl: feature.properties?.photo_url || "",
        otherData: feature.properties?.other_data || "",
      });

      mapInstance.setPaintProperty("add-3d-buildings", "fill-extrusion-color", [
        "case",
        ["==", ["id"], selectedFeatureId.current],
        "#ff0000",
        "#aaa",
      ]);
    });

    return () => {
      setMapRef(null);
      mapInstance.remove();
    };
  }, [setPlaceInfo]);

  useEffect(() => {
    if (mapRef.current) {
      mapRef.current.setCenter([viewState.longitude, viewState.latitude]);
      mapRef.current.setZoom(viewState.zoom);
    }
  }, [viewState]);

  return (
    <div ref={mapContainerRef} style={{ width: "100vw", height: "93vh" }} />
  );
};
