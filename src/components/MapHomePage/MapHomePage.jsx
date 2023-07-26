import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
import { centerOfMass } from "@turf/turf";
import "./MapHomePage.scss";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map({ setSelectedRegionIndex }) {
  const mapContainer = useRef(null);
  const map = useRef(null);
  const popupRef = useRef(
    new mapboxgl.Popup({
      closeButton: false,
      closeOnClick: false,
    })
  );

  const [isMounted, setIsMounted] = useState(false);

  // ---------------------------------------- Add map----------------------------------------
  useEffect(() => {
    if (map.current) {
      map.current.remove();
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clju773kn000l01pjdhq65qhy",
      center: [2.9, 46.5],
      zoom: 5.1,
      antialias: true,
    });

    map.current.on("load", () => {
      //  --------------REGION LAYER --------------

      map.current.addSource("regions", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "regions",
        type: "fill",
        source: "regions",
        layout: {},
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "id"],
            1,
            "#CA8323",
            2,
            "#3D0E25",
            3,
            "#E26934",
            4,
            "#9B1B1B",
            5,
            "#731E33",
            6,
            "#CA8323",
            7,
            "#71ADAE",
            8,
            "#DBA950",
            9,
            "#6D356F",
            10,
            "#3D574B",
            11,
            "#135D60",
            12,
            "#723122",
            13,
            "#E6B71E",
            14,
            "#135D60",
            15,
            "#BC5900",
          ],
          "fill-opacity": 0.6,
        },
      });

      //  --------------REGION SCHEMA LAYER --------------

      map.current.addSource("schemaregions", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "schemaregions",
        type: "fill",
        source: "schemaregions",
        layout: {},
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "id"],
            1,
            "#CA8323",
            2,
            "#3D0E25",
            3,
            "#E26934",
            4,
            "#9B1B1B",
            5,
            "#731E33",
            6,
            "#CA8323",
            7,
            "#71ADAE",
            8,
            "#DBA950",
            9,
            "#6D356F",
            10,
            "#3D574B",
            11,
            "#135D60",
            12,
            "#723122",
            13,
            "#E6B71E",
            14,
            "#135D60",
            15,
            "#BC5900",
          ],
          "fill-opacity": 0.15,
        },
      });

      map.current.addLayer({
        id: "schemaregions-text",
        type: "symbol",
        source: "schemaregions",
        layout: {
          "text-field": ["get", "Bassin"],
          "text-size": 12,
          "text-font": ["Open Sans Regular"],
          "text-anchor": "center",
          "text-offset": [0, 0],
        },
        paint: {
          "text-color": "#000000",
          "text-halo-color": "#FFFFFF",
          "text-halo-width": 1.5,
        },
      });

      //  --------------SUBREGION LAYER --------------

      map.current.addSource("subregions", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });

      map.current.addLayer({
        id: "subregions",
        type: "fill",
        source: "subregions",
        minzoom: 6,
        layout: {},
        paint: {
          "fill-color": [
            "interpolate",
            ["linear"],
            ["get", "bassin_id"],
            1,
            "#CA8323",
            2,
            "#3D0E25",
            3,
            "#E26934",
            4,
            "#9B1B1B",
            5,
            "#731E33",
            6,
            "#CA8323",
            7,
            "#71ADAE",
            8,
            "#DBA950",
            9,
            "#6D356F",
            10,
            "#3D574B",
            11,
            "#135D60",
            12,
            "#723122",
            13,
            "#E6B71E",
            14,
            "#135D60",
            15,
            "#BC5900",
          ],
          "fill-opacity": 0.5,
        },
      });

      // -------------------- event listener subregion layer -----------------------

      map.current.on("mouseenter", "subregions", (e) => {
        map.current.getCanvas().style.cursor = "pointer";

        const center = centerOfMass(e.features[0]);
        const centerCoordinates = center.geometry.coordinates;
        const description = e.features[0].properties.nom;

        while (Math.abs(e.lngLat.lng - centerCoordinates[0]) > 180) {
          centerCoordinates[0] += e.lngLat.lng > centerCoordinates[0] ? 360 : -360;
        }

        const popupContent = document.createElement("div");
        popupContent.innerHTML = description;

        // Populate the popup and set its coordinates
        // based on the feature found.
        popupRef.current.setLngLat(centerCoordinates).setDOMContent(popupContent).addTo(map.current);

        const selectedIndex = e.features[0].properties.id;
        map.current.setPaintProperty("subregions", "fill-opacity", [
          "case",
          ["==", ["get", "id"], selectedIndex],
          0.85,
          0.5,
        ]);
      });

      map.current.on("mouseleave", "subregions", () => {
        map.current.getCanvas().style.cursor = "default";
        popupRef.current.remove();

        map.current.setPaintProperty("subregions", "fill-opacity", 0.5);
      });

      // -------------------- event listener schemaregion layer -----------------------

      map.current.on("mouseenter", "schemaregions", () => {
        map.current.getCanvas().style.cursor = "pointer";
      });

      map.current.on("mouseleave", "schemaregions", () => {
        map.current.getCanvas().style.cursor = "default";
      });

      map.current.on("click", "schemaregions", (e) => {
        setSelectedRegionIndex(e.features[0].properties.id);
        const selectedIndex = e.features[0].properties.id;

        // map.current.setFeatureState({ source: "schemaregions", id: selectedIndex }, { selected: true });

        map.current.setPaintProperty("schemaregions", "fill-opacity", [
          "case",
          ["==", ["get", "id"], selectedIndex],
          0.3,
          0.1,
        ]);
      });

      // -------------------- Confirm map load -----------------------

      setIsMounted(true);
    });
  }, []);

  const getData = () => {
    fetch("../../../src/assets/region_cepages.geojson")
      .then((response) => response.json())
      .then((data) => {
        map.current.getSource("regions").setData(data);
      });

    fetch("../../../src/assets/sous-regions.geojson")
      .then((response) => response.json())
      .then((data) => {
        map.current.getSource("subregions").setData(data);
      });

    fetch("../../../src/assets/region-schema.geojson")
      .then((response) => response.json())
      .then((data) => {
        map.current.getSource("schemaregions").setData(data);
      });
  };

  useEffect(() => {
    if (isMounted) {
      getData();
    }
  }, [isMounted]);

  // ---------------------------------------- RETURN----------------------------------------
  return <div ref={mapContainer} className="map" />;
}
export default Map;
Map.propTypes = {};
