import PropTypes from "prop-types";
import { useRef, useEffect } from "react";
import mapboxgl from "mapbox-gl";
import "./MapReservation.scss";
mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;

function Map() {
  const mapContainer = useRef(null);
  const map = useRef(null);

  // ---------------------------------------- Add map----------------------------------------
  useEffect(() => {
    if (map.current) {
      map.current.remove();
    }
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/thomaslonjon/clilpddzb003y01o39zxt20nz",
      center: [2.5152007724586496, 46.60410199308436],
      zoom: 4.9,
      antialias: true,
    });

    map.current.on("load", () => {
      //  --------------create empty source markers --------------
      map.current.addSource("agencies", {
        type: "geojson",
        data: {
          type: "FeatureCollection",
          features: [],
        },
      });
      map.current.addLayer({
        id: "agencies",
        type: "circle",
        source: "agencies",
        paint: {
          "circle-radius": 10,
          "circle-color": "#FCBD42",
          "circle-opacity": 1,
        },
      });
    });
  }, []);

  // ---------------------------------------- RETURN----------------------------------------
  return <div ref={mapContainer} className="map" />;
}
export default Map;
Map.propTypes = {};
