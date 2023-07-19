import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";
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
      //  --------------create empty source markers --------------

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
            "#C993A2",
          ],
          "fill-opacity": ["case", ["boolean", ["feature-state", "hover"], false], 0.9, 0.6],
        },
      });

      // map.current.addLayer({
      //   id: "region-names",
      //   type: "symbol",
      //   source: "regions",
      //   layout: {
      //     "text-field": ["get", "Bassin"], // Use the "Bassin" property as the text for the region names
      //     "text-font": ["Open Sans Regular"],
      //     "text-size": 12,
      //     "text-allow-overlap": false,
      //   },
      //   paint: {
      //     "text-color": "#000000",
      //   },
      // });

      let hoveredPolygonId = null;

      map.current.on("mouseenter", "regions", (e) => {
        hoveredPolygonId = e.features[0].properties.id;
        map.current.setFeatureState({ source: "regions", id: hoveredPolygonId }, { hover: true });
        map.current.getCanvas().style.cursor = "pointer";
      });

      // When the mouse leaves the state-fill layer, update the feature state of the
      // previously hovered feature.
      map.current.on("mouseleave", "regions", () => {
        map.current.setFeatureState({ source: "regions", id: hoveredPolygonId }, { hover: false });
        map.current.getCanvas().style.cursor = "default";
        hoveredPolygonId = null;
      });

      map.current.on("click", "regions", (e) => {
        setSelectedRegionIndex(e.features[0].properties.id);
      });

      setIsMounted(true);
    });
  }, []);

  const getData = () => {
    fetch("../../../src/assets/region_cepages.geojson")
      .then((response) => response.json())
      .then((data) => {
        map.current.getSource("regions").setData(data);
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
